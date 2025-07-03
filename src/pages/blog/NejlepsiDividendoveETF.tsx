
import React from "react";
import { Link } from "react-router-dom";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Doporučené dividendové ETF s odkazy na detail a vysvětlením
const RECOMMENDED_DIVIDEND_ETFS = [
  {
    name: "SPDR S&P U.S. Dividend Aristocrats UCITS ETF",
    isin: "IE00B6YX5D40",
    reason: "Nejslavnější evropský ETF na dividendové aristokraty z USA. Dlouhá historie výplat a stabilní růst dividend. Ideál na dlouhodobý pasivní příjem.",
  },
  {
    name: "iShares STOXX Global Select Dividend 100 UCITS ETF",
    isin: "DE000A0F5UH1",
    reason: "Globální rozložení dividendově silných firem, široká diverzifikace napříč regiony a sektory, pravidelné výplaty.",
  },
  {
    name: "Vanguard FTSE All-World High Dividend Yield UCITS ETF",
    isin: "IE00B8GKDB10",
    reason: "Oblíbené „vše v jednom“ dividendové ETF na celý svět, nízký TER (~0,29 %), skvělá likvidita, skvělá volba pro začátečníky.",
  },
  {
    name: "iShares Euro Dividend UCITS ETF",
    isin: "IE00B0M62S72",
    reason: "Pro investory hledající příjem v EUR. Pečlivý výběr nejlepších dividendových firem v eurozóně.",
  },
  {
    name: "Xtrackers Stoxx Global Select Dividend 100 Swap UCITS ETF",
    isin: "LU0292096186",
    reason: "Efektivní swapová replikace, globální diverzifikace, zaměřeno na firmy s dlouhou tradicí dividend.",
  }
];

// Filtr pro dividendové ETF
const filter = {
  top: 12,
  sortBy: "current_dividend_yield_numeric" as const,
  sortOrder: "desc" as const,
  hasDividendYield: true,
};

