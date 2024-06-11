'use client';

import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { IconGoogle, IconSpinner } from '@/components/ui/icons';
import { createClient } from '@/lib/supabase-client';
import { cn, getOrigin } from '@/lib/utils';

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean;
  text?: string;
}

export function LoginButton({
  text = 'Login with Google',
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const supabase = createClient();
  const origin = getOrigin();
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/api/auth/callback`
      }
    });
  };

  return (
    <Button
      variant='outline'
      onClick={() => {
        setIsLoading(true);
        signIn();
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className='mr-2 animate-spin' />
      ) : showGithubIcon ? (
        <IconGoogle className='mr-2' />
      ) : null}
      {text}
    </Button>
  );
}
