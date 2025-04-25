"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Stepper, StepperActions, StepperConnector, StepperContent, StepperStep } from "@/components/ui/stepper"
import { UploadContactsForm } from '@/features/contacts/components/add-contact/upload-contact-form';
import { Icons } from "@/components/icons"

type UploadProductsFormProps = {
    onCancel: () => void
    onSuccess: () => void
}

export default function MultiStepForm({ onCancel, onSuccess }: UploadProductsFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvc: "",
        terms: false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, terms: checked }))
    }

    return (
        <main className="container mx-auto py-1">
            <div className="max-w-2xl mx-auto">
                <Stepper allowMultipleOpen={false} defaultOpenSteps={[0]}>
                    <StepperStep icon={Icons.cloudUpload}>Upload File</StepperStep>
                    <StepperConnector stepIndex={0} />
                    <StepperContent step={0}>
                        <UploadContactsForm
                            onCancel={onCancel}
                            onSuccess={onSuccess}
                        />
                    </StepperContent>

                    <StepperStep icon={Icons.contact}>Conform Contacts</StepperStep>
                    <StepperConnector stepIndex={1} />
                    <StepperContent step={1}>
                        <div className="grid gap-4 p-2 rounded-md bg-muted/50">
                            <div className="grid gap-2">
                                <Label htmlFor="address">Street Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="123 Main St"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="New York" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="zip">Zip Code</Label>
                                    <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} placeholder="10001" />
                                </div>
                            </div>
                        </div>
                    </StepperContent>

                    <StepperStep icon={Icons.locateFixed}>Columns Mapping</StepperStep>
                    <StepperConnector stepIndex={2} />
                    <StepperContent step={2}>
                        <div className="grid gap-4 p-2 rounded-md bg-muted/50">
                            <div className="grid gap-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    placeholder="4242 4242 4242 4242"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cardName">Name on Card</Label>
                                <Input
                                    id="cardName"
                                    name="cardName"
                                    value={formData.cardName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input
                                        id="expiry"
                                        name="expiry"
                                        value={formData.expiry}
                                        onChange={handleChange}
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" name="cvc" value={formData.cvc} onChange={handleChange} placeholder="123" />
                                </div>
                            </div>
                        </div>
                    </StepperContent>

                    <StepperStep icon={Icons.group}>Group</StepperStep>
                    <StepperContent step={3}>
                        <div className="grid gap-4 p-2 rounded-md bg-muted/50">
                            <div className="space-y-2">
                                <h3 className="font-medium">Personal Information</h3>
                                <p className="text-sm">Name: {formData.name || "Not provided"}</p>
                                <p className="text-sm">Email: {formData.email || "Not provided"}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-medium">Address</h3>
                                <p className="text-sm">Street: {formData.address || "Not provided"}</p>
                                <p className="text-sm">City: {formData.city || "Not provided"}</p>
                                <p className="text-sm">Zip: {formData.zip || "Not provided"}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-medium">Payment</h3>
                                <p className="text-sm">
                                    Card: {formData.cardNumber ? "•••• •••• •••• " + formData.cardNumber.slice(-4) : "Not provided"}
                                </p>
                                <p className="text-sm">Name on Card: {formData.cardName || "Not provided"}</p>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox id="terms" checked={formData.terms} onCheckedChange={handleCheckboxChange} />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the terms and conditions
                                </label>
                            </div>
                        </div>
                    </StepperContent>
                </Stepper>
            </div>
        </main>
    )
}
