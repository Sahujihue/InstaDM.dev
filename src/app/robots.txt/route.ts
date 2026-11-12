import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /admin/
Disallow: /api/

Sitemap: https://instadm.dev/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
