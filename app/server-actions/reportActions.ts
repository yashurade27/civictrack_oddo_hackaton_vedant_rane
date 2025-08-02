'use server'

import { prisma } from '@/lib/prisma'

// Get all reports with user data
export async function getAllReports() {
  const reports = await prisma.report.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return reports
}

// Update the status of a report
import type { Status } from '@prisma/client'

export async function updateReportStatus(reportId: string, newStatus: string) {
  const updated = await prisma.report.update({
    where: { id: reportId },
    data: { status: newStatus as Status },
  })
  return updated
}
