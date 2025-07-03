
import React from "react";
import { Link } from "react-router-dom";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Doporučené evropské ETF s odkazy a stručným komentářem
const RECOMMENDED_EU_ETFS = [
  {
    name: "iShares Core MSCI Europe UCITS ETF",
    isin: "IE00B4K48X80",
    reason: "Nejoblíbenější a nejlikvidnější evropský ETF se širokým pokrytím velkých a středních firem celé Evropy. Nízký TER (0,12 %), prověřený správce, silná diverzifikace.",
  },
  {
    name: "Xtrackers MSCI Europe UCITS ETF",
    isin: "LU0274209237",
    reason: "Alternativa s extrémně nízkým TER (0,12 %), často nejlevnější varianta v nabídce brokerů. Kvalitní replikace indexu a vysoké AUM.",
  },
  {
    name: "Lyxor STOXX Europe 600 UCITS ETF",
    isin: "LU0908500753",
    reason: "Široká expozice na celý region skrze 600 top firem napříč velikostními kategoriemi. Výborná diverzifikace podle sektorů i zemí.",
  },
  {
    name: "Vanguard FTSE Developed Europe UCITS ETF",
    isin: "IE00BKX55T58",
    reason: "Zastoupení vyspělých evropských trhů, pasivní fond oblíbený i v USA s vynikající reputací správce a nízkými poplatky.",
  },
  {
    name: "Amundi MSCI Europe UCITS ETF",
    isin: "LU1681041971",
    reason: "Cenově dostupná volba s nízkými náklady i menším minimem pro investici. Plně replikuje evropský index MSCI, prověřený správce.",
  }
];

const TABLE_FILTER = {
  top: 12,
  sortBy: "fund_size_numeric" as const,
  sortOrder: "desc" as const,
  regionKeywords: ["europe", "developed europe", "eurozone"],
  indexNameKeywords: ["msci europe", "stoxx", "ftse developed europe", "europe 600"],
};

