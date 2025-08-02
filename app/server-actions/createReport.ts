'use server';

import { prisma } from '@/lib/prisma';

export async function createReport({
  title,
  description,
  category,
  latitude,
  longitude,
  userId,
  photoUrls = [],
}: {
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  userId?: string;
  photoUrls?: string[];
}) {
  try {
    // Reverse geocode using OpenStreetMap
    const nominatimRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          'User-Agent': 'civic-track-app/1.0 (your@email.com)',
        },
      }
    );

    const data = await nominatimRes.json();

    const address = data.display_name || null;
    const placeId = data.place_id?.toString() || null;
    const locality =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.suburb ||
      null;
    const postalCode = data.address?.postcode || null;

    // Create report with attached photos
    const report = await prisma.report.create({
      data: {
        title,
        description,
        category: category as any,
        latitude,
        longitude,
        address,
        placeId,
        locality,
        postalCode,
        user: userId ? { connect: { id: userId } } : undefined,
        photos: {
          create: photoUrls.map((url) => ({ url })),
        },
      },
      include: {
        photos: true,
      },
    });

    console.log('✅ Report created:', report);
    return report;
  } catch (err) {
    console.error('[CREATE_REPORT_ERROR]', err);
    throw new Error('Failed to create report');
  }
}
