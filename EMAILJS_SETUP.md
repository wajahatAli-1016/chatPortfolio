# EmailJS Setup Guide

To make the contact form actually send emails to your Gmail account, you need to set up EmailJS:

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as your email service
4. Connect your Gmail account (wajahataliq1224@gmail.com)
5. Note down the Service ID (e.g., "service_abc123")

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down the Template ID (e.g., "template_xyz789")

## Step 4: Get Public Key
1. Go to "Account" → "API Keys"
2. Copy your Public Key

## Step 5: Update Contact Form
Replace the placeholder values in `src/app/contact/page.js`:

```javascript
// Replace these values:
emailjs.init("YOUR_PUBLIC_KEY"); // Your actual public key
'YOUR_SERVICE_ID', // Your service ID
'YOUR_TEMPLATE_ID', // Your template ID
```

## Alternative: Use Formspree (Easier Setup)
If EmailJS seems complicated, you can use Formspree instead:

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up and create a new form
3. Get your form endpoint URL
4. Replace the form action with your Formspree URL

The contact form will then automatically send emails to your Gmail account! 