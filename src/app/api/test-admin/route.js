import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET() {
  try {
    await connectDB();
    
    // Find all users
    const users = await User.find({}).select('-password');
    
    return NextResponse.json({
      success: true,
      message: 'Users found',
      count: users.length,
      users: users
    });

  } catch (error) {
    console.error('Test admin error:', error);
    return NextResponse.json(
      { success: false, message: 'Error checking users', error: error.message },
      { status: 500 }
    );
  }
} 