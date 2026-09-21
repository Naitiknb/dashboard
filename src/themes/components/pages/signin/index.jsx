
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Label from "@radix-ui/react-label";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }
            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            console.error("Login error:", error);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-semibold text-white shadow-sm">
                        W
                    </div>

                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Sign in to your account
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Enter your credentials to access the telemetry portal.
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div className="space-y-2">
                            <Label.Root
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700"
                            >
                                Email address
                            </Label.Root>

                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                className="h-10"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label.Root
                                htmlFor="password"
                                className="text-sm font-medium text-slate-700"
                            >
                                Password
                            </Label.Root>

                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="h-10"
                                required
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-10 w-full bg-blue-600 hover:bg-blue-700"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    Production Monitoring Portal
                </p>
            </div>
        </div>
    );
}

