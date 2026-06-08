import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Distribution from '@/models/Distribution';
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
    // Populate product and warehouse to show details
    const distributions = await Distribution.find({}).populate('product').populate('warehouse');
    return NextResponse.json({ success: true, data: distributions });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const distribution = await Distribution.create(body);
    return NextResponse.json({ success: true, data: distribution }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
