'use client';
import { LoadingButton } from '@/components/ui/loading-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useState } from 'react';
import GithubSignInButton from './github-auth-button';
import { al } from '@faker-js/faker/dist/airline-BUL6NtOJ';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: 'habibee1@gmail.com',
    password: 'habib@gmail.com'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = (data: UserFormValue) => {
    startTransition(() => {
      setIsSigningIn(true); 

      // setTimeout(() => {
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
          //callbackUrl: callbackUrl ?? '/dashboard'
        })
          .then(() => {
            toast.success('Signed In Successfully!');
          })
          .catch(() => {
            toast.error('Sign In Failed!');
          })
          .finally(() => {
            setIsSigningIn(false);
          });
      // }, 3000);
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your pass...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            disabled={isSigningIn}
            className='mt-2 ml-auto w-full'
            type='submit'
            isLoading={isSigningIn}
          >
            {isSigningIn ? 'Sign In...': 'Sign In'}
          </LoadingButton>
        </form>
      </Form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background text-muted-foreground px-2'>
            Or continue with
          </span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}
