"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { UploadSection } from "./UploadSection";
import { ActivityTimeline } from "./ActivityTimeline";
import { useEffect, useState } from "react";

const statusColorMap = {
  Reported: "bg-red-500 text-white",
  "In Progress": "bg-yellow-400 text-black",
  Resolved: "bg-green-500 text-white",
};

interface IssueDetailProps {
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  status: "Reported" | "In Progress" | "Resolved";
  date: string;
  location: string;
  activity: string[];
}

export function IssueDetail({
  imageUrl,
  title,
  description,
  category,
  status,
  date,
  location,
  activity,
}: IssueDetailProps) {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    setCurrentDateTime(formatted);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className={`text-sm px-3 py-1 rounded-full ${statusColorMap[status]}`}>
          {status}
        </span>
      </div>

      <div className="w-full h-64 relative rounded-lg overflow-hidden border border-gray-300">
        <Image src={imageUrl} alt="Issue Image" fill className="object-cover" />
      </div>

      <UploadSection />

      <div className="space-y-2">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {location}
        </div>
        <p className="text-base">{description}</p>
        <div className="text-xs text-muted-foreground">Reported on: {date}</div>
        <div className="text-xs text-muted-foreground">Viewed at: {currentDateTime}</div>
      </div>

      <ActivityTimeline activity={activity || []} />

      <div className="flex justify-end gap-2 mt-6">
        <button className="text-sm px-4 py-2 bg-gray-200 rounded-md">Edit</button>
        <button className="text-sm px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
      </div>
    </div>
  );
}
