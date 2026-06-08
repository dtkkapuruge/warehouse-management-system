import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Warehouse from '@/models/Warehouse';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

type Params = Promise<{ id: string }>;

const checkAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  return !!verifyToken(token);
};

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const resolvedParams = await params;
    const body = await request.json();
    const warehouse = await Warehouse.findByIdAndUpdate(resolvedParams.id, body, { new: true, runValidators: true });
    
    if (!warehouse) return NextResponse.json({ success: false, error: 'Warehouse not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: warehouse });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const resolvedParams = await params;
    const warehouse = await Warehouse.findByIdAndDelete(resolvedParams.id);
    
    if (!warehouse) return NextResponse.json({ success: false, error: 'Warehouse not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
