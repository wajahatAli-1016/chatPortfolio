import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form.
    `;

    // For now, we'll use a simple approach with a public email service
    // You can replace this with your preferred email service
    const emailData = {
      to: 'wajahataliq1224@gmail.com',
      from: 'noreply@yourportfolio.com',
      subject: `Portfolio Contact: ${subject}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    };

    // For development/testing, we'll log the email content
    console.log('Email would be sent:', emailData);

    // In production, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // - Or use a service like EmailJS/Formspree

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully!',
        emailData: emailData // For debugging
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 