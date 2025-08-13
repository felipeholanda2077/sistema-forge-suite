import { redirect } from 'next/navigation';

export default function LogoutPage() {
  // In a real app, you would invalidate the session/token here
  // For now, we'll just redirect to the login page
  redirect('/login');
}
