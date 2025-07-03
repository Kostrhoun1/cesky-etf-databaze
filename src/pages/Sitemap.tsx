import React from 'react';

const SitemapPage: React.FC = () => {
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Homepage -->
  <url>
    <loc>https://etfpruvodce.cz/</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Main pages -->
  <url>
    <loc>https://etfpruvodce.cz/srovnani-etf</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/co-jsou-etf</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/kde-koupit-etf</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/degiro-recenze</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/nastroje</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/navod-pro-zacatecniky</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog section -->
  <url>
    <loc>https://etfpruvodce.cz/tipy</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog articles -->
  <url>
    <loc>https://etfpruvodce.cz/tipy/nejlepsi-etf-2025</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/tipy/nejlepsi-etf-na-americke-akcie</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/tipy/nejlepsi-etf-na-nasdaq</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/tipy/nejlepsi-dividendove-etf</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/tipy/nejlepsi-etf-na-evropske-akcie</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://etfpruvodce.cz/tipy/all-weather-portfolio</loc>
    <lastmod>2025-07-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  React.useEffect(() => {
    // Set correct content type for sitemap
    document.title = 'Sitemap';
    
    // Return XML content
    const blob = new Blob([sitemapXML], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    
    // Trigger download or display
    const pre = document.querySelector('#sitemap-content');
    if (pre) {
      pre.textContent = sitemapXML;
    }
  }, [sitemapXML]);

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', padding: '20px' }}>
      <pre id="sitemap-content">{sitemapXML}</pre>
    </div>
  );
};

export default SitemapPage;