// app/participate/layout.tsx
import Link from "next/link";

export default function ParticipateLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <nav className="mb-6 flex justify-between text-sm text-gray-600">
          <Link href="/participate/policies">Policies</Link>
          <Link href="/participate/medical">Medical</Link>
          <Link href="/participate/waiver">Waiver</Link>
          <Link href="/participate/register">Register</Link>
        </nav>
        {children}
      </div>
    </main>
  );
}
