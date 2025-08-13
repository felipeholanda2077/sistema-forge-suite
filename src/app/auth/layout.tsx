import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autenticação | Sistema Arcane Forge',
  description: 'Páginas de autenticação',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
