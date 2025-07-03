
import React from "react";
import { Link } from "react-router-dom";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Doporučené americké akciové ETF s odkazy na detail
const RECOMMENDED_US_ETFS = [
  {
    name: "iShares Core S&P 500 UCITS ETF",
    isin: "IE00B5BMR087",
    reason: "Nejoblíbenější ETF na S&P 500 s nízkými poplatky (TER ~0,07 %), ideální základ americké složky portfolia. Výborná likvidita a tradice.",
    type: "S&P 500",
  },
  {
    name: "Vanguard S&P 500 UCITS ETF",
    isin: "IE00B3XXRP09",
    reason: "Alternativní volba na index S&P 500, velmi levný a dostupný u všech významných brokerů.",
    type: "S&P 500",
  },
  {
    name: "SPDR S&P 500 UCITS ETF",
    isin: "IE00B6YX5C33",
    reason: "Patří mezi silné a dlouhodobě stabilní fondy zaměřené na americké blue-chip společnosti v indexu S&P500.",
    type: "S&P 500",
  },
  {
    name: "iShares NASDAQ 100 UCITS ETF",
    isin: "IE00B53SZB19",
    reason: "Oblíbený ETF na Nasdaq 100, vhodný pro investory do moderních technologických společností USA.",
    type: "NASDAQ 100",
  },
  {
    name: "Invesco EQQQ NASDAQ-100 UCITS ETF",
    isin: "IE0032077012",
    reason: "Alternativa na Nasdaq 100, dlouhá historie, skvělá likvidita, investice do 100 největších technologických firem.",
    type: "NASDAQ 100",
  },
  {
    name: "SPDR S&P U.S. Dividend Aristocrats UCITS ETF",
    isin: "IE00B6YX5D40",
    reason: "Zaměřeno na americké firmy s dlouhodobým růstem dividendy. Skvělá volba pro dlouhodobý pasivní příjem.",
    type: "Dividendové",
  },
  {
    name: "iShares MSCI USA UCITS ETF",
    isin: "IE00B3VVMM84",
    reason: "Sleduje širší index amerického trhu zahrnující i střední společnosti, vhodné na rozšíření diverzifikace.",
    type: "Celý trh USA",
  },
  {
    name: "Xtrackers MSCI USA Information Technology UCITS ETF",
    isin: "IE00BM67HN09",
    reason: "ETF čistě na americký technologický sektor – vysoký růstový potenciál.",
    type: "Technologie",
  },
  {
    name: "Vanguard FTSE North America UCITS ETF",
    isin: "IE00B945VV12",
    reason: "Široké zastoupení firem z USA i Kanady. Ideální pokud chcete rozšířit expozici na severoamerický trh.",
    type: "USA & Kanada",
  },
  {
    name: "SPDR Dow Jones Industrial Average UCITS ETF",
    isin: "IE00BJ38QD84",
    reason: "ETF sledující prestižní Dow Jones index (30 největších amerických firem).",
    type: "Blue Chips",
  }
];

// Filtr pro americké ETF
const US_ETF_TABLE_FILTER = {
  top: 12,
  sortBy: "return_5y" as const,
  sortOrder: "desc" as const,
  regionKeywords: ["north america", "united states", "usa"],
  indexNameKeywords: ["s&p 500", "s&p500", "nasdaq", "dow jones", "russell", "msci usa"],
};

