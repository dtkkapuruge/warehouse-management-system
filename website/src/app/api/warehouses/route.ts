import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Warehouse from '@/models/Warehouse';
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
    await dbConnect();
    const warehouses = await Warehouse.find({});
    return NextResponse.json({ success: true, data: warehouses });
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
    const warehouse = await Warehouse.create(body);
    return NextResponse.json({ success: true, data: warehouse }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
