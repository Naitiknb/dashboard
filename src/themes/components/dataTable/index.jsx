"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import { Button } from "../../../components/ui/button";
import { Plus, Pencil, Trash2, Eye, Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useRBAC } from "@/context/RBACContext";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";



export function ActionButton({
  icon: Icon,
  label,
  href,
  onClick,
  disabled,
  className = "",
}) {
  const iconEl = <Icon className="h-3 w-3" />;

  if (href) {
    return (
      <Button
        asChild
        variant="ghost"
        size="xs"
        className={`text-gray-600 hover:text-secondary-foreground ${className}`}
      >
        <Link href={href} aria-label={label} title={label}>
          {iconEl}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`text-gray-600 hover:text-secondary-foreground ${className}`}
    >
      {iconEl}
    </Button>
  );
}

export const EditAction = ({ href, onClick, ...rest }) => (
  <ActionButton icon={Pencil} label="Edit" href={href} onClick={onClick} {...rest} />
);

export const ViewAction = ({ href, onClick, ...rest }) => (
  <ActionButton icon={Eye} label="View" href={href} onClick={onClick} {...rest} />
);

export const DeleteAction = ({ onClick, disabled, ...rest }) => (


  <ActionButton
    icon={Trash2}
    label="Delete"
    onClick={onClick}
    disabled={disabled}
    className="text-destructive!"
    {...rest}
  />
);

const EMPTY = [];

export default function DataTable({
  columns,
  data = EMPTY,
  createPageLink,
  toolbar,
  permissionKey, // e.g. "wells", "tasks", "users", "roles"

  // Row actions
  renderActions,
  editHref,
  viewHref,
  deleteUrl,
  onDelete,
  actionsBefore,
  actionsAfter,
}) {
  const { hasPermission } = useRBAC();

  // no permissionKey = no restriction (old pages keep working)
  const allow = (action) =>
    !permissionKey || hasPermission(`${permissionKey}.${action}`);

  const canCreate = allow("create");
  const canEdit = allow("edit");
  const canView = allow("view");
  const canDelete = allow("delete");

  const showEdit = Boolean(editHref) && canEdit;
  const showView = Boolean(viewHref) && canView;
  const showActions =
    Boolean(renderActions || actionsBefore || actionsAfter) ||
    showEdit ||
    showView ||
    canDelete;

  const [rows, setRows] = useState(data);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const itemsPerPage = 20;

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      columns.some((c) =>
        String(row[c.key] ?? "").toLowerCase().includes(q)
      )
    );
  }, [rows, search, columns]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / itemsPerPage));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const currentData = filteredRows.slice(startIndex, startIndex + itemsPerPage);

  const removeRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };


  const deleteRow = (row) => {
    if (!canDelete) return;
    setRowToDelete(row);
  };


  const confirmDelete = async () => {
    const row = rowToDelete;
    if (!row || !canDelete) return;

    try {
      setDeletingId(row.id);

      if (onDelete) {
        const result = await onDelete(row);
        if (result === false) return;
      } else if (deleteUrl) {
        const res = await fetch(`${deleteUrl}/${row.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
      }

      removeRow(row.id);
      toast.success("Deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete. Please try again.");
    } finally {
      setDeletingId(null);
      setRowToDelete(null);
    }
  };


  const actionHelpers = {
    deleteRow,
    removeRow,
    deletingId,
    canEdit,
    canView,
    canDelete,
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col">
      {/* Toolbar */}
      <div className="my-2 flex shrink-0 items-center justify-end gap-5">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="h-8 bg-card pl-8"
          />
        </div>

        {toolbar}

        {createPageLink && canCreate ? (
          <Button
            asChild
            size="sm"
            className="h-8 gap-1.5 bg-primary px-4 text-xs font-medium"
          >
            <Link href={createPageLink} aria-label="Add">
              <Plus className="h-3.5 w-3.5" />
              Add
            </Link>
          </Button>
        ) : null}
      </div>

      {/* Card */}
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded border bg-card shadow">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-blue-50">
              <TableRow className="hover:bg-secondary">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className="p-2 text-xs font-bold text-gray-600"
                  >
                    {column.label}
                  </TableHead>
                ))}
                {showActions && (
                  <TableHead className="p-2 text-right text-xs font-bold text-gray-600">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody className="[&_tr:last-child]:border-b">
              {currentData.length > 0 ? (
                currentData.map((row, index) => (
                  <TableRow
                    key={row.id ?? index}
                    className="border-b hover:bg-muted/50"
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key} className="p-2 text-xs">
                        {row[column.key]}
                      </TableCell>
                    ))}

                    {showActions && (
                      <TableCell className="p-1">
                        <div className="flex items-center justify-end">
                          {renderActions ? (
                            renderActions(row, actionHelpers)
                          ) : (
                            <>
                              {actionsBefore?.(row)}

                              {showView ? (
                                <ViewAction
                                  href={
                                    typeof viewHref === "function"
                                      ? viewHref(row)
                                      : `${viewHref}/${row.id}`
                                  }
                                />
                              ) : null}

                              {showEdit ? (
                                <EditAction
                                  href={
                                    typeof editHref === "function"
                                      ? editHref(row)
                                      : `${editHref}/${row.id}`
                                  }
                                />
                              ) : null}

                              {canDelete ? (
                                <DeleteAction
                                  disabled={deletingId === row.id}
                                  onClick={() => deleteRow(row)}
                                />
                              ) : null}

                              {actionsAfter?.(row)}
                            </>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-b">
                  <TableCell
                    colSpan={columns.length + (showActions ? 1 : 0)}
                    className="h-24 text-center text-muted-foreground"
                  >
                    {search ? `No results for "${search}"` : "No data found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="shrink-0 border-t bg-card">
          <div className="flex items-center justify-between p-2">
            <p className="text-sm text-muted-foreground">
              Page {safePage} of {totalPages} · {filteredRows.length}{" "}
              {filteredRows.length === 1 ? "record" : "records"}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={safePage === 1}
                onClick={() => setPage(safePage - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={safePage === totalPages}
                onClick={() => setPage(safePage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>


      <AlertDialog
        open={rowToDelete !== null}
        onOpenChange={(open) => {
          if (!open && deletingId === null) setRowToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The item will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingId !== null}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deletingId !== null}
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deletingId !== null ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}