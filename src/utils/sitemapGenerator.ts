import { supabase } from '@/integrations/supabase/client';

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  private baseUrl = 'https://etfpruvodce.cz';
  
  private staticPages: SitemapUrl[] = [
    {
      url: this.baseUrl,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      url: `${this.baseUrl}/srovnani-etf`,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      url: `${this.baseUrl}/co-jsou-etf`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${this.baseUrl}/kde-koupit-etf`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${this.baseUrl}/srovnani-brokeru`,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${this.baseUrl}/nastroje`,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/kalkulacky`,
      changefreq: 'weekly',
      priority: 0.8
    },
    // Calculator pages - high priority for SEO
    {
      url: `${this.baseUrl}/kalkulacky/hypotecni-kalkulacka`,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${this.baseUrl}/kalkulacky/cisty-plat-2025`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${this.baseUrl}/kalkulacky/uverova-kalkulacka`,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${this.baseUrl}/kalkulacky/investicni-kalkulacka`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/kalkulacky/fire-kalkulacka`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/kalkulacky/nouzova-rezerva`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/kalkulacky/kurzovy-dopad-etf`,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${this.baseUrl}/kalkulacky/monte-carlo-simulator`,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${this.baseUrl}/kalkulacky/kalkulacka-poplatku-etf`,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${this.baseUrl}/navod-pro-zacatecniky`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/tipy`,
      changefreq: 'weekly',
      priority: 0.6
    },
    // Broker reviews
    {
      url: `${this.baseUrl}/degiro-recenze`,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${this.baseUrl}/xtb-recenze`,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${this.baseUrl}/interactive-brokers-recenze`,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${this.baseUrl}/fio-ebroker-recenze`,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${this.baseUrl}/trading212-recenze`,
      changefreq: 'monthly',
      priority: 0.6
    },
    // Blog posts
    {
      url: `${this.baseUrl}/tipy/nejlepsi-etf-2025`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/tipy/nejlepsi-etf-na-americke-akcie`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/tipy/nejlepsi-etf-na-nasdaq`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/tipy/nejlepsi-dividendove-etf`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/tipy/nejlepsi-etf-na-evropske-akcie`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${this.baseUrl}/tipy/all-weather-portfolio`,
      changefreq: 'monthly',
      priority: 0.6
    }
  ];

  async getETFUrls(): Promise<SitemapUrl[]> {
    try {
      console.log('Fetching ETFs for sitemap...');
      const { data: etfs, error } = await supabase
        .from('etf_funds')
        .select('isin, updated_at, name')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching ETFs for sitemap:', error);
        return [];
      }

      console.log(`Found ${etfs?.length || 0} ETFs for sitemap`);
      
      return etfs?.map(etf => ({
        url: `${this.baseUrl}/etf/${etf.isin}`,
        lastmod: etf.updated_at ? new Date(etf.updated_at).toISOString().split('T')[0] : undefined,
        changefreq: 'weekly' as const,
        priority: 0.6
      })) || [];
    } catch (error) {
      console.error('Error generating ETF URLs for sitemap:', error);
      return [];
    }
  }

  async generateSitemap(): Promise<string> {
    const etfUrls = await this.getETFUrls();
    const allUrls = [...this.staticPages, ...etfUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

    return xml;
  }

  async generateRobotsTxt(): Promise<string> {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# Disallow admin pages
Disallow: /admin/
Disallow: /database-management-secure-2024/

# Disallow newsletter unsubscribe (but allow crawling)
Allow: /newsletter/unsubscribe

# Allow all other pages
Allow: /`;
  }
}

export const sitemapGenerator = new SitemapGenerator();