const NejlepsiDividendoveETF: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší dividendové ETF"
    perex="Chcete pravidelný pasivní příjem? Objevte výběr nejlépe hodnocených dividendových ETF vhodných pro dlouhodobé investory, včetně konkrétních doporučení, kritérií výběru i často kladených otázek."
    seoDescription="Srovnání a doporučení nejlepších dividendových ETF. Výhody, poplatky, výnosy, způsob výběru, konkrétní fondy a rady pro investory na rok 2025."
  >
    <h2 className="text-xl font-semibold mb-3">Proč investovat do dividendových ETF?</h2>
    <p>
      Dividendová ETF jsou výbornou volbou pro investory, kteří preferují pravidelný příjem a zároveň chtějí těžit z dlouhodobého růstu akciového trhu. Nejčastěji kopírují indexy zaměřené na tzv. <strong>dividendové aristokraty</strong> či firmy s dlouhodobě stabilní a rostoucí dividendovou politikou.
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>Pravidelné výplaty dividend – ideální pro „rentiérské“ strategie</li>
      <li>Diversifikace napříč sektory i geografiemi (USA, Evropa, svět)</li>
      <li>Flexibilita – reinvestice dividend nebo jejich výplata na účet</li>
      <li>Obvykle nižší volatilita než růstově orientované fondy</li>
      <li>Efektivní pro ochranu portfolia v dobách vyšší inflace</li>
    </ul>

    <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 mb-5 rounded">
      <b>Tip:</b> Složení dividendových ETF často reflektuje silné globální značky s dlouhou tradicí vyplácení zisku akcionářům. Vhodné jako stabilizační část portfolia.
    </div>

    <h2 className="text-xl font-semibold mt-8 mb-4">Doporučené dividendové ETF pro rok 2025</h2>
    <p className="mb-3">
      Vybrali jsme špičkové fondy zaměřené na dividendy dle výše poplatků, velikosti, likvidity i pravidelnosti výplat. Kliknutím na název zobrazíte detailní informace o fondu, včetně rozdělení portfolia a historických výnosů.
    </p>
    <ul className="space-y-3 mb-8">
      {RECOMMENDED_DIVIDEND_ETFS.map((etf) => (
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

    <h3 className="text-lg font-semibold mb-2">Výběrová kritéria nejlepších dividendových ETF</h3>
    <ul className="mb-6 list-disc ml-6">
      <li><b>Nízké celkové náklady (TER):</b> Preferujeme ETF s ročním nákladem do 0,4 %.</li>
      <li><b>Dlouhá historie a objem fondu:</b> Vybíráme jen likvidní ETF s dostatečnou velikostí a tradicí výplat dividend.</li>
      <li><b>Diverzifikace:</b> Fondy pokrývající různé sektory a regiony sníží riziko propadu jednoho segmentu.</li>
      <li><b>Reputace správce:</b> Silní správci jako iShares, Vanguard, SPDR nebo Xtrackers zajišťují transparentnost a kvalitu.</li>
      <li><b>Dostupnost u evropských brokerů:</b> Všechny doporučené ETF lze pohodlně nakoupit v ČR u DEGIRO, XTB nebo FIO.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Přehled dalších dividendových ETF</h3>
    <p className="mb-3">
      Tabulka níže obsahuje další kvalitní dividendové ETF vyfiltrované dle celkové velikosti fondu (AUM) – najdete zde různé správcovské domy, regionální i globální zaměření a můžete je vzájemně porovnat podle poplatků i výnosů.
    </p>
    <FilteredETFList filter={filter} />

    <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 my-6 rounded">
      <b>Upozornění:</b> Výše dividend ani jejich růst nejsou nikdy zaručeny, závisí na výsledcích firem i tržním vývoji. Investování do ETF vždy zahrnuje riziko kolísání hodnoty.
    </div>

    <h2 className="text-lg font-semibold mt-10 mb-3">Jak začít investovat do dividendových ETF?</h2>
    <ul className="list-decimal ml-6 mb-6">
      <li>Zamyslete se nad svými investičními cíli – pravidelný příjem, míra rizika, časový horizont.</li>
      <li>Vyberte konkrétní ETF s ohledem na region, měnu výplaty a frekvenci dividend.</li>
      <li>Zkontrolujte TER (poplatky), velikost fondu a distribuci dividend (akumulační vs. distribuční třída).</li>
      <li>Ověřte dostupnost ETF u vašeho brokera (DEGIRO, XTB, FIO atd.).</li>
      <li>Zvažte pravidelné investování pro efektivnější průměrování nákupní ceny a reinvestici dividend.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Časté otázky (FAQ) – dividendové ETF</h3>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Které dividendové ETF vyplácejí nejčastěji?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        <strong>SPDR S&P U.S. Dividend Aristocrats</strong> vyplácí kvartálně, některé ETF (např. iShares MSCI World Quality Dividend) i měsíčně – vždy sledujte konkretni podmínky fondu!
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Mám zvolit akumulační nebo distribuční variantu ETF?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Záleží na vaší strategii – akumulační třída reinvestuje dividendy automaticky (ideální na dlouhý horizont), distribuční je vyplácí přímo na účet (vhodné pro rentiérský příjem).
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Jak jsou dividendy z ETF zdaňovány?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Většina evropských dividendových ETF automaticky odvádí část daně z dividendy v zemi fondu. Další případné zdanění závisí na vaší rezidenci a zda fond vyplácí či reinvestuje dividendy. Doporučujeme poradit se s daňovým poradcem.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Mají dividendová ETF menší riziko než růstové fondy?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Ne vždy – volatilita je často nižší, ale záleží na složení fondu. Dividendové ETF bývají stabilnější během poklesů trhu, stále však podléhají vývoji firemních zisků i tržních trendů.
      </div>
    </details>

    <h3 className="text-xl font-semibold mt-10 mb-4">Závěr – dividendová ETF jako stabilní pilíř příjmu</h3>
    <p>
      <strong>Dividendová ETF</strong> jsou ideální volbou pro každého investora, kdo chce kombinovat růst akcií s pravidelným příjmem. Díky pestrému výběru a stabilitě vyplácených firem obstály v dlouhodobých tržních cyklech i krizích. Nezapomínejte však na důležitost diverzifikace a nepřeceňujte jen absolutní výši dividendy.
    </p>
    <p className="mt-2 text-gray-600">
      Další praktické tipy najdete v ostatních článcích blogu nebo v hlavním srovnávači ETF na tomto webu.
    </p>
  </BlogArticleLayout>
);

export default NejlepsiDividendoveETF;

