import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Project from '../../../../models/Project';

// GET - Fetch all projects
export async function GET() {
  try {
    await connectDB();
    
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { 
        success: true, 
        data: projects 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request) {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');
    
    const body = await request.json();
    console.log('Request body:', { ...body, imageUrl: body.imageUrl ? 'BASE64_IMAGE_DATA' : 'NO_IMAGE' });
    
    const { name, description, status, imageUrl, technologies, liveUrl, githubUrl } = body;

    // Validate required fields
    if (!name || !description || !status || !imageUrl) {
      console.log('Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Name, description, status, and image are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['In Progress', 'Completed', 'On Hold', 'Planning'];
    if (!validStatuses.includes(status)) {
      console.log('Validation failed - invalid status:', status);
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: In Progress, Completed, On Hold, Planning' },
        { status: 400 }
      );
    }

    console.log('Creating new project...');
    // Create new project
    const project = new Project({
      name,
      description,
      status,
      imageUrl,
      technologies: technologies || [],
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || ''
    });

    console.log('Saving project to database...');
    const savedProject = await project.save();
    console.log('Project saved successfully:', savedProject._id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Project created successfully',
        data: savedProject
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating project:', error);
    console.error('Error stack:', error.stack);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.log('Validation errors:', validationErrors);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Handle connection errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      console.error('Database connection error:', error.message);
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB connection.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create project', details: error.message },
      { status: 500 }
    );
  }
}
