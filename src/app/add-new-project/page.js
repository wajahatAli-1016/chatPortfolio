"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const AddNewProject = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        projectName: '',
        projectDescription: '',
        projectStatus: 'In Progress',
        projectImage: null,
        technologies: '',
        liveUrl: '',
        githubUrl: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Check authentication on component mount
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.push('/login?redirect=/add-new-project');
                return;
            }
            
            // Verify token with backend
            fetch('/api/auth/verify', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('authToken');
                    router.push('/login?redirect=/add-new-project');
                }
            })
            .catch(error => {
                console.error('Auth check error:', error);
                localStorage.removeItem('authToken');
                router.push('/login?redirect=/add-new-project');
            })
            .finally(() => {
                setIsLoading(false);
            });
        };

        checkAuth();
    }, [router]);

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Convert file to base64
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    projectImage: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            // First, upload the image
            let imageUrl = '';
            if (formData.projectImage) {
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        image: formData.projectImage
                    }),
                });

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload image');
                }

                const uploadData = await uploadResponse.json();
                imageUrl = uploadData.imageUrl;
            }

            // Then, create the project
            const projectData = {
                name: formData.projectName,
                description: formData.projectDescription,
                status: formData.projectStatus,
                imageUrl: imageUrl,
                technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
                liveUrl: formData.liveUrl,
                githubUrl: formData.githubUrl
            };

            const response = await fetch('/api/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Project added successfully!' });
                // Reset form
                setFormData({
                    projectName: '',
                    projectDescription: '',
                    projectStatus: 'In Progress',
                    projectImage: null,
                    technologies: '',
                    liveUrl: '',
                    githubUrl: ''
                });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to add project' });
            }
        } catch (error) {
            console.error('Error submitting project:', error);
            setMessage({ type: 'error', text: 'An error occurred while adding the project' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backButton}>
                <svg viewBox="0 0 24 24">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Portfolio
            </Link>
            
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Add New Project</h1>
                
                {message.text && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Project Image</label>
                        <div className={styles.fileInput}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                id="projectImage"
                                required
                            />
                            <label htmlFor="projectImage" className={styles.fileInputLabel}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"/>
                                </svg>
                                {formData.projectImage ? 'Image selected' : 'Choose an image file'}
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Project Name</label>
                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleInputChange}
                            placeholder="Enter project name"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Project Description</label>
                        <textarea
                            name="projectDescription"
                            value={formData.projectDescription}
                            onChange={handleInputChange}
                            placeholder="Enter project description"
                            className={styles.textarea}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Technologies (comma-separated)</label>
                        <input
                            type="text"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleInputChange}
                            placeholder="e.g., React, Node.js, MongoDB"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Live URL (optional)</label>
                        <input
                            type="url"
                            name="liveUrl"
                            value={formData.liveUrl}
                            onChange={handleInputChange}
                            placeholder="https://your-project.com"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>GitHub URL (optional)</label>
                        <input
                            type="url"
                            name="githubUrl"
                            value={formData.githubUrl}
                            onChange={handleInputChange}
                            placeholder="https://github.com/username/project"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Project Status</label>
                        <select
                            name="projectStatus"
                            value={formData.projectStatus}
                            onChange={handleInputChange}
                            className={styles.select}
                        >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Planning">Planning</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding Project...' : 'Add Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewProject;