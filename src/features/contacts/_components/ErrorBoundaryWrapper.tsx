'use client';

import { ErrorBoundary } from "./contacts-error-boundary";


export default function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
    return <ErrorBoundary>{children}</ErrorBoundary>;
}
