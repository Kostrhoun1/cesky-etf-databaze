
import React from "react";
import { Link } from "react-router-dom";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

const RECOMMENDED_ETFS = [
  {
    name: "iShares Core MSCI World UCITS ETF",
    isin: "IE00B4L5Y983",
    reason: "Globální akciový ETF, ideální základ dlouhodobého pasivního portfolia. Investuje do více než 1 500 velkých a středních firem ve vyspělých zemích světa.",
    type: "Globální akcie",
  },
  {
    name: "iShares Core S&P 500 UCITS ETF",
    isin: "IE00B5BMR087",
    reason: "ETF sledující nejsledovanější americký index S&P 500. Vhodný pro investory, kteří chtějí zaměřit USA, často nabízí velmi nízké poplatky (TER ~0,07 %).",
    type: "USA akcie",
  },
  {
    name: "Vanguard FTSE All-World UCITS ETF",
    isin: "IE00B3RBWM25",
    reason: "ETF, který nabízí jednoduchou globální diverzifikaci v jediném fondu (vyspělé + rozvíjející se trhy).",
    type: "Celosvětové akcie",
  },
  {
    name: "Xtrackers MSCI Emerging Markets UCITS ETF",
    isin: "IE00BTJRMP35",
    reason: "Nízkopoplatkový fond zaměřený na rozvíjející se trhy. Skvělý doplněk k vyspělým trhům.",
    type: "Rozvíjející se trhy",
  },
  {
    name: "iShares Core MSCI EM IMI UCITS ETF",
    isin: "IE00BKM4GZ66",
    reason: "Alternativa pro investici do rozvíjejících se trhů, zahrnuje i malé a střední firmy (širší diverzifikace).",
    type: "Rozvíjející se trhy",
  },
  {
    name: "SPDR MSCI Europe UCITS ETF",
    isin: "IE00BKWQ0M75",
    reason: "ETF na evropské akcie, vhodný pro investory, kteří chtějí větší váhu Evropy v portfoliu.",
    type: "Evropské akcie",
  },
  {
    name: "iShares MSCI ACWI UCITS ETF",
    isin: "IE00B6R52259",
    reason: "ETF pokrývající vývoj akciových trhů celého světa včetně rozvinutých i rozvíjejících se ekonomik.",
    type: "Celosvětové akcie",
  },
  {
    name: "ISHARES DIVDAX UCITS ETF",
    isin: "DE0002635273",
    reason: "Dividendový ETF zaměřený na německé blue-chip akcie s pravidelnou dividendou.",
    type: "Dividendové ETF",
  },
  {
    name: "SPDR S&P U.S. Dividend Aristocrats UCITS ETF",
    isin: "IE00B6YX5D40",
    reason: "ETF zaměřený na společnosti s dlouhou tradicí růstu dividend. Vhodný pro budování pasivního příjmu.",
    type: "Dividendové ETF",
  },
  {
    name: "Xtrackers MSCI USA Information Technology UCITS ETF",
    isin: "IE00BM67HN09",
    reason: "ETF zaměřený na americké technologické firmy (např. Apple, Microsoft, Nvidia atd.).",
    type: "Sektorové ETF",
  },
];

