'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createSeason, getSeasons } from './actions'
import { Season } from '@/domains/league'

// const LeagueTypes = Object.freeze({
//   pickem: 1,
//   suicide: 2,
// });

// interface Season {
//   id: string;
//   superBowlNumber: number;
//   leagueType: number;
// }

export default function CreateSeasonPage() {
  const [isPending, setIsPending] = useState(false)
  const [leagueType, setLeagueType] = useState<string>('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [seasons, setSeasons] = useState<Season[]>([])

  useEffect(() => {
    fetchSeasons()
  }, [])

  async function fetchSeasons() {
    const fetchedSeasons = await getSeasons()
    setSeasons(fetchedSeasons)
  } 

  async function onSubmit(formData: FormData) {
    setIsPending(true)
    setFeedback(null)
    formData.append('leagueType', leagueType)
    const result = await createSeason(formData)
    setIsPending(false)

    if (result.success) {
      setFeedback({
        type: 'success',
        message: `Season successfully created with Super Bowl Number: ${formData.get('superBowlNumber')}`
      })
      fetchSeasons() // Refresh the seasons list
    } else {
      setFeedback({
        type: 'error',
        message: result.error || 'An error occurred while creating the season.'
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Season</h1>
      <form action={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="superBowlNumber">Super Bowl Number</Label>
          <Input id="superBowlNumber" name="superBowlNumber" type="number" required />
        </div>
        <div>
          <Label htmlFor="leagueType">League Type</Label>
          <Select onValueChange={setLeagueType} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a league type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Pick'em</SelectItem>
              <SelectItem value="2">Suicide</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Season'}
        </Button>
      </form>
      {feedback && (
        <div className={`mt-4 p-4 rounded ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {feedback.message}
        </div>
      )}

      <h2 className="text-xl font-bold mt-10 mb-5">Existing Seasons</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Super Bowl Number</TableHead>
            <TableHead>League Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seasons.map((season) => (
            <TableRow key={season.superBowlNumber}>
              <TableCell>{season.superBowlNumber}</TableCell>
              <TableCell>{season.leagueType === 1 ? 'Pick\'em' : 'Suicide'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}