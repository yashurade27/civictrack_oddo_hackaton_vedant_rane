"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IssueDetail } from "@/components/IssueDetail/IssueDetail";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "REPORTED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: string;
  category: string;
  latitude: number;
  longitude: number;
  address?: string;
  photos: { id: string; url: string }[];
  comments: {
    id: string;
    content: string;
    user: {
      id: string;
      name: string | null;
    };
    createdAt: string;
  }[];
  logs: {
    id: string;
    status: "REPORTED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    timestamp: string;
  }[];
}

export default function IssueDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchIssue = async () => {
      try {
        const res = await fetch(`/api/get-issue?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch issue");

        const data = await res.json();
        setIssue(data);
      } catch (error) {
        console.error("❌ Error fetching issue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  if (loading) return <div className="p-4 text-gray-500">Loading issue...</div>;
  if (!issue) return <div className="p-4 text-gray-500">Issue not found.</div>;

  // Map API status to IssueDetailProps status
  const mapStatus = (
    status: Issue["status"]
  ): "Reported" | "In Progress" | "Resolved" => {
    switch (status) {
      case "REPORTED":
        return "Reported";
      case "IN_PROGRESS":
        return "In Progress";
      case "RESOLVED":
        return "Resolved";
      default:
        return "Reported"; // fallback
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <IssueDetail
        imageUrl={issue.photos[0]?.url || ""}
        location={issue.address || ""}
        activity={
          issue.logs
            ? issue.logs.map(
                (log) =>
                  `${mapStatus(log.status)} at ${new Date(log.timestamp).toLocaleString()}`
              )
            : []
        }
        {...issue}
        status={mapStatus(issue.status)}
      />
    </div>
  );
}
