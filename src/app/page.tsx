import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Welcome to the League Manager</h1>
      <p className="mb-5">Manage your sports leagues with ease.</p>
      <Link href="/create-league" passHref>
        <Button>Create New League</Button>
      </Link>
      {/* Other content of your main page */}
    </div>
  )
}