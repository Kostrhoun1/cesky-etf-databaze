import { useEffect } from 'react';
import { sitemapGenerator } from '@/utils/sitemapGenerator';

const SitemapXML = () => {
  useEffect(() => {
    const generateAndDownload = async () => {
      try {
        const xml = await sitemapGenerator.generateSitemap();
        
        // Set the response headers for XML
        document.title = 'Sitemap';
        
        // Replace the entire page content with XML
        document.documentElement.innerHTML = `
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Sitemap</title>
            </head>
            <body>
              <pre style="font-family: monospace; white-space: pre-wrap; margin: 0; padding: 20px;">${xml.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </body>
          </html>
        `;
      } catch (error) {
        console.error('Error generating sitemap:', error);
        document.body.innerHTML = '<h1>Error generating sitemap</h1>';
      }
    };

    generateAndDownload();
  }, []);

  return <div>Generating sitemap...</div>;
};

export default SitemapXML;