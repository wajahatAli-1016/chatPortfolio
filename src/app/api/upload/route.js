import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      );
    }

    // For now, we'll return the base64 image as the URL
    // In production, you might want to upload to a service like:
    // - Cloudinary
    // - AWS S3
    // - Vercel Blob Storage
    // - ImageKit
    
    const imageUrl = image; // This will be the base64 data

    return NextResponse.json(
      { 
        success: true, 
        imageUrl: imageUrl,
        message: 'Image uploaded successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 