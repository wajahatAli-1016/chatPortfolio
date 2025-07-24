# Vercel Deployment Setup

## Setting Up Environment Variables in Vercel

Your chatbot is showing a fallback response because the Groq API key isn't configured in your Vercel deployment. Follow these steps to fix this:

### Step 1: Get Your Groq API Key

1. Go to [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `gsk_`)

### Step 2: Add Environment Variable to Vercel

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Find and click on your `chatPortfolio` project

2. **Navigate to Settings**
   - Click on the "Settings" tab in your project dashboard

3. **Go to Environment Variables**
   - In the left sidebar, click on "Environment Variables"

4. **Add the Environment Variable**
   - Click "Add New"
   - **Name**: `NEXT_PUBLIC_GROQ_API_KEY`
   - **Value**: Paste your Groq API key (e.g., `gsk_your_actual_key_here`)
   - **Environment**: Select all environments (Production, Preview, Development)
   - Click "Save"

### Step 3: Redeploy Your Application

1. **Trigger a new deployment**
   - Go to the "Deployments" tab
   - Click "Redeploy" on your latest deployment
   - Or push a new commit to trigger automatic deployment

2. **Wait for deployment to complete**
   - The deployment will take a few minutes
   - You'll see a green checkmark when it's done

### Step 4: Test the Chatbot

1. Visit your deployed site
2. Open the chatbot
3. Ask a question about Wajahat
4. You should now get proper AI responses instead of the fallback message

## Troubleshooting

### If the chatbot still shows fallback responses:

1. **Check Environment Variable**
   - Go back to Vercel Settings → Environment Variables
   - Verify `NEXT_PUBLIC_GROQ_API_KEY` is set correctly
   - Make sure it's enabled for all environments

2. **Check API Key**
   - Verify your Groq API key is valid
   - Test it in the Groq console
   - Make sure you have sufficient credits

3. **Clear Browser Cache**
   - Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
   - Or try in an incognito/private window

4. **Check Deployment Logs**
   - In Vercel dashboard, go to the latest deployment
   - Check the build logs for any errors

### Common Issues:

- **"Invalid API Key"**: Double-check the key format and validity
- **"Rate Limit Exceeded"**: You may need to upgrade your Groq plan
- **"Network Error"**: Check your internet connection and try again

## Security Notes

- ✅ The API key is now stored securely in Vercel
- ✅ It's not exposed in your code
- ✅ Only your deployed app can access it
- ✅ You can rotate the key anytime from Groq console

## Next Steps

Once the chatbot is working:
1. Test various questions about Wajahat's projects
2. Verify the AI responses are accurate
3. Consider adding more context to improve responses
4. Monitor your Groq usage to manage costs

Your chatbot should now work perfectly on your deployed Vercel site! 🚀 