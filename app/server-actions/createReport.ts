'use server';

import prisma from '@/lib/prisma';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

export async function createReport({
  title,
  description,
  category,
  latitude,
  longitude,
  userId
}: {
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  userId?: string;
}) {
  try {
    const geoRes = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${latitude},${longitude}`,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    const result = geoRes.data.results?.[0];
    const address = result?.formatted_address ?? null;
    const placeId = result?.place_id ?? null;

    const get = (type: string) =>
      result?.address_components?.find((c: any) => c.types.includes(type))?.long_name;

    const locality = get('locality');
    const postalCode = get('postal_code');

    const report = await prisma.report.create({
      data: {
        title,
        description,
        category,
        latitude,
        longitude,
        address,
        placeId,
        locality,
        postalCode,
        user: userId ? { connect: { id: userId } } : undefined,
      },
    });

    return report;
  } catch (err) {
    console.error('[CREATE_REPORT_ERROR]', err);
    throw new Error('Failed to create report');
  }
}
