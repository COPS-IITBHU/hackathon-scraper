'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function Filters() {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])

  const handleMonthToggle = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    )
  }

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filter by Month</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Months</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {months.map((month) => (
            <DropdownMenuCheckboxItem
              key={month}
              checked={selectedMonths.includes(month)}
              onCheckedChange={() => handleMonthToggle(month)}
            >
              {month}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Add more filters here as needed */}
    </div>
  )
}

