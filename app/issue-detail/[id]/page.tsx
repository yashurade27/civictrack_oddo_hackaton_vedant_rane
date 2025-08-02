"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IssueDetail } from "@/components/IssueDetail/IssueDetail";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "Reported" | "In Progress" | "Resolved";
  createdAt: string;
  imageUrl: string;
  category: string;
  location: string;
  activity: string[];
}

export default function IssueDetailPage() {
  const { id } = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedIssue");
    if (stored) {
      try {
        const parsed: Issue = JSON.parse(stored);
        if (parsed.id === id) {
          setIssue(parsed);
        }
      } catch (e) {
        console.error("Failed to parse issue from localStorage", e);
      }
    }
  }, [id]);

  if (!issue) {
    return <div className="p-4 text-gray-500">No issue selected.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <IssueDetail {...issue} date={issue.createdAt} />
    </div>
  );
}
