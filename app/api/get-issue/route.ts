// app/api/get-issue/route.ts (for Next.js 13+ using app router)
import { getIssueById } from '@/app/server-actions/getissuesById';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const issue = await getIssueById(id);

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  return NextResponse.json(issue);
}
