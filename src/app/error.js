"use client";

import ErrorComponent from "@/themes/components/error";

export default function ErrorPage({ error, reset }) {
    return (
        <ErrorComponent
            error={error}
            reset={reset}
        />
    );
}