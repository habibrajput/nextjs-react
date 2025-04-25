"use client"

import * as React from "react"
import { Check, CircleDot, CloudUpload } from "lucide-react"

import { cn } from "@/lib/utils"

const StepperContext = React.createContext<{
    activeStep: number
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    visitedSteps: Set<number>
    setVisitedSteps: React.Dispatch<React.SetStateAction<Set<number>>>
    openSteps: Set<number>
    setOpenSteps: React.Dispatch<React.SetStateAction<Set<number>>>
    steps: number
    orientation: "vertical" | "horizontal"
    allowMultipleOpen: boolean
}>({
    activeStep: 0,
    setActiveStep: () => { },
    visitedSteps: new Set<number>(),
    setVisitedSteps: () => { },
    openSteps: new Set<number>(),
    setOpenSteps: () => { },
    steps: 0,
    orientation: "vertical",
    allowMultipleOpen: false,
})

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    activeStep?: number
    orientation?: "vertical" | "horizontal"
    onStepChange?: (step: number) => void
    allowMultipleOpen?: boolean
    defaultOpenSteps?: number[]
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
    (
        {
            activeStep = 0,
            orientation = "vertical",
            onStepChange,
            allowMultipleOpen = false,
            defaultOpenSteps = [],
            className,
            children,
            ...props
        },
        ref,
    ) => {
        const [currentStep, setCurrentStep] = React.useState(activeStep)
        const [visitedSteps, setVisitedSteps] = React.useState<Set<number>>(new Set([activeStep]))
        const [openSteps, setOpenSteps] = React.useState<Set<number>>(
            new Set(defaultOpenSteps.length > 0 ? defaultOpenSteps : [activeStep]),
        )
        const childrenArray = React.Children.toArray(children)
        const steps = childrenArray.length

        React.useEffect(() => {
            setCurrentStep(activeStep)
            setVisitedSteps((prev) => new Set([...Array.from(prev), activeStep]))
            setOpenSteps((prev) => {
                if (allowMultipleOpen) {
                    return new Set([...Array.from(prev), activeStep])
                }
                return new Set([activeStep])
            })
        }, [activeStep, allowMultipleOpen])

        React.useEffect(() => {
            if (onStepChange) {
                onStepChange(currentStep)
            }
        }, [currentStep, onStepChange])

        return (
            <StepperContext.Provider
                value={{
                    activeStep: currentStep,
                    setActiveStep: setCurrentStep,
                    visitedSteps,
                    setVisitedSteps,
                    openSteps,
                    setOpenSteps,
                    steps,
                    orientation,
                    allowMultipleOpen,
                }}
            >
                <div
                    ref={ref}
                    className={cn("flex", orientation === "vertical" ? "flex-col" : "flex-row", className)}
                    {...props}
                >
                    {children}
                </div>
            </StepperContext.Provider>
        )
    },
)
Stepper.displayName = "Stepper"

export interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
    completed?: boolean
    optional?: boolean
    optionalLabel?: string
    disabled?: boolean
    index?: number
    icon: React.ComponentType
}

const StepperStep = React.forwardRef<HTMLDivElement, StepperStepProps>(
    (
        {
            completed,
            optional,
            optionalLabel = "Optional",
            disabled = false,
            index: customIndex,
            className,
            children,
            icon: Icon,
            ...props
        },
        ref,
    ) => {
        const {
            activeStep,
            setActiveStep,
            visitedSteps,
            setVisitedSteps,
            openSteps,
            setOpenSteps,
            orientation,
            allowMultipleOpen,
        } = React.useContext(StepperContext)

        const index = customIndex !== undefined ? customIndex : React.Children.count(React.Children.toArray(children))
        const isActive = activeStep === index
        const isCompleted = completed || (visitedSteps.has(index) && index < activeStep)
        const isOpen = openSteps.has(index)

        const handleClick = () => {
            if (disabled) return

            setActiveStep(index)
            setVisitedSteps((prev) => new Set([...Array.from(prev), index]))

            setOpenSteps((prev) => {
                if (allowMultipleOpen) {
                    // Toggle the clicked step
                    const newOpenSteps = new Set(prev)
                    if (newOpenSteps.has(index)) {
                        newOpenSteps.delete(index)
                    } else {
                        newOpenSteps.add(index)
                    }
                    return newOpenSteps
                }
                return new Set([index])
            })
        }

        return (
            <div
                ref={ref}
                className={cn("group flex", orientation === "vertical" ? "flex-row" : "flex-col items-center", className)}
                {...props}
            >
                <div className="flex items-center w-full bg-primary/5 rounded-md py-2 px-1">
                    <button
                        type="button"
                        onClick={handleClick}
                        disabled={disabled}
                        className={cn(
                            "relative flex h-9 w-9 p-2 items-center justify-center rounded-full border-2 transition-colors",
                            isCompleted
                                ? "border-primary bg-primary text-primary-foreground"
                                : isActive
                                    ? "border-primary text-foreground"
                                    : visitedSteps.has(index)
                                        ? "border-primary/70 bg-primary/10 text-foreground"
                                        : "border-muted-foreground/30 text-muted-foreground",
                            !disabled && "cursor-pointer",
                            disabled && "opacity-50 cursor-not-allowed",
                        )}
                        aria-current={isActive ? "step" : undefined}
                    >
                        <Icon />
                    </button>
                    {orientation === "vertical" && (
                        <div className="ml-2 flex justify-between w-full">
                            <span
                                className={cn(
                                    "text-md font-bold w-full",
                                    isActive ? "text-foreground" : isOpen ? "text-foreground" : "text-foreground",
                                )}
                            >
                                <span>{children}</span>
                            </span>
                            <span className="underline underline-offset-1 text-sm font-bold cursor-pointer pr-3" onClick={handleClick}>Edit</span>
                        </div>
                    )}
                </div>
                {orientation === "horizontal" && (
                    <div className="mt-2 text-center">
                        <span
                            className={cn(
                                "text-sm font-medium",
                                isActive ? "text-foreground" : isOpen ? "text-foreground" : "text-muted-foreground",
                            )}
                        >
                            {children}
                        </span>
                        {optional && <div className="text-xs text-muted-foreground bg">{optionalLabel}</div>}
                    </div>
                )}
            </div>
        )
    },
)
StepperStep.displayName = "StepperStep"

