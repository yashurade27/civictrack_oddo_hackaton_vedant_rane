"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface AnonymousCheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function AnonymousCheckbox({ checked, onCheckedChange }: AnonymousCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="anonymous" checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor="anonymous" className="text-sm font-medium cursor-pointer">
        Report Anonymous
      </Label>
    </div>
  )
}
