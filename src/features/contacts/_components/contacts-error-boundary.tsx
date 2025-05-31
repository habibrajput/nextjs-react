'use client';

import { Button } from '@/components/ui/button';
import { Bug } from 'lucide-react';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

type State = {
    hasError: boolean;
    error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[70dvh] bg-gray-100 px-3 py-5 sm:px-1 lg:px-3 border-dashed border-2 border-muted rounded-lg shadow-sm">
                    <div className="mx-auto max-w-md text-center">
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            <Bug size={50} className='animate-bounce' color='red'/> Oops, something went wrong!
                        </h1>
                        <p className="mt-4 text-muted-foreground">An unexpected error has occurred</p>
                        <div className="mt-6">
                            <Button
                                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children;
    }
}