export interface StepperConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
    stepIndex?: number
}

const StepperConnector = React.forwardRef<HTMLDivElement, StepperConnectorProps>(
    ({ className, stepIndex, ...props }, ref) => {
        const { orientation, activeStep, visitedSteps } = React.useContext(StepperContext)

        const isActive = stepIndex !== undefined && (activeStep > stepIndex || visitedSteps.has(stepIndex + 1))

        return (
            <div
                ref={ref}
                className={cn("relative", orientation === "vertical" ? "ml-4 h-[10px] w-px" : "h-px w-full", className)}
                {...props}
            >
                <div
                    className={cn(
                        "absolute",
                        orientation === "vertical" ? "h-full w-px left-0 top-0" : "h-px w-full left-0 top-0",
                        "bg-muted-foreground/30",
                    )}
                />
                <div
                    className={cn(
                        "absolute transition-all duration-300",
                        orientation === "vertical" ? "h-0 w-px left-0 top-0" : "h-px w-0 left-0 top-0",
                        isActive ? (orientation === "vertical" ? "h-full" : "w-full") : "",
                        "bg-primary",
                    )}
                />
            </div>
        )
    },
)
StepperConnector.displayName = "StepperConnector"

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
    step: number
}

const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
    ({ step, className, children, ...props }, ref) => {
        const { openSteps, orientation } = React.useContext(StepperContext)
        const isOpen = openSteps.has(step)

        if (!isOpen) {
            return null
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "overflow-hidden transition-all duration-300",
                    orientation === "vertical" ? "ml-4 pl-4 border-l border-primary/30" : "",
                    className,
                )}
                {...props}
            >
                <div className="py-2">{children}</div>
            </div>
        )
    },
)
StepperContent.displayName = "StepperContent"

export interface StepperActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    onNext?: () => void
    onBack?: () => void
    nextLabel?: string
    backLabel?: string
    disableNext?: boolean
    disableBack?: boolean
}

const StepperActions = React.forwardRef<HTMLDivElement, StepperActionsProps>(
    (
        {
            onNext,
            onBack,
            nextLabel = "Next",
            backLabel = "Back",
            disableNext = false,
            disableBack = false,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        const { activeStep, setActiveStep, steps, setVisitedSteps, setOpenSteps, allowMultipleOpen } =
            React.useContext(StepperContext)

        const handleNext = () => {
            if (activeStep < steps - 1) {
                const nextStep = activeStep + 1
                setActiveStep(nextStep)
                setVisitedSteps((prev) => new Set([...Array.from(prev), nextStep]))

                setOpenSteps((prev) => {
                    if (allowMultipleOpen) {
                        return new Set([...Array.from(prev), nextStep])
                    }
                    return new Set([nextStep])
                })

                if (onNext) onNext()
            }
        }

        const handleBack = () => {
            if (activeStep > 0) {
                const prevStep = activeStep - 1
                setActiveStep(prevStep)

                setOpenSteps((prev) => {
                    if (allowMultipleOpen) {
                        return prev
                    }
                    return new Set([prevStep])
                })

                if (onBack) onBack()
            }
        }

        return (
            <div ref={ref} className={cn("mt-4 flex justify-between", className)} {...props}>
                {children ? (
                    children
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={activeStep === 0 || disableBack}
                            className={cn(
                                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                                "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2",
                            )}
                        >
                            {backLabel}
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={activeStep === steps - 1 || disableNext}
                            className={cn(
                                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                                "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
                            )}
                        >
                            {nextLabel}
                        </button>
                    </>
                )}
            </div>
        )
    },
)
StepperActions.displayName = "StepperActions"

export { Stepper, StepperStep, StepperConnector, StepperContent, StepperActions }
