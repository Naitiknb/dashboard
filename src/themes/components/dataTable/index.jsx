"use client";

import { useState, useEffect } from "react";
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
    className="!text-destructive"
    {...rest}
  />
);

const EMPTY = [];

export default function DataTable({
  columns,
  data = EMPTY,
  createPageLink,
  toolbar,

  // Row actions
  renderActions,
  editHref,
  deleteUrl,
  actionsBefore,
  actionsAfter,
}) {
  const [rows, setRows] = useState(data);
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(rows.length / itemsPerPage));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const currentData = rows.slice(startIndex, startIndex + itemsPerPage);

  // Remove a row from the table (use this if your child page deletes by itself)
  const removeRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Confirm -> call deleteUrl -> remove the row
  const deleteRow = async (row) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setDeletingId(row.id);

      if (deleteUrl) {
        const res = await fetch(`${deleteUrl}/${row.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
      }

      removeRow(row.id);
    } catch (error) {
      console.error(error);
      alert("Could not delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const actionHelpers = { deleteRow, removeRow, deletingId };

  return (
    <div>

      <div className="my-2 flex items-center justify-end gap-5 ">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-8 bg-card pl-8"
          />
        </div>

        {toolbar}

        {createPageLink ? (
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

      <div className="flex    w-full flex-col overflow-hidden rounded border bg-card shadow">
        <div className="flex-1">
          <Table>
            <TableHeader className="bg-blue-50 ">
              <TableRow className="hover:bg-secondary">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className="p-2 text-xs font-bold text-gray-600"
                  >
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="p-2 text-right text-xs font-bold text-gray-600">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Body: keep the border on every row, including the last one */}
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

                    <TableCell className="p-1">
                      <div className="flex items-center justify-end">
                        {renderActions ? (
                          // Child page decides which icons to show
                          renderActions(row, actionHelpers)
                        ) : (
                          // Default: optional before/after + Edit + Delete
                          <>
                            {actionsBefore?.(row)}

                            {editHref ? (
                              <EditAction href={`${editHref}/${row.id}`} />
                            ) : null}

                            <DeleteAction
                              disabled={deletingId === row.id}
                              onClick={() => deleteRow(row)}
                            />

                            {actionsAfter?.(row)}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-b">
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination (stays at the bottom) */}
        <div className="sticky bottom-0">
          <div className="flex justify-between  items-center border-t bg-card p-2">


            <p className="text-sm text-muted-foreground">
              Page {safePage} of {totalPages}
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
    </div>
  );
}