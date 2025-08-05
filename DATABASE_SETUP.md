# Database Setup Guide

## Prerequisites

1. **MongoDB**: You need a MongoDB database running. You can use:
   - **Local MongoDB**: Install MongoDB locally
   - **MongoDB Atlas**: Use the cloud service (recommended for production)
   - **Other MongoDB providers**: Any MongoDB-compatible service

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# For production, use MongoDB Atlas or other cloud database
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Setup Steps

### 1. Install Dependencies
```bash
npm install mongoose mongodb
```

### 2. Set up MongoDB

#### Option A: Local MongoDB
1. Install MongoDB on your machine
2. Start MongoDB service
3. Use the local connection string: `mongodb://localhost:27017/portfolio`

#### Option B: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace the MONGODB_URI in your .env.local file

### 3. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/add-new-project` to test the form

3. Check your database to see if projects are being saved

## API Endpoints

### POST /api/project
Creates a new project

**Request Body:**
```json
{
  "name": "Project Name",
  "description": "Project description",
  "status": "In Progress",
  "imageUrl": "base64_image_data",
  "technologies": ["React", "Node.js"],
  "liveUrl": "https://project.com",
  "githubUrl": "https://github.com/user/project"
}
```

### GET /api/project
Fetches all projects

### POST /api/upload
Handles image uploads (currently returns base64 data)

## Features

- ✅ **Project Creation**: Add new projects with all details
- ✅ **Image Upload**: Upload project images (base64 for now)
- ✅ **Form Validation**: Client and server-side validation
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Responsive Design**: Works on all devices
- ✅ **Database Integration**: MongoDB with Mongoose

## Production Considerations

1. **Image Storage**: Replace base64 with a proper image hosting service like:
   - Cloudinary
   - AWS S3
   - Vercel Blob Storage
   - ImageKit

2. **Environment Variables**: Use proper environment variables in production

3. **Database Security**: Use connection pooling and proper authentication

4. **Error Logging**: Implement proper error logging for production

## Troubleshooting

### Common Issues:

1. **Connection Error**: Check your MONGODB_URI
2. **CORS Error**: Make sure your API routes are properly configured
3. **Validation Error**: Check that all required fields are filled
4. **Image Upload Error**: Ensure the image is a valid format

### Debug Steps:

1. Check browser console for errors
2. Check server logs for API errors
3. Verify database connection
4. Test API endpoints with Postman or similar tool 