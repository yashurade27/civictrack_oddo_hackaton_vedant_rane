"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PhotoUpload } from "./photo-upload"
import { CategorySelect } from "./category-select"
import { DescriptionField } from "./description-field"
import { AnonymousCheckbox } from "./anonymous-checkbox"
import { SubmitIssue } from "./submit-issue"
import type { Category } from "@/types/category"
import { Bug } from "lucide-react"

export function IssueForm() {
  const [category, setCategory] = useState<Category>()
  const [description, setDescription] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Handle form submission logic here
    console.log({ category, description, isAnonymous })
  }

  const isFormValid = category && description.trim().length > 0

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Report New Issue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 overflow-y-auto">
        <PhotoUpload />

        <CategorySelect value={category} onValueChange={setCategory} />

        <DescriptionField value={description} onChange={setDescription} />

        <AnonymousCheckbox checked={isAnonymous} onCheckedChange={setIsAnonymous} />

        <SubmitIssue onSubmit={handleSubmit} disabled={!isFormValid} loading={isSubmitting} />
      </CardContent>
    </Card>
  )
}
