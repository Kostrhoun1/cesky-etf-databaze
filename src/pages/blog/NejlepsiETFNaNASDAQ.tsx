
import React from "react";
import { Link } from "react-router-dom";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Doporučené NASDAQ ETF s odkazy na detail
const RECOMMENDED_NASDAQ_ETFS = [
  {
    name: "iShares NASDAQ 100 UCITS ETF",
    isin: "IE00B53SZB19",
    reason: "Tradičně nejpopulárnější evropská varianta ETF na NASDAQ 100. Silná likvidita, nízké poplatky a široká dostupnost.",
  },
  {
    name: "Invesco EQQQ NASDAQ-100 UCITS ETF",
    isin: "IE0032077012",
    reason: "Historicky nejdéle existující evropské ETF na NASDAQ 100. Známé svým stabilním objemem i správou.",
  },
  {
    name: "Amundi Nasdaq-100 UCITS ETF",
    isin: "LU1681038243",
    reason: "Konkurenční ETF s velmi nízkými náklady, ideální alternativa ke známějším správám na stejný index.",
  },
  {
    name: "Xtrackers NASDAQ 100 UCITS ETF",
    isin: "IE00BLRPRQ36",
    reason: "Další kvalitní volba s dobrou likviditou pro každého evropského investora.",
  },
  {
    name: "Lyxor NASDAQ-100 UCITS ETF",
    isin: "LU1829221024",
    reason: "Variantní ETF na NASDAQ s akumulační i distribučí verzí, vhodné pro různé strategie.",
  }
];

const NASDAQ_ETF_TABLE_FILTER = {
  category: "Nasdaq",
  top: 10,
  sortBy: "return_5y" as const,
  sortOrder: "desc" as const,
};

