#!/usr/bin/env node

/**
 * Generate sitemap.xml with ETF data from Supabase
 * Runs during build process to create static sitemap
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Supabase config
const SUPABASE_URL = 'https://nbhwnatadyubiuadfakx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaHduYXRhZHl1Yml1YWRmYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDQ3NDQsImV4cCI6MjA2NDQyMDc0NH0.yQgSv0JMi6ebwIu7fQHIXE4VblkQ3pJfy-lXvFgd_CY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const baseUrl = 'https://etfpruvodce.cz';

const staticPages = [
  {
    url: baseUrl,
    changefreq: 'daily',
    priority: 1.0
  },
  {
    url: `${baseUrl}/srovnani-etf`,
    changefreq: 'daily',
    priority: 0.9
  },
  {
    url: `${baseUrl}/co-jsou-etf`,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/kde-koupit-etf`,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/srovnani-brokeru`,
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/nastroje`,
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/kalkulacky`,
    changefreq: 'weekly',
    priority: 0.8
  },
  // Calculator pages
  {
    url: `${baseUrl}/kalkulacky/hypotecni-kalkulacka`,
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    url: `${baseUrl}/kalkulacky/cisty-plat-2025`,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/kalkulacky/uverova-kalkulacka`,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/kalkulacky/investicni-kalkulacka`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/kalkulacky/fire-kalkulacka`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/kalkulacky/nouzova-rezerva`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/kalkulacky/kurzovy-dopad-etf`,
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: `${baseUrl}/kalkulacky/monte-carlo-simulator`,
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: `${baseUrl}/kalkulacky/kalkulacka-poplatku-etf`,
    changefreq: 'monthly',
    priority: 0.6
  },
  // Broker reviews
  {
    url: `${baseUrl}/degiro-recenze`,
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: `${baseUrl}/xtb-recenze`,
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: `${baseUrl}/interactive-brokers-recenze`,
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: `${baseUrl}/fio-ebroker-recenze`,
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: `${baseUrl}/trading212-recenze`,
    changefreq: 'monthly',
    priority: 0.6
  },
  // Blog posts
  {
    url: `${baseUrl}/tipy/nejlepsi-etf-2025`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/tipy/nejlepsi-etf-na-americke-akcie`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/tipy/nejlepsi-etf-na-nasdaq`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/tipy/nejlepsi-dividendove-etf`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/tipy/nejlepsi-etf-na-evropske-akcie`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: `${baseUrl}/tipy/all-weather-portfolio`,
    changefreq: 'monthly',
    priority: 0.6
  }
];

async function fetchETFUrls() {
  console.log('🔍 Fetching ETF data from Supabase...');
  
  try {
    // Fetch all ETFs with pagination
    let allETFs = [];
    let from = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
      console.log(`📄 Fetching page starting from ${from}...`);
      
      const { data: etfs, error } = await supabase
        .from('etf_funds')
        .select('isin, updated_at')
        .order('updated_at', { ascending: false })
        .range(from, from + pageSize - 1);

      if (error) {
        console.error('❌ Error fetching ETFs:', error);
        break;
      }

      if (!etfs || etfs.length === 0) {
        hasMore = false;
      } else {
        allETFs.push(...etfs);
        from += pageSize;
        
        // If we got less than pageSize, we're done
        if (etfs.length < pageSize) {
          hasMore = false;
        }
      }
    }

    console.log(`✅ Found ${allETFs.length} ETF funds total`);

    return allETFs.map(etf => ({
      url: `${baseUrl}/etf/${etf.isin}`,
      lastmod: etf.updated_at ? new Date(etf.updated_at).toISOString().split('T')[0] : undefined,
      changefreq: 'weekly',
      priority: 0.6
    }));

  } catch (error) {
    console.error('❌ Error generating ETF URLs:', error);
    return [];
  }
}

function generateSitemapXML(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.url}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

async function main() {
  console.log('🚀 Starting sitemap generation...');

  // Fetch dynamic ETF URLs
  const etfUrls = await fetchETFUrls();
  
  // Combine static and dynamic URLs
  const allUrls = [...staticPages, ...etfUrls];
  
  console.log(`📝 Generating sitemap with ${allUrls.length} URLs...`);
  
  // Generate XML
  const xml = generateSitemapXML(allUrls);
  
  // Write to public directory
  const sitemapPath = join(__dirname, '../public/sitemap.xml');
  writeFileSync(sitemapPath, xml);
  
  console.log(`✅ Sitemap generated successfully: ${sitemapPath}`);
  console.log(`📊 Total URLs: ${allUrls.length} (${staticPages.length} static + ${etfUrls.length} ETF)`);
}

main().catch(console.error);