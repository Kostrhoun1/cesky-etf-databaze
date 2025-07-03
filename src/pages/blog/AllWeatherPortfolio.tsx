
import React from "react";
import { Link } from "react-router-dom";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Doporučené ETF pro All-Weather portfolio s odkazy na detail
const ALL_WEATHER_ETF_RECOMMENDATIONS = [
  {
    name: "iShares Core Euro Government Bond UCITS ETF",
    isin: "IE00B4WXJJ64",
    category: "Dluhopisy - dlouhodobé",
    allocation: "40%",
    reason: "Dlouhodobé vládní dluhopisy eurozóny jako základ dluhopisové části portfolia. Nízké poplatky a vysoká likvidita.",
  },
  {
    name: "Xtrackers II iBoxx Sovereigns Eurozone 1-3 UCITS ETF",
    isin: "LU0290355717",
    category: "Dluhopisy - krátkodobé",
    allocation: "15%",
    reason: "Krátkodobé vládní dluhopisy pro stabilitu a nižší citlivost na změny úrokových sazeb.",
  },
  {
    name: "iShares MSCI World UCITS ETF",
    isin: "IE00B4L5Y983",
    category: "Akcie",
    allocation: "30%",
    reason: "Široký globální akciový trh jako růstová složka portfolia. Nejlikvidnější světové akciové ETF.",
  },
  {
    name: "iShares Diversified Commodity Swap UCITS ETF",
    isin: "IE00BDFL4P12",
    category: "Komodity",
    allocation: "7,5%",
    reason: "Široký koš komodit pro ochranu před inflací a diverzifikaci od tradičních aktiv.",
  },
  {
    name: "Xtrackers Physical Gold ETC",
    isin: "DE000A1E0HR8",
    category: "Zlato",
    allocation: "7,5%",
    reason: "Fyzické zlato jako tradiční ochrana před inflací a krizemi. Alternativně lze použít jiné ETF na zlato.",
  }
];

// Filtry pro různé složky All-Weather portfolia
const BONDS_ETF_FILTER = {
  top: 8,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  regionKeywords: ["Rozvinuté země"],
  nameKeywords: ["government", "bond"],
};

const COMMODITIES_ETF_FILTER = {
  top: 6,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  nameKeywords: ["gold", "commodity", "zlato"],
};

const GLOBAL_STOCKS_FILTER = {
  top: 8,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  indexNameKeywords: ["msci world", "ftse all-world"],
};