const NejlepsiETFNaEvropskeAkcie: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší ETF na evropské akcie"
    perex="Evropské akcie nabízí lákavou diverzifikaci mimo USA. Přinášíme přehled špičkových ETF fondů zaměřených na Evropu, konkrétní doporučení i rady k výběru a nejčastější otázky."
    seoDescription="Srovnání nejlepších ETF na evropské akcie, detailní doporučení a kritéria výběru na rok 2025. Výhody, poplatky, výnosy, FAQ."
  >
    <h2 className="text-xl font-semibold mb-3">Proč investovat do evropských ETF?</h2>
    <p>
      Evropské akciové ETF jsou optimální volbou pro investory, kteří chtějí rozložit riziko jednoduchým způsobem do celého regionu mimo USA. Většina těchto fondů nabízí:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>Expozici na přední evropské firmy napříč všemi klíčovými státy i sektory (Německo, Francie, Švýcarsko, UK apod.)</li>
      <li>Větší diverzifikaci vůči měnovému i sektorovému riziku, vyšší váha finančního, spotřebitelského nebo průmyslového sektoru</li>
      <li>Možnost výběru jak akumulačních, tak distribučních tříd pro různou investiční strategii</li>
      <li>Obvykle nižší náklady (TER) oproti některým tematickým či „exotickým“ regionům</li>
      <li>Snadnou dostupnost na hlavních burzách v EUR</li>
    </ul>
    <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 mb-5 rounded">
      <b>Tip:</b> Akcie evropských firem jsou zpravidla levnější dle ukazatele P/E než americké protějšky, což může být výhodné v dobách vyšších sazeb či slabšího dolaru.
    </div>

    <h2 className="text-xl font-semibold mt-8 mb-4">Doporučené ETF na evropské akcie pro rok 2025</h2>
    <p className="mb-3">
      Vybrali jsme nejvýhodnější ETF na region Evropa – podle poplatků, velikosti, likvidity i tradice správce. Klikněte na název pro detailní přehled fondu, rozložení portfolia i výkonnost.
    </p>
    <ul className="space-y-3 mb-8">
      {RECOMMENDED_EU_ETFS.map(etf => (
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

    <h3 className="text-lg font-semibold mb-2">Jak vybíráme nejlepší evropské ETF?</h3>
    <ul className="mb-6 list-disc ml-6">
      <li>
        <b>Náklady fondu (TER):</b> Dáváme přednost ETF s ročním poplatkem pod 0,2&nbsp;%.
      </li>
      <li>
        <b>Velikost a likvidita:</b> Fondy s velkým objemem aktiv jsou bezpečnější z hlediska stability i obchodování.
      </li>
      <li>
        <b>Diverzifikace:</b> Snažíme se o široké pokrytí sektorů i zemí. U Evropy může být důležité zastoupení periferních trhů (Itálie, Skandinávie apod.).
      </li>
      <li>
        <b>Renomé správce:</b> Preferujeme fondy velkých domů jako iShares (BlackRock), Xtrackers, Vanguard, Lyxor, Amundi.
      </li>
      <li>
        <b>Měna fondu:</b> U evropských ETF je výhodné EUR, abyste minimalizovali měnovou konverzi při investování.
      </li>
      <li>
        <b>Dostupnost:</b> Všechna zde doporučená ETF koupíte jednoduše u DEGIRO, XTB i dalších velkých brokerů v ČR.
      </li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Další kvalitní ETF na evropské akcie podle velikosti fondu</h3>
    <p className="mb-3">
      Následující tabulka ukazuje další zajímavé evropské ETF podle celkového objemu spravovaných prostředků (AUM). Můžete je snadno porovnat podle poplatků i dlouhodobé výkonnosti.
    </p>
    <FilteredETFList filter={TABLE_FILTER} />

    <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 my-6 rounded">
      <b>Upozornění:</b> Ani široce diverzifikovaný evropský ETF negarantuje zisk. Záporné výnosy nebo krátkodobé propady jsou běžné, zvláště při negativním vývoji na burzách EU.
    </div>

    <h2 className="text-lg font-semibold mt-10 mb-3">Jak koupit evropský ETF krok za krokem?</h2>
    <ul className="list-decimal ml-6 mb-6">
      <li>Zvažte, jaký podíl vašeho portfolia má mít expozici na Evropu vůči USA či globálním fondům.</li>
      <li>Vyberte konkrétní ETF podle plánu (akumulační/distribuční třída, EUR měna, likvidita).</li>
      <li>Ověřte si TER, historii a velikost fondu i podkladový index.</li>
      <li>Zkontrolujte dostupnost fondu u vašeho brokera.</li>
      <li>Sledujte pravidla prodaně dividend a případné měnové riziko (EUR/CZK).</li>
    </ul>

    <h3 className="text-lg font-semibold mt-8 mb-2">Časté dotazy (FAQ) – evropské ETF</h3>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Je lepší vybrat index MSCI Europe nebo STOXX Europe 600?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Oba pokrývají většinu velkých a středních evropských firem. STOXX 600 má ještě širší diverzifikaci díky zastoupení i menších společností. Výběr záleží na vašich preferencích – oba patří k nejlépe sledovaným indexům.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Jsou evropské ETF méně výnosné než americké?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Dlouhodobě mají evropské akcie nižší růst než americké, výnosy ale mohou být vyšší v období oživení evropské ekonomiky nebo při slabším dolaru. Jsou vhodné jako doplněk většího portfolia.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Existují evropské ETF s vyplácením dividend?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Ano, většina ETF existuje ve dvou variantách – akumulační (dividendy reinvestuje) a distribuční (vyplácí na účet). Sledujte označení „Acc“ nebo „Dist“ v názvu fondu.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">V jaké měně je nejlepší evropské ETF kupovat?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Doporučujeme fondy v EUR – získáte tak přirozené doplnění CZK/EUR portfolia bez dodatečných konverzních nákladů.
      </div>
    </details>
    <details className="mb-3">
      <summary className="font-medium cursor-pointer">Jaké evropské ETF mají nejnižší poplatky?</summary>
      <div className="mt-2 ml-6 text-gray-700">
        Například <Link to="/etf/IE00B4K48X80" className="text-violet-600 underline">iShares Core MSCI Europe</Link> nebo <Link to="/etf/LU0274209237" className="text-violet-600 underline">Xtrackers MSCI Europe</Link> kombinují extrémně nízký TER, velkou likviditu a široké pokrytí.
      </div>
    </details>

    <h3 className="text-xl font-semibold mt-10 mb-4">Závěr – evropské ETF jako součást diverzifikovaného portfolia</h3>
    <p>
      <strong>ETF na evropské akcie</strong> jsou klíčovým stavebním kamenem vyváženého portfolia každého investora. Nabízí stabilitu, sektorovou rozmanitost a měnovou diverzifikaci mimo dolar. Kombinujte je s globálními a americkými fondy a nevsázejte na jednoho koně.
    </p>
    <p className="mt-2 text-gray-600">
      Další tipy najdete v ostatních článcích blogu nebo v hlavním srovnávači ETF na tomto webu.
    </p>
  </BlogArticleLayout>
);

export default NejlepsiETFNaEvropskeAkcie;
