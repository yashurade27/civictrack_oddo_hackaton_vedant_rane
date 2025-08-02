"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface IssueCardProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  status: "Reported" | "In Progress" | "Resolved";
  date: string;
  location: string;
  distance: string;
}

const statusColorMap: Record<IssueCardProps["status"], string> = {
  Reported: "bg-red-500 text-white",
  "In Progress": "bg-yellow-400 text-black",
  Resolved: "bg-green-500 text-white",
};

export function IssueCard(issue: IssueCardProps) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem("selectedIssue", JSON.stringify(issue));
    router.push(`/issue-detail/${issue.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="w-full max-w-sm rounded-xl overflow-hidden shadow-md cursor-pointer"
    >
      <div className="relative h-40 w-full">
        <Image
          src={issue.imageUrl}
          alt={issue.title}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <Badge>{issue.category}</Badge>
          <span
            className={`text-xs px-2 py-1 rounded-full ${statusColorMap[issue.status]}`}
          >
            {issue.status}
          </span>
        </div>

        <h3 className="text-base font-semibold line-clamp-1">{issue.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {issue.description}
        </p>

        <div className="text-xs text-gray-500 flex items-center justify-between pt-2">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {issue.location || "Unknown Location"}
          </span>
          <span>{issue.distance}</span>
        </div>

        <div className="text-right text-xs text-muted-foreground">{issue.date}</div>
      </CardContent>
    </Card>
  );
}
