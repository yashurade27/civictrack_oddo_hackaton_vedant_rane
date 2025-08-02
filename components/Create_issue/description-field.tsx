"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface DescriptionFieldProps {
  value?: string
  onChange?: (value: string) => void
}

export function DescriptionField({ value, onChange }: DescriptionFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Description</Label>
      <Textarea
        placeholder="Describe the issue in detail..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="min-h-[100px] resize-none"
        rows={4}
      />
    </div>
  )
}
