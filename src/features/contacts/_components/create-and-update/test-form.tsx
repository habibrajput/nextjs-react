import React, { Suspense } from 'react';
import { useFormErrors } from './FormErrorsContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { InputSkeleton } from '@/components/skeleton/input-skeleton';
import { LazyInput } from '@/components/lazy/lazy-components';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CreateContactFormSchema } from '@/features/contacts/_lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
export const PopoverForm = () => {
  const { setError, getError } = useFormErrors();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('name', 'Popover form name must be unique');
  };

  const form = useForm<z.infer<typeof CreateContactFormSchema>>({
    resolver: zodResolver(CreateContactFormSchema),
    defaultValues: {
      firstName: 'habib',
      lastName: 'ur rehman',
      email: 'habib@gmail.com',
      smsPhoneNumber: '+925349433345',
      whatsAppPhoneNumber: '+925349433345',
      groups: []
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Form {...form}>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First Name <span className={`text-red-600`}>*</span>
              </FormLabel>
              <FormControl>
                <Suspense fallback={<InputSkeleton />}>
                  <LazyInput
                    placeholder='Enter contact first name'
                    {...field}
                  />
                  <span style={{ color: 'red' }}>{getError('name')[0]}</span>
                </Suspense>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <button type='submit'>Submit</button>
    </form>
  );
};