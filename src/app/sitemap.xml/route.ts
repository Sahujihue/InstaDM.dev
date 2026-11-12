import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://instadm.dev';
  const pages = [
    '',
    '/login',
    '/signup',
    '/privacy',
    '/terms',
    '/refund',
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>2026-11-12</lastmod>
      <changefreq>daily</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
