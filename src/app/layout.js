import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export default function RootLayout({ children, params }) {
  // Get locale from params or default to 'en'
  const locale = params?.locale || 'en';
  
  return (
    <html lang={locale}>
      <head>
        {/* Prevent browser translation interference */}
        <meta name="google" content="notranslate" />
        <meta name="google-translate-customization" content="notranslate" />
        <meta httpEquiv="Content-Language" content={locale} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
