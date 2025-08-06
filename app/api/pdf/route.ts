// app/api/pdf/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/static/resume.pdf');
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="SameerChauhan-SDE-Resume.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
