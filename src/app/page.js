import { redirect } from 'next/navigation';

export default function RootPage() {
  // This page will never be rendered because middleware redirects to /en
  // But it's required for Next.js to work properly
  redirect('/en');
}
