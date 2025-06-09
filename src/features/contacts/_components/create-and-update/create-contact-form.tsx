'use client';

import React, { Suspense, useState } from 'react';
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
import { Icons } from '@/components/icons';
import { CreateContactFormSchema } from '@/features/contacts/_lib/definitions';
import { Option } from '@/components/multiple-selector';
import {
  LazyInput,
  LazyMultipleSelector,
  LazyPhoneInput
} from '@/components/lazy/lazy-components';
import { InputSkeleton } from '@/components/skeleton/input-skeleton';

const OPTIONS: Option[] = [
  { label: 'Group 1', value: 'group_1' },
  { label: 'Group 2', value: 'group_2' },
  { label: 'Group 3', value: 'group_3' },
  { label: 'Group 4', value: 'group_4', disable: true }
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

  const form = useForm<z.infer<typeof CreateContactFormSchema>>({
    resolver: zodResolver(CreateContactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      smsPhoneNumber: '',
      whatsAppPhoneNumber: '',
      groups: []
    }
  });

  function onSubmit(values: z.infer<typeof CreateContactFormSchema>) {
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
                <FormLabel>
                  First Name <span className={`text-red-600`}>*</span>
                </FormLabel>
                <FormControl>
                  <Suspense fallback={<InputSkeleton />}>
                    <LazyInput
                      placeholder='Enter contact first name'
                      {...field}
                    />
                  </Suspense>
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
                  <Suspense fallback={<InputSkeleton />}>
                    <LazyInput
                      placeholder='Enter contact last name'
                      {...field}
                    />
                  </Suspense>
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
                  <Suspense fallback={<InputSkeleton />}>
                    <LazyInput placeholder='Enter email' {...field} />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='smsPhoneNumber'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel className='text-left'>SMS Phone Number</FormLabel>
                <FormControl className='w-full'>
                  <Suspense fallback={<InputSkeleton />}>
                    <LazyPhoneInput
                      className='w-full'
                      placeholder='Enter a phone number'
                      international
                      initialValueFormat='national'
                      defaultCountry='PK'
                      {...field}
                    />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='whatsAppPhoneNumber'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel className='text-left'>
                  Whats App Phone Number
                </FormLabel>
                <FormControl className='w-full'>
                  <Suspense fallback={<InputSkeleton />}>
                    <LazyPhoneInput
                      className='w-full'
                      placeholder='Enter a phone number'
                      international
                      initialValueFormat='national'
                      defaultCountry='PK'
                      {...field}
                    />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='groups'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Groups</FormLabel>
                <FormControl>
                  <Suspense fallback={<InputSkeleton />}>
                    <LazyMultipleSelector
                      {...field}
                      defaultOptions={OPTIONS}
                      placeholder='Select groups you like...'
                      emptyIndicator={
                        <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
                          no results found.
                        </p>
                      }
                    />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end space-x-4 pt-4'>
            <Button type='button' variant='outline' onClick={onCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting && (
                <Icons.loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isSubmitting ? 'Save...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
