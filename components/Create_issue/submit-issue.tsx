"use client"

import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface SubmitIssueProps {
  onSubmit?: () => void
  disabled?: boolean
  loading?: boolean
}

export function SubmitIssue({ onSubmit, disabled, loading }: SubmitIssueProps) {
  return (
    <Button onClick={onSubmit} disabled={disabled || loading} className="w-full" size="lg">
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          Submitting...
        </>
      ) : (
        <>
          <Send className="w-4 h-4 mr-2" />
          Submit Issue
        </>
      )}
    </Button>
  )
}
