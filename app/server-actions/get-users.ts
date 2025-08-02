'use server'

import prisma from '@/lib/prisma'

export async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { reports: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isBanned: user.isBanned,
    reports: Number(user._count.reports), // ✅ plain number
    createdAt: new Date(user.createdAt).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    }), // ✅ plain string
  }));
}
