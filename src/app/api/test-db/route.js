import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';

export async function GET() {
  try {
    console.log('Testing database connection...');
    await connectDB();
    console.log('Database connection test successful');
    
    // Try to count documents to verify connection
    const count = await Project.countDocuments();
    console.log('Current project count:', count);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Database connection successful',
        projectCount: count
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 