import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import Product from '@/models/Product';
import Warehouse from '@/models/Warehouse';
import Supplier from '@/models/Supplier';
import Distribution from '@/models/Distribution';
import ContactMessage from '@/models/ContactMessage';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();

    // Clear existing data (optional, but good for resetting)
    await Admin.deleteMany({});
    await Product.deleteMany({});
    await Warehouse.deleteMany({});
    await Supplier.deleteMany({});
    await Distribution.deleteMany({});
    await ContactMessage.deleteMany({});

    // Seed Admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await Admin.create({
      username: 'admin',
      passwordHash: hashedPassword,
      name: 'System Administrator',
      role: 'admin',
    });

    // Seed Suppliers
    const supplier1 = await Supplier.create({
      name: 'Global Electronics Ltd.',
      contactPerson: 'Jane Doe',
      email: 'contact@globalelectronics.com',
      phone: '+1-555-0101',
      address: '123 Tech Park, Silicon Valley, CA',
    });

    const supplier2 = await Supplier.create({
      name: 'Prime Packaging Solutions',
      contactPerson: 'John Smith',
      email: 'sales@primepack.com',
      phone: '+1-555-0202',
      address: '456 Industrial Way, Chicago, IL',
    });

    // Seed Warehouses
    const warehouse1 = await Warehouse.create({
      name: 'Central Hub Alpha',
      location: 'New York, NY',
      capacity: 50000,
      currentStock: 1500,
    });

    const warehouse2 = await Warehouse.create({
      name: 'West Coast Distribution Center',
      location: 'Los Angeles, CA',
      capacity: 30000,
      currentStock: 500,
    });

    // Seed Products
    const product1 = await Product.create({
      name: 'UltraHD Smart TV',
      description: '65-inch 4K Smart TV with HDR',
      sku: 'TV-65-UHD',
      category: 'Electronics',
      price: 799.99,
      stock: 500,
      warehouse: warehouse1._id,
      supplier: supplier1._id,
    });

    const product2 = await Product.create({
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Over-ear bluetooth headphones',
      sku: 'HP-WNC-01',
      category: 'Electronics',
      price: 199.99,
      stock: 1000,
      warehouse: warehouse1._id,
      supplier: supplier1._id,
    });

    const product3 = await Product.create({
      name: 'Heavy Duty Cardboard Boxes',
      description: 'Pack of 50 large shipping boxes',
      sku: 'BOX-HD-50',
      category: 'Packaging',
      price: 49.99,
      stock: 500,
      warehouse: warehouse2._id,
      supplier: supplier2._id,
    });

    // Seed Distribution
    await Distribution.create({
      product: product1._id,
      warehouse: warehouse1._id,
      quantity: 50,
      destination: 'Retail Store - Manhattan',
      status: 'Shipped',
      shippedAt: new Date(),
    });

    await Distribution.create({
      product: product2._id,
      warehouse: warehouse1._id,
      quantity: 100,
      destination: 'Online Order Fulfillment',
      status: 'Pending',
    });
    
    // Seed Contact Message
    await ContactMessage.create({
      name: 'Alice Johnson',
      email: 'alice@example.com',
      subject: 'Inquiry about bulk orders',
      message: 'Hello, I would like to know if you offer discounts on bulk orders of cardboard boxes.',
    });

    return NextResponse.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