const AllWeatherPortfolio: React.FC = () => (
  <BlogArticleLayout
    title="All-Weather Portfolio podle Raya Dalia"
    perex="Objevte investiční strategii, která má fungovat za každého ekonomického počasí. Kompletní průvodce All-Weather portfoliem od zakladatele Bridgewater Associates s praktickými ETF doporučeními."
    seoDescription="All-Weather Portfolio Ray Dalio – jak sestavit diverzifikované portfolio pomocí ETF. Alokace aktiv, konkrétní fondy a strategie pro každé ekonomické prostředí."
  >
    <h2 className="text-xl font-semibold mb-3">Co je All-Weather Portfolio?</h2>
    <p>
      <strong>All-Weather Portfolio</strong> je investiční strategie vyvinutá legendárním investorem <strong>Rayem Daliem</strong>, zakladatelem největšího hedgeového fondu na světě Bridgewater Associates. 
      Cílem této strategie je vytvořit portfolio, které dokáže generovat stabilní výnosy bez ohledu na ekonomické prostředí.
    </p>
    <p className="mt-3">
      Dalio identifikoval čtyři hlavní ekonomické prostředí a navrhl alokaci, která má dobře fungovat v každém z nich:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li><strong>Růst ekonomiky</strong> – akcie prosperují</li>
      <li><strong>Pokles ekonomiky</strong> – dluhopisy a zlato poskytují ochranu</li>
      <li><strong>Rostoucí inflace</strong> – komodity a inflačně vázané dluhopisy</li>
      <li><strong>Klesající inflace</strong> – nominální dluhopisy a akcie</li>
    </ul>

    <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 mb-5 rounded">
      <b>Klíčová myšlenka:</b> Místo sázení na jeden scénář diverzifikujeme rizika napříč různými ekonomickými prostředími pomocí nevyrovnaného rozložení aktiv.
    </div>

    <h2 className="text-xl font-semibold mt-8 mb-4">Klasická alokace All-Weather Portfolio</h2>
    <p className="mb-3">
      Ray Dalio doporučuje následující rozložení aktiv, které je založeno na <strong>risk parity</strong> principu – každé aktivum má podobný příspěvek k celkovému riziku portfolia:
    </p>
    
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="font-semibold mb-3">Doporučená alokace:</h3>
      <ul className="space-y-2">
        <li className="flex justify-between"><span>🏛️ <strong>Dlouhodobé dluhopisy</strong></span><span className="font-bold text-violet-600">40%</span></li>
        <li className="flex justify-between"><span>📈 <strong>Akcie</strong></span><span className="font-bold text-violet-600">30%</span></li>
        <li className="flex justify-between"><span>📊 <strong>Krátkodobé dluhopisy</strong></span><span className="font-bold text-violet-600">15%</span></li>
        <li className="flex justify-between"><span>🥇 <strong>Komodity</strong></span><span className="font-bold text-violet-600">7,5%</span></li>
        <li className="flex justify-between"><span>💰 <strong>Zlato</strong></span><span className="font-bold text-violet-600">7,5%</span></li>
      </ul>
    </div>

    <h2 className="text-xl font-semibold mt-8 mb-4">Praktická implementace pomocí ETF</h2>
    <p className="mb-3">
      Pro české investory je nejjednodušší způsob, jak All-Weather portfolio sestavit, použití evropských ETF. Níže najdete konkrétní doporučení fondů dostupných u hlavních brokerů:
    </p>
    <ul className="space-y-3 mb-8">
      {ALL_WEATHER_ETF_RECOMMENDATIONS.map((etf) => (
        <li key={etf.isin} className="bg-gray-50 rounded p-4 border hover:shadow">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Link
                  to={`/etf/${etf.isin}`}
                  className="text-violet-700 font-medium underline underline-offset-2 hover:text-violet-900"
                >
                  {etf.name}
                </Link>
                <span className="bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full font-medium">
                  {etf.allocation}
                </span>
              </div>
              <span className="text-xs text-gray-500">{etf.isin} • {etf.category}</span>
              <div className="text-gray-700 mt-2 text-sm">{etf.reason}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>

    <h3 className="text-lg font-semibold mb-2">Proč tato nevyrovnaná alokace funguje?</h3>
    <ul className="mb-6 list-disc ml-6">
      <li><b>Risk Parity:</b> Dluhopisy mají nižší volatilitu než akcie, proto jejich vyšší podíl vyrovnává riziko.</li>
      <li><b>Ochrana před inflací:</b> Komodity a zlato chrání před znehodnocením měny.</li>
      <li><b>Diverzifikace napříč cykly:</b> Portfolio má komponenty, které prosperují v různých ekonomických fázích.</li>
      <li><b>Minimalizace korelace:</b> Jednotlivá aktiva reagují odlišně na stejné ekonomické události.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Dostupné globální akciové ETF</h3>
    <p className="mb-3">
      Akciová část portfolia (30%) by měla být široce diverzifikovaná. Zde najdete nejlepší globální akciové ETF:
    </p>
    <FilteredETFList filter={GLOBAL_STOCKS_FILTER} />

    <h3 className="text-lg font-semibold mt-8 mb-2">Dostupné globální dluhopisové ETF pro All-Weather strategii</h3>
    <p className="mb-3">
      Dluhopisová část tvoří většinu portfolia (55%), proto je důležitý výběr kvalitních globálních government bondů:
    </p>
    <FilteredETFList filter={BONDS_ETF_FILTER} />

    <h3 className="text-lg font-semibold mt-8 mb-2">Komodity a zlato pro ochranu před inflací</h3>
    <p className="mb-3">
      Komoditní část (15%) chrání portfolio před inflací a měnovou devalvací:
    </p>
    <FilteredETFList filter={COMMODITIES_ETF_FILTER} />

    <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 my-6 rounded">
      <b>Upozornění:</b> All-Weather portfolio není zárukou zisku. Je navrženo pro stabilitu, ne maximální výnosy. V bull trzích může zaostávat za čistě akciovými portfolii.
    </div>

    <h2 className="text-lg font-semibold mt-10 mb-3">Jak postavit All-Weather portfolio krok za krokem</h2>
    <ul className="list-decimal ml-6 mb-6">
      <li>Určete celkovou částku, kterou chcete investovat do All-Weather strategie.</li>
      <li>Spočítejte konkrétní částky pro každou kategorii podle doporučených procent.</li>
      <li>Ověřte dostupnost doporučených ETF u vašeho brokera (DEGIRO, XTB, FIO).</li>
      <li>Postupně nakupte jednotlivá ETF podle alokace, ideálně během několika měsíců.</li>
      <li>Nastavte pravidelné vyvažování portfolia (rebalancing) každých 6-12 měsíců.</li>
      <li>Zvažte pravidelné měsíční investování pro postupné budování pozic.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Časté otázky (FAQ) – All-Weather Portfolio</h3>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Jaký je očekávaný výnos All-Weather portfolia?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Historicky dosahuje All-Weather portfolio průměrného ročního výnosu 7-9% s nižší volatilitou než tradiční akciové portfolio. Důraz je na stabilitu, ne maximální výnos.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Musím dodržet přesně tuto alokaci?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Můžete si strategii přizpůsobit – mladší investoři často zvyšují podíl akcií, starší naopak dluhopisů. Klíčové je zachovat diverzifikaci napříč třídami aktiv.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Jak často rebalancovat All-Weather portfolio?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Doporučuje se rebalancing každých 6-12 měsíců nebo když se alokace vychýlí o více než 5% od cílových hodnot. Příliš časté rebalancování zvyšuje transakční náklady.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Je All-Weather portfolio vhodné pro začátečníky?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Ano, je to vynikající strategie pro začátečníky díky své jednoduchosti a důrazu na diverzifikaci. Vyžaduje méně aktivního řízení než jiné strategie.
      </div>
    </details>

    <h3 className="text-xl font-semibold mt-10 mb-4">Závěr – All-Weather jako základ portfolia</h3>
    <p>
      <strong>All-Weather Portfolio</strong> představuje time-tested přístup k dlouhodobému investování s důrazem na stabilitu a diverzifikaci. Je ideální pro konzervativní investory a jako základ většího portfolia. 
      Kombinace s dalšími investičními strategiemi může vytvořit robustní investiční plán pro každého.
    </p>
    <p className="mt-2 text-gray-600">
      Více investičních strategií a ETF doporučení najdete v dalších článcích naší sekce Tipy!
    </p>
  </BlogArticleLayout>
);

export default AllWeatherPortfolio;