const NejlepsiETF2025: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší ETF 2025"
    perex="Výběr nejlepších ETF fondů aktuálně dostupných pro české investory. Přehled zahrnuje největší a nejvýkonnější ETF, konkrétní tipy, odkazy na recenze a vysvětlení strategie výběru."
    seoDescription="Nejlepší ETF 2025: kompletní srovnání a doporučení fondů podle velikosti, poplatků a výnosu. Analýza a tipy na globální, americké, evropské, dividendové a sektorové ETF pro české investory."
  >
    <h2 id="proč-investovat-etf" className="text-xl font-semibold mt-6 mb-2">Proč investovat do ETF v roce 2025?</h2>
    <p>
      Investování do ETF (Exchange Traded Funds) zůstává i v roce 2025 nejefektivnější a nejjednodušší cestou, jak dlouhodobě zhodnocovat peníze. ETF umožní širokou diverzifikaci, výrazně nižší poplatky (<strong>TER</strong>) oproti podílovým fondům a transparentní správu investic.
    </p>

    <div className="bg-violet-50 border-l-4 border-primary px-4 py-3 my-4 rounded">
      <strong>Tip pro začátečníky:</strong> Pokud chcete investovat jednoduše, zvolte globální ETF na index <strong>MSCI World</strong> nebo <strong>S&P 500</strong>. Tyto fondy nabízejí dlouhodobě stabilní výnos a širokou diverzifikaci.
    </div>

    <h2 id="nejlepsi-etf-2025" className="text-xl font-semibold mt-8 mb-4">Nejlepší ETF roku 2025 – konkrétní tipy pro české investory</h2>
    <p>
      Následující přehled je shrnutím těch nejlepších ETF fondů, které doporučujeme českým investorům v roce 2025. Výběr zohledňuje velikost fondu, poplatky TER, historické výnosy, reputaci správcovské společnosti i dostupnost u českých brokerů.
    </p>

    <ul className="space-y-3 mt-4 mb-6">
      {RECOMMENDED_ETFS.map((etf) => (
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

    <h3 className="text-lg mt-8 mb-2 font-semibold">Výběrová kritéria nejlepších ETF 2025</h3>
    <ul className="list-disc ml-6 mb-6">
      <li><strong>TER:</strong> preferujeme fondy s ročním poplatkem nižším než 0,20 %</li>
      <li><strong>Objem spravovaných prostředků:</strong> čím větší fond, tím nižší riziko zrušení</li>
      <li><strong>Dlouhodobá výkonnost:</strong> sledujeme výnosy za posledních 5–10 let</li>
      <li><strong>Diverzifikace:</strong> globální, regionální i sektorové zaměření</li>
      <li><strong>Dostupnost u českých brokerů:</strong> možnost jednoduchého nákupu</li>
    </ul>

    <h3 className="text-lg mt-8 mb-2 font-semibold">Jak investovat do nejlepších ETF v roce 2025?</h3>
    <ul className="list-decimal ml-6 mb-6">
      <li>Vyberte si vhodné ETF podle vaší strategie a rizikového profilu</li>
      <li>Ověřte si TER a velikost fondu</li>
      <li>Otevřete účet u ověřeného brokera (např. DEGIRO, XTB, FIO)</li>
      <li>Zvažte pravidelné investování a rebalancování portfolia</li>
    </ul>

    <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 my-4 rounded">
      <strong>Upozornění:</strong> Investování do ETF nese investiční riziko. Minulé výnosy nejsou zárukou výnosů budoucích. Výše uvedené fondy nejsou investičním doporučením.
    </div>

    <h2 className="text-xl font-semibold mt-10 mb-4">Aktuální přehled nejlepších ETF podle dat z naší databáze</h2>
    
    <h3 className="text-lg font-semibold mt-8 mb-3">🏆 TOP 10 nejlevnějších ETF podle poplatků (TER)</h3>
    <p className="text-gray-600 mb-4">
      Přehled ETF s nejnižšími ročními poplatky - ideální pro dlouhodobé investory, kteří chtějí minimalizovat náklady.
    </p>
    <FilteredETFList filter={{
      top: 10,
      category: undefined,
      sortBy: "ter_numeric",
      sortOrder: "asc",
    }} />

    <h3 className="text-lg font-semibold mt-10 mb-3">📈 TOP 10 nejvýnosnějších ETF za letošní rok (YTD)</h3>
    <p className="text-gray-600 mb-4">
      ETF s nejlepší výkonností od začátku roku 2025 - data se aktualizují podle aktuálních tržních výsledků.
    </p>
    <FilteredETFList filter={{
      top: 10,
      category: undefined,
      sortBy: "return_ytd",
      sortOrder: "desc",
    }} />

    <h3 className="text-lg font-semibold mt-10 mb-3">💰 TOP 10 největších ETF podle spravovaných aktiv</h3>
    <p className="text-gray-600 mb-4">
      Největší ETF fondy podle objemu spravovaných prostředků - obvykle nejstabilnější a nejlikvidnější volba.
    </p>
    <FilteredETFList filter={{
      top: 10,
      category: undefined,
      sortBy: "fund_size_numeric",
      sortOrder: "desc",
    }} />

    <h2 className="text-xl font-semibold mt-10 mb-3">Jak vybírat ETF v roce 2025? – Rozšířené rozdělení</h2>
    <ul className="mb-8 list-disc ml-7">
      <li><strong>Globální akciové ETF:</strong> široká diverzifikace po celém světě, základ každého portfolia</li>
      <li><strong>Americké ETF (S&P 500, Nasdaq):</strong> vysoce likvidní, často nejlevnější s nejdelší historií výkonnosti</li>
      <li><strong>Evropské ETF:</strong> vhodné pro větší váhu Evropy</li>
      <li><strong>Dividendové ETF:</strong> pro investory hledající pasivní příjem</li>
      <li><strong>Sektorové ETF:</strong> zaměření na odvětví (technologie, zdraví, finance…)</li>
      <li><strong>Rozvíjející se trhy:</strong> větší růstový potenciál, ale i volatilita</li>
    </ul>

    <h2 className="text-lg mt-10 mb-2 font-semibold">Časté otázky – Nejlepší ETF 2025 (FAQ)</h2>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Které ETF je nejlepší pro dlouhodobé investování?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Pro většinu investorů je ideální dlouhodobá investice do <Link to="/etf/IE00B4L5Y983" className="text-violet-600 underline">iShares Core MSCI World</Link> nebo <Link to="/etf/IE00B3RBWM25" className="text-violet-600 underline">Vanguard FTSE All-World</Link>.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Proč vybírat hlavně indexové (pasivní) ETF fondy?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Indexové ETF mají dlouhodobě nadprůměrné výsledky díky nízkým poplatkům a široké diverzifikaci.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Jak koupit ETF fond z tohoto seznamu?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        <ol className="list-decimal ml-8">
          <li>Vyberte si ETF z našeho přehledu (klikněte na název pro více detailů)</li>
          <li>Ověřte si, že fond je dostupný u vašeho brokera</li>
          <li>Vyplňte pokyn k nákupu podle ISIN</li>
        </ol>
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Kde najdu srovnání brokerů?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Podívejte se na naše <Link to="/#brokri" className="text-violet-600 underline">srovnání brokerů zde</Link>.
      </div>
    </details>

    <h3 className="text-xl font-semibold mt-10 mb-4">Závěr: Jaké ETF vybrat pro rok 2025?</h3>
    <p>
      <strong>Nejlepší ETF pro rok 2025</strong> jsou ty, které nabízejí rozumnou kombinaci dlouhodobé výkonnosti, nízkých nákladů (TER), silné diverzifikace a transparentnosti. V tabulce výše i v doporučených tipech najdete konkrétní fondy, které splňují tyto parametry a které by měly být dostupné českým investorům u domácích i zahraničních brokerů.
    </p>
    <p className="mt-2 text-gray-600">Pokud potřebujete další inspiraci, využijte vyhledávač ETF fondů na hlavní stránce tohoto webu!</p>
  </BlogArticleLayout>
);

export default NejlepsiETF2025;
