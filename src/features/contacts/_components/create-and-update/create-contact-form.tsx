'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  lastName: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  email: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  smsPhoneNumber: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  whatsAppPhoneNumber: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});

import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { MultiSelect } from '@/components/multi-select';
import { PhoneInput } from '@/components/phone-input';
import { Country } from 'react-phone-number-input';


const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

type CreateContactFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export function CreateContactForm({
  onCancel,
  onSuccess
}: CreateContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react", "angular"]);

  const [country, setCountry] = useState<Country>();
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      smsPhoneNumber: '',
      whatsAppPhoneNumber:''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  }

  return (
    <div className='py-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter contact first name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter contact last name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='smsPhoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>SMS Phone No</FormLabel>
                <FormControl>
                  <Input placeholder='Enter phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='whatsAppPhoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>What's app Phone No</FormLabel>
                <FormControl>
                  <Input placeholder='Enter what"s app number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PhoneInput
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter a phone number"
          />

          <MultiSelect
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={3}
          />

          <div className='flex justify-end space-x-4 pt-4'>
            <Button type='button' variant='outline' onClick={onCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isSubmitting ? 'Save...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
