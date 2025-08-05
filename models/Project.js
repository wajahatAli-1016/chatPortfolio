import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Project description cannot exceed 1000 characters']
  },
  status: {
    type: String,
    required: [true, 'Project status is required'],
    enum: ['In Progress', 'Completed', 'On Hold', 'Planning'],
    default: 'In Progress'
  },
  imageUrl: {
    type: String,
    required: [true, 'Project image is required']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  liveUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt field on save
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema); 