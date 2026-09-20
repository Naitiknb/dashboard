import { toast } from "sonner";


export async function upsertEntity({
  endpoint,
  data,
  id, 
  method,
  sendAsJson = true,
}) {
  const isEdit = Boolean(id);
  const url = isEdit ? `/api/${endpoint}/${id}` : `/api/${endpoint}`;

  const res = await fetch(url, {
    method: method ?? (isEdit ? "PATCH" : "POST"),
    headers: sendAsJson ? { "Content-Type": "application/json" } : undefined,
    body: sendAsJson ? JSON.stringify(data) : data, 
  });

  const body = await res.json().catch(() => ({}));

  return {
    success: res.ok,
    status: res.status,
    data: res.ok ? body : null,
    errors: body.errors ?? null,
    message: body.error ?? body.message ?? null,
  };
}

function applyFieldErrors(errors, setError) {
  Object.entries(errors).forEach(([field, message]) => {
    setError(field, { type: "server", message: String(message) });
  });
}


export async function handleFormSubmit(
  data,
  {
    endpoint, // required: "users", "tasks", ...
    setError, // form.setError
    id, // record id when editing
    omitEmpty = [], // fields dropped when blank, e.g. ["password"]
    method,
    sendAsJson = true,
    router,
    successRedirect,
    successMessage,
    onSuccess, // if given, replaces the redirect
    setErrorState, // (msg | null) => void
    setResponse,
  }
) {
  setErrorState?.(null);

  // drop blank optional fields (blank password = keep the old one)
  const payload = { ...data };
  omitEmpty.forEach((key) => {
    if (payload[key] === "" || payload[key] == null) delete payload[key];
  });

  try {
    const resp = await upsertEntity({
      endpoint,
      data: payload,
      id,
      method,
      sendAsJson,
    });
    setResponse?.(resp);

    // success
    if (resp.success) {
      toast.success(
        successMessage ?? (id ? "Updated successfully." : "Created successfully.")
      );

      if (onSuccess) {
        onSuccess(resp.data);
      } else if (successRedirect && router) {
        router.push(successRedirect);
        router.refresh(); // re-run server pages so lists show the change
      }
      return resp;
    }

    // field-level errors from the server
    if (resp.errors) applyFieldErrors(resp.errors, setError);

    // general error
    const message = resp.message ?? "Failed to save.";
    toast.error(message);
    if (!resp.errors) setErrorState?.(message);

    return resp;
  } catch (err) {
    console.error("Form submit failed:", err);
    toast.error("Network error. Please try again.");
    setErrorState?.("Failed to save.");
    return { success: false };
  }
}