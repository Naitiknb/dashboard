"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F3F3F3]">
            <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">
                    Something went wrong
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    We couldn't load this page.
                </p>

                <button
                    onClick={() => reset()}
                    className="mt-5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}