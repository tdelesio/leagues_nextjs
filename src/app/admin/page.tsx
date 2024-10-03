import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
      <nav className="space-y-4">
        <Link href="/admin/create-season" passHref>
          <Button className="w-full sm:w-auto">Create New Season</Button>
        </Link>
        {/* Add more admin links here as needed */}
      </nav>
    </div>
  )
}