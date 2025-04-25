"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const StepperContext = React.createContext<{
  activeStep: number
  orientation: "vertical" | "horizontal"
  onChange?: (step: number) => void
}>({
  activeStep: 0,
  orientation: "vertical",
})

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep?: number
  orientation?: "vertical" | "horizontal"
  onChange?: (step: number) => void
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ activeStep = 0, orientation = "vertical", onChange, className, children, ...props }, ref) => (
    <StepperContext.Provider
      value={{
        activeStep,
        orientation,
        onChange,
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
  ),
)
Stepper.displayName = "Stepper"

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  completed?: boolean
  index?: number
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, completed, index, children, ...props }, ref) => {
    const { activeStep, orientation } = React.useContext(StepperContext)
    const isActive = activeStep === index
    const isCompleted = completed || (index !== undefined && activeStep > index)

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex",
          orientation === "vertical" ? "flex-row" : "flex-col",
          className,
        )}
        aria-current={isActive ? "step" : undefined}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Step.displayName = "Step"

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  completed?: boolean
  icon?: React.ReactNode
  index?: number
  total?: number
}

const StepIndicator = React.forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({ className, completed, icon, index, total = 0, ...props }, ref) => {
    const { activeStep, orientation } = React.useContext(StepperContext)
    const isActive = activeStep === index
    const isCompleted = completed || (index !== undefined && activeStep > index)

    return (
      <div className="relative">
        <div
          ref={ref}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : isActive
                ? "border-primary text-foreground"
                : "border-muted-foreground/20 text-muted-foreground",
            className,
          )}
          {...props}
        >
          {isCompleted ? icon || <Check className="h-5 w-5" /> : icon || (index !== undefined ? index + 1 : null)}
        </div>

        {orientation === "vertical" && index !== undefined && index < total - 1 && (
          <div
            className={cn(
              "absolute left-[50%] top-10 h-[calc(100%-40px)] w-0.5 -translate-x-1/2",
              isCompleted ? "bg-primary" : "bg-muted-foreground/20",
            )}
          />
        )}
      </div>
    )
  },
)
StepIndicator.displayName = "StepIndicator"

export interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> { }

const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = React.useContext(StepperContext)

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-1 flex-col",
          orientation === "vertical" ? "ml-2 pb-8" : "mt-2",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
StepContent.displayName = "StepContent"

export interface StepTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

const StepTitle = React.forwardRef<HTMLHeadingElement, StepTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-base font-semibold", className)} {...props} />
  ),
)
StepTitle.displayName = "StepTitle"

export interface StepDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

const StepDescription = React.forwardRef<HTMLParagraphElement, StepDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
  ),
)
StepDescription.displayName = "StepDescription"

export interface StepperFooterProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
 }

const StepperFooter = React.forwardRef<HTMLParagraphElement, StepDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground mt-4 space-x-2", className)} {...props}
    >
      {children}
    </div>
  ),
)
StepDescription.displayName = "StepperFooter"

export { Stepper, Step, StepIndicator, StepContent, StepTitle, StepDescription, StepperFooter }