const NejlepsiETFNaAmerickeAkcie: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší ETF na americké akcie"
    perex="Objevte nejvýhodnější americké akciové ETF fondy podle výnosu, velikosti a nízkých poplatků. Doporučení a tipy pro investory v roce 2025."
    seoDescription="Nejlepší americké ETF: přehled výnosných a bezpečných ETF zaměřených na akciový trh USA. Srovnání poplatků, výnosnosti i diverzifikace."
  >
    <h2 className="text-xl font-semibold mb-3">Proč investovat do amerických akcií přes ETF?</h2>
    <p>
      USA jsou největší akciový trh světa a dlouhodobě patří k tahounům globálních výnosů. Americké ETF fondy nabízí investorům příležitost podílet se na růstu nejsilnějších světových firem, jako jsou Apple, Microsoft, Amazon, Google, Tesla a další. Investování přes ETF zajišťuje:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>Širokou diverzifikaci napříč celým americkým trhem</li>
      <li>Nízké náklady (TER často pod 0,1 % ročně)</li>
      <li>Transparentnost a vysokou likviditu</li>
      <li>Snadnou dostupnost u většiny českých brokerů</li>
      <li>Dlouhodobě historicky nadprůměrné výnosy</li>
    </ul>

    <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 mb-5 rounded">
      <b>Tip:</b> Pro opravdu pasivní investování stačí zvolit ETF na index <span className="font-semibold">S&amp;P 500</span>, který sdružuje 500 největších amerických společností napříč odvětvími.
    </div>

    <h2 className="text-xl font-semibold mt-8 mb-4">Doporučené ETF na americké akcie</h2>
    <p className="mb-3">
      Vybrali jsme nejkvalitnější americké akciové ETF, které jsou běžně dostupné pro české investory a mají ověřenou historii, nízké náklady a silnou správu. Kliknutím na název se dostanete na detail daného fondu, kde najdete podrobné informace včetně výkonnosti, složení portfolia a poplatků.
    </p>
    <ul className="space-y-3 mb-8">
      {RECOMMENDED_US_ETFS.map((etf) => (
        <li key={etf.isin} className="bg-gray-50 rounded p-4 border hover:shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-semibold">{etf.type && `[${etf.type}] `}</span>
              <Link
                to={`/etf/${etf.isin}`}
                className="text-violet-700 font-medium underline underline-offset-2 hover:text-violet-900"
              >
                {etf.name}
              </Link>
              <span className="text-xs ml-3 align-baseline text-gray-500">{etf.isin}</span>
            </div>
            <div className="text-gray-700 mt-2 md:mt-0 text-sm">{etf.reason}</div>
          </div>
        </li>
      ))}
    </ul>

    <h3 className="text-lg font-semibold mb-2">Výběrová kritéria nejlepších ETF na USA akcie</h3>
    <ul className="mb-6 list-disc ml-6">
      <li>
        <b>Nízké poplatky (TER):</b> Preferujeme ETF s ročním nákladem pod 0,15 %.
      </li>
      <li>
        <b>Velikost fondu:</b> Čím větší fond, tím nižší riziko případné likvidace nebo vysokých spreadů.
      </li>
      <li>
        <b>Dlouhodobá výkonnost:</b> Sledujeme min. 5letou historii výnosů.
      </li>
      <li>
        <b>Reputace správce:</b> BlackRock (iShares), Vanguard, Amundi a State Street (SPDR) patří mezi nejdůvěryhodnější.
      </li>
      <li>
        <b>Dostupnost u českých brokerů:</b> Všechny doporučené ETF lze jednoduše koupit u DEGIRO, XTB, FIO apod.
      </li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Obecný přehled dalších ETF na americké akcie</h3>
    <p className="mb-3">
      V tabulce najdete další kvalitní ETF na americký akciový trh seřazené podle výnosu za posledních 5 let.
    </p>
    <FilteredETFList filter={US_ETF_TABLE_FILTER} />

    <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 my-6 rounded">
      <b>Upozornění:</b> Investování do ETF nese investiční riziko. Minulé výnosy nejsou zárukou výnosů budoucích. Tento článek není individuálním investičním doporučením.
    </div>

    <h2 className="text-lg font-semibold mt-10 mb-3">Jak koupit americké ETF krok za krokem?</h2>
    <ul className="list-decimal ml-6 mb-6">
      <li>Vyberte si vhodné ETF podle vaší strategie (S&P500? Nasdaq? Dividendové?).</li>
      <li>Ověřte si TER, velikost fondu a dostupnost u vašeho brokera.</li>
      <li>Otevřete účet u ověřených brokerů jako DEGIRO, XTB, FIO apod.</li>
      <li>Podle ISIN vyhledejte fond a zadejte pokyn k nákupu.</li>
      <li>Zvažte pravidelné investování pro snížení rizika špatného načasování trhu.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Časté otázky (FAQ) – americké ETF</h3>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Které ETF je nejvhodnější na americké akcie?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Pro většinu investorů je nejlepší <Link to="/etf/IE00B5BMR087" className="text-violet-600 underline">iShares Core S&amp;P 500</Link>, případně jeho ekvivalenty od Vanguard nebo SPDR.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Má smysl zvolit místo S&P 500 i ETF na Nasdaq 100?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Nasdaq 100 obsahuje hlavně technologické firmy a může být vhodným doplňkem pro růstovější část portfolia.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Mohu nakoupit americká ETF z ČR?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Ano, evropské verze amerických ETF jsou běžně dostupné u evropských brokerů (DEGIRO, XTB, FIO atd.).
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Jak zvolit měnu ETF (USD vs EUR)?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Většina evropských ETF na americké akcie je k dispozici v EUR i USD variantě – rozdíl zpravidla není zásadní pro dlouhodobé investování. Důležitější je sledovat poplatky (TER), likviditu a šíři indexu.
      </div>
    </details>

    <h3 className="text-xl font-semibold mt-10 mb-4">Závěr – americké ETF pro vaše portfolio</h3>
    <p>
      <strong>Americké akciové ETF</strong> představují základ každého globálního portfolia. Nabízí stabilitu, růstový potenciál a jednoduchý přístup k nejvýznamnějším firmám na světě. Výběrem jednoho z doporučených ETF můžete bez starostí dlouhodobě zhodnocovat své peníze s minimem poplatků.
    </p>
    <p className="mt-2 text-gray-600">
      Další inspiraci najdete v našem hlavním srovnávači ETF fondů na hlavní stránce tohoto webu!
    </p>
  </BlogArticleLayout>
);

export default NejlepsiETFNaAmerickeAkcie;
