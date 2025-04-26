"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Stepper, Step, StepIndicator, StepContent, StepTitle, StepDescription, StepperFooter } from "@/components/ui/stepper"
import { Check, CreditCard, Home, User } from "lucide-react";
import { Icons } from "@/components/icons"
import { UploadContactsForm } from "@/features/contacts/components/add-contact/upload-contact-form"

type FormProps = {
    onCancel: () => void
    onSuccess: () => void
}

export default function StepperDemo({ onCancel, onSuccess }: FormProps) {
    const [activeStep, setActiveStep] = useState(0)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        payment: "",
    })

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, 3))
    }

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const steps = [
        {
            title: "Upload your file",
            description: "Select a file containing your contacts to import.",
            icon: <User className="h-5 w-5" />,
            content: (
                <div className="grid gap-4">
                    <h1 className="text-2xl font-semibold">Upload your file</h1>
                    <UploadContactsForm onCancel={onCancel} onSuccess={onSuccess} />
                </div>
            ),
        },
        {
            title: "Mapping data",
            description: "Select the contact attribute that corresponds to your data. You can select existing attributes, create new ones, or choose not to import some data.",
            icon: <Home className="h-5 w-5" />,
            content: (
                <div className="grid gap-4">
                    <h1 className="text-2xl font-semibold"> Mapping data </h1>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="123 Main St"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="New York" />
                    </div>
                </div>
            ),
        },
        {
            title: "Select a list",
            description: "Add your contacts to an existing list or create a new one.",
            icon: <CreditCard className="h-5 w-5" />,
            content: (
                <div className="grid gap-4">
                    <h1 className="text-2xl font-semibold">  Select a list </h1>
                    <div className="grid gap-2">
                        <Label htmlFor="payment">Card Number</Label>
                        <Input
                            id="payment"
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                            placeholder="4242 4242 4242 4242"
                        />
                    </div>
                </div>
            ),
        },
        // {
        //     title: "Complete",
        //     description: "Order submitted successfully",
        //     icon: <Check className="h-5 w-5" />,
        //     content: (
        //         <div className="text-center py-4">
        //             <h1 className="text-2xl font-semibold">Basic Details</h1>
        //             <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
        //                 <Check className="h-8 w-8 text-green-600" />
        //             </div>
        //             <h3 className="text-lg font-medium">Order Complete!</h3>
        //             <p className="text-muted-foreground mt-2">
        //                 Thank you for your order. You will receive a confirmation email shortly.
        //             </p>
        //         </div>
        //     ),
        // },
    ]

    return (
        <div className="container max-w-3xl py-5">
            <div className="flex gap-10">
                <div className="w-1/3 bg-muted rounded-xl py-5 px-3">
                    <Stepper
                        activeStep={activeStep}
                        orientation="vertical"
                    >
                        {steps.map((step, index) => (
                            <Step key={index} index={index} >
                                <StepIndicator index={index} icon={step.icon} total={steps.length} />
                                <StepContent>
                                    <StepTitle>{step.title} <span className="text-sm text-muted-foreground underline font-semibold cursor-pointer">Edit</span></StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </StepContent>
                            </Step>
                        ))}
                        <StepperFooter>
                            <Button 
                                className="rounded-lg p-2" 
                                variant="outline" 
                                onClick={handleBack} 
                                disabled={activeStep === 0}
                            >
                                <Icons.chevronLeft 
                                    onClick={handleBack}
                                    className="mr-2 h-4 w-4" 
                                />
                            </Button>
                            <Button 
                                className="rounded-lg p-2" 
                                variant="outline" 
                                onClick={handleNext} 
                                disabled={activeStep === steps.length - 1}
                            >
                                <Icons.chevronRight 
                                onClick={handleNext}
                                    className="mr-2 h-4 w-4" 
                                />
                            </Button>
                        </StepperFooter>
                    </Stepper>
                </div>
                <div className="w-2/3">{steps[activeStep].content}</div>
            </div>
        </div>
    )
}
