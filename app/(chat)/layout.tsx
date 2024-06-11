import RightSidebar from '@/components/right-sidebar';
import { SidebarDesktop } from '@/components/sidebar-desktop';
import { createClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return null;
  }

  const { data: files, error } = await supabase.storage
    .from('uploads')
    .list(user.id);

  if (error) {
    console.log('error', error);
  }

  return (
    <div className='relative justify-between flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden'>
      <SidebarDesktop />
      <div className='group w-full flex justify-center mx-auto pl-0 animate-in duration-300'>
        {children}
      </div>
      <RightSidebar />
    </div>
  );
}
