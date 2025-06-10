'use client';

import React, { Suspense, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { CreateContactFormSchema } from '@/features/contacts/_lib/definitions';
import { Option } from '@/components/multiple-selector';
import { InputSkeleton } from '@/components/skeleton/input-skeleton';
import { useGroups } from '../../_hooks/use-groups';
import { CreateContactFormProps } from '../../_types/types';
import { useCreateContact } from '../../_hooks/use-create-contact';
import { clearFormErrors, getFormError } from '@/utils/form-errors.utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  LazyInput,
  LazyMultipleSelector,
  LazyPhoneInput
} from '@/components/lazy/lazy-components';

export function CreateContactForm({
  onCancel,
  onSuccess
}: CreateContactFormProps) {
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

  const { data: groupOptions } = useGroups();
  const createContactMutation = useCreateContact();

  const extentGroupOptions: Option[] = groupOptions.data.map(
    (group: Option) => {
      return { label: group.name, value: group.name };
    }
  );

  const [isTriggered, setIsTriggered] = useState(false);
  const [groups, setGroups] = useState<Option[]>([]);

  function onSubmit(values: z.infer<typeof CreateContactFormSchema>) {
    createContactMutation.mutate(values);
    // onSuccess();
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
                      onInput={() => {
                        clearFormErrors();
                      }}
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
                    {getFormError('email') && (
                      <p className='text-sm text-red-500'>
                        {getFormError('email')}
                      </p>
                    )}
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
                    {getFormError('smsPhoneNumber') && (
                      <p className='text-sm text-red-500'>
                        {getFormError('smsPhoneNumber')}
                      </p>
                    )}
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
                    {getFormError('whatsAppPhoneNumber') && (
                      <p className='text-sm text-red-500'>
                        {getFormError('whatsAppPhoneNumber')}
                      </p>
                    )}
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
                      onSearch={async (value) => {
                        setIsTriggered(true);
                        const res = extentGroupOptions;
                        setIsTriggered(false);
                        return res;
                      }}
                      triggerSearchOnFocus
                      loadingIndicator={
                        <p className='text-muted-foreground py-2 text-center text-lg leading-10'>
                          loading...
                        </p>
                      }
                      placeholder='Select groups you like...'
                      creatable
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
            <Button type='submit' disabled={createContactMutation.isLoading}>
              {createContactMutation.isLoading && (
                <Icons.loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {createContactMutation.isLoading ? 'Save...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
