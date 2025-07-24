# Environment Setup

## Required Environment Variables

To run this project, you need to set up the following environment variables:

### 1. Create a `.env.local` file in the root directory

```bash
# Groq API Key for AI chatbot functionality
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here

# EmailJS configuration (if using contact forms)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

### 2. How to get your Groq API Key

1. Go to [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file

### 3. Important Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- For production deployment, set these environment variables in your hosting platform (Vercel, Netlify, etc.)

### 4. Testing the Setup

After setting up the environment variables:

1. Restart your development server: `npm run dev`
2. Test the chatbot functionality
3. Verify that the AI responses are working correctly

## Security

- API keys are sensitive information
- Always use environment variables for API keys
- Never hardcode API keys in your source code
- Regularly rotate your API keys for security 