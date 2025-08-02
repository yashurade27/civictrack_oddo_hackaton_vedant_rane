'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getReports() {
  const reports = await prisma.report.findMany({
    include: {
      photos: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reports.map((r) => ({
    id: r.id,
    imageUrl: r.photos[0]?.url || "/images/default.jpg",
    title: r.title,
    description: r.description,
    category: r.category,
    status: getStatusLabel(r.status),
    date: new Date(r.createdAt).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
    location: r.locality || r.address || "Unknown",
    distance: "–", // Optional: implement geo distance calc later
  }));
}

function getStatusLabel(status: string): "Reported" | "In Progress" | "Resolved" {
  switch (status) {
    case "REPORTED":
      return "Reported";
    case "IN_PROGRESS":
      return "In Progress";
    case "RESOLVED":
      return "Resolved";
    default:
      return "Reported"; // Fallback
  }
}
