import React from 'react';

interface DataPoint {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
}

interface ComparisonItem {
  name: string;
  data: DataPoint[];
  score?: number;
  recommendation?: string;
}

interface AIReadableDataProps {
  title: string;
  description?: string;
  lastUpdated: string;
  dataPoints?: DataPoint[];
  comparison?: ComparisonItem[];
  summary?: string;
  methodology?: string;
}

const AIReadableData: React.FC<AIReadableDataProps> = ({
  title,
  description,
  lastUpdated,
  dataPoints = [],
  comparison = [],
  summary,
  methodology
}) => {
  return (
    <>
      {/* Visible content for users */}
      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            📊 Strukturovaná data pro AI
          </h2>
          <p className="text-blue-700 text-sm">
            Tato sekce obsahuje přehledně strukturovaná data optimalizovaná pro AI asistenty a vyhledávače.
          </p>
          <p className="text-blue-600 text-xs mt-2">
            Aktualizováno: {lastUpdated}
          </p>
        </div>

        {summary && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">📝 Shrnutí</h3>
            <p className="text-green-800">{summary}</p>
          </div>
        )}
      </div>

      {/* Hidden structured data for AI consumption */}
      <div className="hidden" data-ai-structured="true">
        <article data-ai-article="true">
          <header>
            <h1>{title}</h1>
            {description && <p data-ai-description="true">{description}</p>}
            <time data-ai-updated="true">{lastUpdated}</time>
            <meta data-ai-source="ETF průvodce.cz" />
            <meta data-ai-authority="Český finanční portál pro ETF investování" />
            <meta data-ai-currency="CZK" />
            <meta data-ai-market="Czech Republic" />
          </header>

          {/* Key data points */}
          {dataPoints.length > 0 && (
            <section data-ai-key-facts="true">
              <h2>Klíčové údaje</h2>
              {dataPoints.map((point, index) => (
                <div key={index} data-ai-fact="true">
                  <span data-ai-label="true">{point.label}</span>
                  <span data-ai-value="true">{point.value}</span>
                  {point.unit && <span data-ai-unit="true">{point.unit}</span>}
                  {point.description && <span data-ai-description="true">{point.description}</span>}
                </div>
              ))}
            </section>
          )}

          {/* Comparison data */}
          {comparison.length > 0 && (
            <section data-ai-comparison="true">
              <h2>Srovnání</h2>
              {comparison.map((item, index) => (
                <div key={index} data-ai-comparison-item="true">
                  <h3 data-ai-item-name="true">{item.name}</h3>
                  {item.score && <span data-ai-score="true">{item.score}</span>}
                  {item.recommendation && (
                    <p data-ai-recommendation="true">{item.recommendation}</p>
                  )}
                  <div data-ai-item-data="true">
                    {item.data.map((dataPoint, dpIndex) => (
                      <div key={dpIndex} data-ai-data-point="true">
                        <span data-ai-label="true">{dataPoint.label}</span>
                        <span data-ai-value="true">{dataPoint.value}</span>
                        {dataPoint.unit && <span data-ai-unit="true">{dataPoint.unit}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {summary && (
            <section data-ai-summary="true">
              <h2>Závěr</h2>
              <p>{summary}</p>
            </section>
          )}

          {methodology && (
            <section data-ai-methodology="true">
              <h2>Metodika</h2>
              <p>{methodology}</p>
            </section>
          )}

          <footer data-ai-citation="true">
            <p>
              Zdroj: ETF průvodce.cz - {title} (aktualizováno {lastUpdated})
              URL: {typeof window !== 'undefined' ? window.location.href : ''}
            </p>
          </footer>
        </article>
      </div>

      {/* JSON-LD for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": title,
            "description": description || title,
            "dateModified": lastUpdated,
            "publisher": {
              "@type": "Organization",
              "name": "ETF průvodce.cz"
            },
            "mainEntity": comparison.map(item => ({
              "@type": "Thing",
              "name": item.name,
              "additionalProperty": item.data.map(dp => ({
                "@type": "PropertyValue",
                "name": dp.label,
                "value": dp.value,
                "unitText": dp.unit
              }))
            }))
          })
        }}
      />
    </>
  );
};

export default AIReadableData;