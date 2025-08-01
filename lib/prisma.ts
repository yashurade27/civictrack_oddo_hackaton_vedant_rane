import { PrismaClient } from '@/lib/generated/prisma'

declare global {
  // Prevent multiple instances during hot reload in development
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
