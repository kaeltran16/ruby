import { createClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import * as React from 'react';
import UserOrLogin from './user-or-login';

export async function Header() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const session = await supabase.auth.getSession();

  const user = session.data.session?.user;

  return (
    <header className='sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl'>
      <div className='flex items-center'>
        <React.Suspense fallback={<div className='flex-1 overflow-auto' />}>
          <UserOrLogin user={user} />
        </React.Suspense>
      </div>
    </header>
  );
}
