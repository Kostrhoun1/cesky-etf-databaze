import { useEffect } from 'react';
import { sitemapGenerator } from '@/utils/sitemapGenerator';

const SitemapXML = () => {
  useEffect(() => {
    const generateAndServe = async () => {
      try {
        const xml = await sitemapGenerator.generateSitemap();
        
        // Clear the DOM and serve raw XML
        document.open();
        document.write(xml);
        document.close();
        
        // Try to set content type (may not work in client-side, but worth trying)
        const response = new Response(xml, {
          headers: {
            'Content-Type': 'application/xml',
          },
        });
        
      } catch (error) {
        console.error('Error generating sitemap:', error);
        document.body.innerHTML = '<h1>Error generating sitemap</h1>';
      }
    };

    generateAndServe();
  }, []);

  return <div>Generating sitemap...</div>;
};

export default SitemapXML;