const NejlepsiETFNaNASDAQ: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší ETF na NASDAQ"
    perex="Přehled nejkvalitnějších ETF fondů zaměřených na akciový index NASDAQ 100. Výběr podle výnosu, velikosti a správců, včetně doporučení a praktických rad pro rok 2025."
    seoDescription="Nejlepší ETF na NASDAQ – doporučení, srovnání budoucích i historických výnosů, poplatků a rizik. Jak efektivně investovat do amerických technologických firem."
  >
    <h2 className="text-xl font-semibold mb-3">Proč zvolit NASDAQ ETF?</h2>
    <p>
      Index NASDAQ 100 sdružuje 100 největších nefinančních společností obchodovaných na americkém trhu NASDAQ, s velkým důrazem na technologie, inovace a růst.
      Investice do ETF kopírujících NASDAQ přináší:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>Expozici na nejrychleji rostoucí technologické a inovativní firmy (Apple, Microsoft, Nvidia, Amazon, Meta aj.)</li>
      <li>Dlouhodobě vysoké historické výnosy (často nad <b>15&nbsp;% ročně</b> za poslední dekádu)</li>
      <li>Možnost diverzifikace s <b>nízkými poplatky (TER často pod 0,2&nbsp;%)</b></li>
      <li>Snadnou dostupnost pro evropské investory a možnost akumulačních (bez vyplácení dividend) i distribučích tříd</li>
    </ul>

    <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 mb-5 rounded">
      <b>Tip:</b> NASDAQ ETF jsou vhodné pro dlouhodobé investory s vyšší tolerancí k volatilitě, kteří chtějí mít výraznou část portfolia v amerických technologiích. 
    </div>

    <h2 className="text-xl font-semibold mt-8 mb-4">Doporučené ETF na NASDAQ</h2>
    <p className="mb-3">
      Vybrali jsme nejsilnější ETF na index NASDAQ 100, které splňují nízké poplatky, velikost fondu a dostupnost u hlavních brokerů. Kliknutím na název zjistíte detailní informace, složení portfolia, poplatky a výkon.
    </p>
    <ul className="space-y-3 mb-8">
      {RECOMMENDED_NASDAQ_ETFS.map((etf) => (
        <li key={etf.isin} className="bg-gray-50 rounded p-4 border hover:shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                to={`/etf/${etf.isin}`}
                className="text-violet-700 font-medium underline underline-offset-2 hover:text-violet-900"
              >
                {etf.name}
              </Link>
              <span className="text-xs ml-3 text-gray-500">{etf.isin}</span>
            </div>
            <div className="text-gray-700 mt-2 md:mt-0 text-sm">{etf.reason}</div>
          </div>
        </li>
      ))}
    </ul>

    <h3 className="text-lg font-semibold mb-2">Výběrová kritéria nejlepších NASDAQ ETF</h3>
    <ul className="mb-6 list-disc ml-6">
      <li><b>Nízké poplatky (TER):</b> Preferujeme ETF s celkovými ročními náklady pod 0,2&nbsp;%.</li>
      <li><b>Dostatečný objem spravovaného majetku:</b> Vyšší likvidita a menší riziko ukončení fondu.</li>
      <li><b>Kvalitní správce:</b> iShares (BlackRock), Invesco, Amundi a Xtrackers patří mezi prověřené domy s tisíci klienty.</li>
      <li><b>Dlouhodobý výkon:</b> Min. 5letá historie či navázání na dlouhodobě sledovaný index.</li>
      <li><b>Dostupnost v ČR:</b> Všechna uvedená ETF lze jednoduše koupit přes DEGIRO, XTB, FIO i jiné brokery.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Přehled dalších ETF zaměřených na NASDAQ</h3>
    <p className="mb-3">
      V následující tabulce najdete další kvalitní ETF zaměřená na index NASDAQ, seřazeno dle výnosu za posledních 5 let. Můžete je srovnat podle správce, poplatků i velikosti.
    </p>
    <FilteredETFList filter={NASDAQ_ETF_TABLE_FILTER} />

    <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 my-6 rounded">
      <b>Upozornění:</b> Investování do akciových ETF na NASDAQ znamená výraznější kolísání hodnoty v krátkodobém horizontu. Minulé výnosy negarantují budoucí.
    </div>

    <h2 className="text-lg font-semibold mt-10 mb-3">Jak koupit ETF na NASDAQ krok za krokem?</h2>
    <ul className="list-decimal ml-6 mb-6">
      <li>Stanovte si cíle a poměr akciové složky v portfoliu, například NASDAQ vs. S&amp;P 500.</li>
      <li>Vyberte konkrétní ETF, nejlépe s nízkým TER a dostatečně velkou historií.</li>
      <li>Ověřte si dostupnost ETF u vašeho brokera (DEGIRO, XTB, FIO atd.).</li>
      <li>Při nákupu zadávejte pokyn přes ISIN kód fondu pro zamezení chyb.</li>
      <li>Zvažte pravidelné investování – průměrování ceny sníží dopad volatility trhu.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Časté dotazy (FAQ) – ETF na NASDAQ</h3>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Je lepší investovat do NASDAQ nebo S&amp;P500?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Index S&amp;P500 je defenzivnější, obsahuje tradiční sektory i technologie, NASDAQ 100 je více růstový a volatilní. Doporučujeme kombinaci dle osobních preferencí.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Jaké ETF na NASDAQ mají nejnižší poplatky?</summary>
      <div className="mt-2 ml-6 text-gray-700">
       K nejlevnějším patří <Link to="/etf/IE00B53SZB19" className="text-violet-600 underline">iShares NASDAQ 100</Link> nebo <Link to="/etf/LU1681038243" className="text-violet-600 underline">Amundi NASDAQ-100</Link>, oba s TER kolem 0,20 %.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">V jaké měně nakupovat NASDAQ ETF?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Většina evropských NASDAQ ETF je v EUR i USD, dlouhodobě je rozdíl minimální, důležitější je poplatek TER, likvidita a správa fondu.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Vyplácí NASDAQ ETF dividendy?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Najdete jak akumulační, tak distribučí třídy. Většina technologických firem žádné významné dividendy nevyplácí, zaměřují se na růst.
      </div>
    </details>

    <h3 className="text-xl font-semibold mt-10 mb-4">Závěr – NASDAQ v portfoliu dlouhodobého investora</h3>
    <p>
      <strong>NASDAQ ETF</strong> poskytují přístup ke špičkovým americkým technologickým firmám a jsou vhodné jako dynamická složka moderního akciového portfolia. Při správné kombinaci mohou zásadně zvýšit potenciál celkových výnosů vaší investice.
    </p>
    <p className="mt-2 text-gray-600">
      Další investiční tipy najdete v ostatních článcích našeho blogu nebo v hlavním srovnávači ETF na této stránce!
    </p>
  </BlogArticleLayout>
);

export default NejlepsiETFNaNASDAQ;
