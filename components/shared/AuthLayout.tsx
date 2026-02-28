"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AuthLayoutProps {
    children: React.ReactNode;
    imageSrc: string;
    quote?: string;
    author?: string;
    description?: string;
    badges?: React.ReactNode;
}

export function AuthLayout({
    children,
    imageSrc,
    quote,
    author,
    description,
    badges,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full bg-slate-50">
            {/* Left Side: Form */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex w-full flex-col justify-center px-8 lg:w-1/2 xl:px-24"
            >
                <div className="mx-auto w-full max-w-md">
                    {children}
                </div>
            </motion.div>

            {/* Right Side: Image & Quote */}
            <div className="relative hidden w-1/2 lg:block">
                <Image
                    src={imageSrc}
                    alt="Auth Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {quote && (
                            <h2 className="mb-4 text-3xl font-bold italic leading-tight">
                                "{quote}"
                            </h2>
                        )}
                        {description && (
                            <p className="mb-6 text-lg text-slate-200">
                                {description}
                            </p>
                        )}
                        {author && (
                            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
                                <span className="h-0.5 w-8 bg-blue-500" />
                                {author}
                            </p>
                        )}
                        {badges && (
                            <div className="mt-8">
                                {badges}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
