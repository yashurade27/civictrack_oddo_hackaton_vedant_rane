'use server';

import prisma from '@/lib/prisma';

export async function getReportLocationWithStatus(reportId: string) {
  if (!reportId) throw new Error('Report ID required');

  const report = await prisma.report.findUnique({
    where: { id: reportId },
    select: {
      title: true,
      latitude: true,
      longitude: true,
      status: true,
    },
  });

  if (!report) throw new Error('Report not found');

  return report;
}
