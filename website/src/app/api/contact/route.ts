import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const checkAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  return !!verifyToken(token);
};

export async function GET() {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// POST is public so anyone on the website can submit a contact form
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const message = await ContactMessage.create(body);
    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
