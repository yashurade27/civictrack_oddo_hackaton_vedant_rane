// app/issue-detail/page.tsx
"use client";

import { useEffect, useState } from "react";
import { IssueDetail } from "@/components/IssueDetail/IssueDetail";
import type { Issue } from "./page";


// Define the expected structure of an issue
interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  // Add more fields if required
}

export default function IssueDetailPage() {
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedIssue");
    if (stored) {
      try {
        const parsed: Issue = JSON.parse(stored);
        setIssue(parsed);
      } catch (e) {
        console.error("Failed to parse issue from localStorage", e);
      }
    }
  }, []);

  if (!issue) {
    return <div className="p-4 text-gray-500">No issue selected.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <IssueDetail issue={issue} />
    </div>
  );
}
