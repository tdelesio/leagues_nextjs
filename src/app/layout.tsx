import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-100 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              League Manager
            </Link>
            <div className="space-x-4">
              <Link href="/create-league" passHref>
                <Button variant="outline">Create New League</Button>
              </Link>
              <Link href="/admin" passHref>
                <Button>Admin</Button>
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}