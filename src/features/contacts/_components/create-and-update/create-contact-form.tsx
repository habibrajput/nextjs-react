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
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  email: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  phone: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});

type CreateContactFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export function CreateContactForm({
  onCancel,
  onSuccess
}: CreateContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter contact name' {...field} />
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
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No</FormLabel>
                <FormControl>
                  <Input placeholder='Enter phone number' {...field} />
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
