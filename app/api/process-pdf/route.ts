import { ingestData } from '@/lib/ingest-data';
import { createClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_BUCKET = 'uploads';

export async function POST(req: NextRequest, res: NextResponse) {
  console.log('processing new pdf...');
  const form = await req.formData();

  let file: any;

  const fileItem = form.get('file');

  file = fileItem;
  // if (fileItem instanceof File) {
  //   file = fileItem;
  // } else {
  //   return NextResponse.json(
  //     { message: 'error' },
  //     {
  //       status: 400
  //     }
  //   );
  // }

  if (!file) {
    return NextResponse.json({ message: 'file empty' }, { status: 400 });
  }

  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const currentUserId = (await supabase.auth.getUser()).data.user?.id;

  console.log('currentUserId', currentUserId);

  if (!currentUserId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const fileBlob = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileBlob);

  const { error, data } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(`${currentUserId}/${file.name}`, fileBuffer, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false
    });

  if (error) {
    console.error('error storing file to supabase due to', error.message);
    return NextResponse.json(
      { message: 'error uploading file' },
      { status: 500 }
    );
  }

  try {
    // @ts-ignore
    await ingestData(file, data.id);
  } catch (e) {
    await supabase.storage
      .from(SUPABASE_BUCKET)
      .remove([`${currentUserId}/${file.name}`]);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
  return NextResponse.json({ message: 'success' }, { status: 200 });
}
