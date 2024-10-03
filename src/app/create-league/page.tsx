'use client'

import { useState } from 'react'
import { createLeague } from '../actions/create-league'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from '@/hooks/use-toast'

export default function CreateLeaguePage() {
  const [isPending, setIsPending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; id?: string; error?: string } | null>(null)

  async function onSubmit(formData: FormData) {
    setIsPending(true)
    const result = await createLeague(formData)
    setResult(result)
    setIsPending(false)

    if (result.success) {
      toast({
        title: "League Created",
        description: `League successfully created with ID: ${result.id}`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New League</h1>
      <form action={onSubmit} className="space-y-8">
        <div>
          <Label htmlFor="leagueName">League Name</Label>
          <Input id="leagueName" name="leagueName" placeholder="Enter league name" required />
        </div>
        <div>
          <Label htmlFor="paidFor">Paid For</Label>
          <Input id="paidFor" name="paidFor" type="number" required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="money" name="money" />
          <Label htmlFor="money">Money League</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="free" name="free" />
          <Label htmlFor="free">Free League</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="active" name="active" />
          <Label htmlFor="active">Active</Label>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="speads" name="speads" />
          <Label htmlFor="speads">Spreads Enabled</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="doubleEnabled" name="doubleEnabled" />
          <Label htmlFor="doubleEnabled">Double Enabled</Label>
        </div>
        <div>
          <Label htmlFor="entryFee">Entry Fee</Label>
          <Input id="entryFee" name="entryFee" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="weeklyFee">Weekly Fee</Label>
          <Input id="weeklyFee" name="weeklyFee" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="firstPlacePercent">First Place Percent</Label>
          <Input id="firstPlacePercent" name="firstPlacePercent" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="secondPlacePercent">Second Place Percent</Label>
          <Input id="secondPlacePercent" name="secondPlacePercent" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="thirdPlacePercent">Third Place Percent</Label>
          <Input id="thirdPlacePercent" name="thirdPlacePercent" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="fourthPlacePercent">Fourth Place Percent</Label>
          <Input id="fourthPlacePercent" name="fourthPlacePercent" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="fifthPlacePercent">Fifth Place Percent</Label>
          <Input id="fifthPlacePercent" name="fifthPlacePercent" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="doubleType">Double Type</Label>
          <Input id="doubleType" name="doubleType" type="number" required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="banker" name="banker" />
          <Label htmlFor="banker">Banker</Label>
        </div>
        <div>
          <Label htmlFor="season">Season</Label>
          <Input id="season" name="season" required />
        </div>
        <div>
          <Label htmlFor="adminId">Admin ID</Label>
          <Input id="adminId" name="adminId" required />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create League'}
        </Button>
      </form>
      {result && (
        <div className={`mt-4 p-4 ${result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded`}>
          {result.success ? `League created successfully! ID: ${result.id}` : `Error: ${result.error}`}
        </div>
      )}
    </div>
  )
}