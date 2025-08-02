// components/Home_Screen/IssueList.tsx
"use client";

import { IssueCard } from "@/components/Home_Screen/IssueCard";

const issues = [
  {
    imageUrl: "/images/streetlight.jpg",
    title: "Streetlight not working",
    description: "Street light not working since last 2 days",
    category: "Lighting",
    status: "In Progress" as const,
    date: "Aug 14",
    location: "Gota Bridge, Ahmedabad",
    distance: "2.8",
  },
  {
    imageUrl: "/images/road_damage.jpg",
    title: "Road Potholes",
    description: "Large potholes on main road causing issues",
    category: "Roads",
    status: "Reported" as const,
    date: "Aug 12",
    location: "Science City Road, Ahmedabad",
    distance: "1.4",
  },
  {
    imageUrl: "/images/garbage.jpg",
    title: "Garbage Overflow",
    description: "Garbage collection not done in this area",
    category: "Sanitation",
    status: "Resolved" as const,
    date: "Aug 10",
    location: "Vastrapur Lake, Ahmedabad",
    distance: "3.2",
  },
];

export default function IssueList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {issues.map((issue, index) => (
        <IssueCard key={index} {...issue} />
      ))}
    </div>
  );
}
