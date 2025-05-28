'use client';

import { cn } from '@/lib/utils';
import React from 'react';

export class ContactsErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('Contacts module error:', error, info);
    }

    render() {
        return (
            <div>
                <div className={cn(
                    "w-full h-full flex items-center justify-center",
                    "flex-col gap-4",
                    "bg-background border-border hover:border-border/80 text-center",
                    "border-2 border-dashed rounded-xl p-14 w-full max-w-[620px]",
                    "group hover:bg-muted/50 transition duration-500 hover:duration-200",
                )}>
                    <div className="flex justify-center isolate">

                        <div className="bg-background size-12 grid place-items-center rounded-xl shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
                        </div>
                    </div>
                    <h2 className="text-foreground font-medium mt-6">sad</h2>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">sdfs</p>

                </div>
            </div>
        );
    }
}
