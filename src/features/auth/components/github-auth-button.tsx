'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function GithubSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <div className='flex items-center justify-between space-y-2'>
        <Button
          className='w-fit'
          variant='outline'
          type='button'
          onClick={() =>
            signIn('github', { callbackUrl: callbackUrl ?? '/dashboard' })
          }
        >
          <Icons.github className='h-4 w-4' />
          Github
        </Button>
        <Button
          className='w-fit'
          variant='outline'
          type='button'
          onClick={() =>
            signIn('github', { callbackUrl: callbackUrl ?? '/dashboard' })
          }
        >
          <Icons.github className='h-4 w-4' />
          Google
        </Button>
        <Button
          className='w-fit'
          variant='outline'
          type='button'
          onClick={() =>
            signIn('github', { callbackUrl: callbackUrl ?? '/dashboard' })
          }
        >
          <Icons.github className='h-4 w-4' />
          Meta
        </Button>
      </div>
  );
}
