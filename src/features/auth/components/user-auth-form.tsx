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
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(5, { message: 'Must be 5 or more characters long' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const defaultValues = {
    email: 'habib@gmail.com',
    password: 'habib@gmail.com'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      setIsSigningIn(true);
      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })
        .then((data) => {
          console.log(data)
          if (data.error === 'CredentialsSignin') {
            setSignInError('Invalid identifier or password');
          } else if (data.error) {
            setSignInError('Server Error');
          }

          // router.push(callbackUrl ?? '/dashboard/overview');
        })
        .catch(() => {
          toast.error('Sign In Failed!');
        })
        .finally(() => {
          setIsSigningIn(false);
        });
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
          {signInError && (
            <>
              <div className='ml-auto w-full rounded-sm bg-red-50 p-2 text-center text-sm text-red-600'>
                <span>{signInError}</span>
              </div>
            </>
          )}

          <LoadingButton
            disabled={isSigningIn}
            className='mt-2 ml-auto w-full'
            type='submit'
            isLoading={isSigningIn}
          >
            {isSigningIn ? 'Sign In...' : 'Sign In'}
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
