"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Category, categoryLabels } from "@/types/category"

interface CategorySelectProps {
  value?: Category
  onValueChange?: (value: Category) => void
}

export function CategorySelect({ value, onValueChange }: CategorySelectProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Category</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
