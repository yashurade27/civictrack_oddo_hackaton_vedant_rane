"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface IssueCardProps {
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

export function IssueCard({
  imageUrl,
  title,
  description,
  category,
  status,
  date,
  location,
  distance,
}: IssueCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-xl overflow-hidden shadow-md">
      <div className="relative h-40 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <Badge>{category}</Badge>
          <span
            className={`text-xs px-2 py-1 rounded-full ${statusColorMap[status]}`}
          >
            {status}
          </span>
        </div>

        <h3 className="text-base font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="text-xs text-gray-500 flex items-center justify-between pt-2">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </span>
          <span>{distance} km</span>
        </div>

        <div className="text-right text-xs text-muted-foreground">{date}</div>
      </CardContent>
    </Card>
  );
}
