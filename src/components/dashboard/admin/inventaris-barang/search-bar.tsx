import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

export default function SearchBar() {
  return (
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search inventory..."
        className="pl-10"
      />
    </div>
  )
}
