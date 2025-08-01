'use server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function createMessage(formData: FormData) {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error('Not authenticated');

  // Try to get the email from sessionClaims or set as undefined if not available
  const email =
    (sessionClaims?.email as string) ||
    (sessionClaims?.primaryEmailAddress as string) ||
    undefined;

  await prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email,
      role: (sessionClaims?.metadata?.role as 'admin' | 'user') ?? 'user',
    },
    create: {
      clerkId: userId,
      email,
      role: (sessionClaims?.metadata?.role as 'admin' | 'user') ?? 'user',
    },
  });

  const content = formData.get('content') as string;
  return prisma.message.create({
    data: {
      userClerkId: userId,
      content,
    },
  });
}
