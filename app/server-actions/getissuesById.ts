'use server';

import prisma from '@/lib/prisma';

export async function getIssueById(id: string) {
  if (!id) return null;

  try {
    const issue = await prisma.report.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        photos: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        logs: {
          orderBy: {
            timestamp: 'asc',
          },
        },
        spamFlags: true,
      },
    });

    // ✅ Ensure address is returned even if null
    if (issue) {
      return {
        ...issue,
        address: issue.address || 'Unknown', // optional, fallback if needed
      };
    }

    return null;
  } catch (error) {
    console.error('❌ Failed to fetch report by ID:', error);
    return null;
  }
}
