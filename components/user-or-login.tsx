'use client';
import { createClient } from '@/lib/supabase-client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { FC } from 'react';
import { ChatHistory } from './chat-history';
import { LoginButton } from './login-button';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarToggle } from './sidebar-toggle';
import { IconNextChat, IconSeparator } from './ui/icons';
import { UserMenu } from './user-menu';

export interface UserOrLoginProps {
  user: User | undefined;
}

const UserOrLogin: FC<UserOrLoginProps> = ({ user }) => {
  const supabase = createClient();

  return (
    <>
      {user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href='/' target='_blank' rel='nofollow'>
          <IconNextChat className='w-6 h-6 mr-2 dark:hidden' inverted />
          <IconNextChat className='hidden w-6 h-6 mr-2 dark:block' />
        </Link>
      )}
      <div className='flex items-center'>
        <IconSeparator className='w-6 h-6 text-muted-foreground/50' />
        {user ? (
          <UserMenu user={user} />
        ) : (
          // <Button onClick={signIn} variant='link' asChild className='-ml-2'>
          //   Login
          // </Button>

          <LoginButton />

          // <Button onClick={signIn} variant='shadow' className='-ml-2'>
          //   Login
          // </Button>
        )}
      </div>
    </>
  );
};

export default UserOrLogin;
