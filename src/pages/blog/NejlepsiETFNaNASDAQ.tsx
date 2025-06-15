
import React from "react";
import { Link } from "react-router-dom";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, AlertTriangle, CheckCircle } from "lucide-react";

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
    <div className="grid lg:grid-cols-3 gap-8 mb-8">
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6 text-center">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-green-800 mb-2">Vysoké výnosy</h3>
          <p className="text-sm text-green-700">Průměrně 15% ročně za poslední dekádu</p>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-blue-800 mb-2">Nízké poplatky</h3>
          <p className="text-sm text-blue-700">TER často pod 0,2% ročně</p>
        </CardContent>
      </Card>
      
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-purple-800 mb-2">Snadná dostupnost</h3>
          <p className="text-sm text-purple-700">U všech hlavních brokerů</p>
        </CardContent>
      </Card>
    </div>

    <h2>Proč zvolit NASDAQ ETF?</h2>
    <p>
      Index NASDAQ 100 sdružuje 100 největších nefinančních společností obchodovaných na americkém trhu NASDAQ, s velkým důrazem na technologie, inovace a růst.
      Investice do ETF kopírujících NASDAQ přináší:
    </p>
    <ul>
      <li>Expozici na nejrychleji rostoucí technologické a inovativní firmy (Apple, Microsoft, Nvidia, Amazon, Meta aj.)</li>
      <li>Dlouhodobě vysoké historické výnosy (často nad <strong>15&nbsp;% ročně</strong> za poslední dekádu)</li>
      <li>Možnost diverzifikace s <strong>nízkými poplatky (TER často pod 0,2&nbsp;%)</strong></li>
      <li>Snadnou dostupnost pro evropské investory a možnost akumulačních (bez vyplácení dividend) i distribučích tříd</li>
    </ul>

    <Card className="bg-blue-50 border-l-4 border-blue-400 my-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800 mb-1">Tip pro investory</p>
            <p className="text-blue-700">NASDAQ ETF jsou vhodné pro dlouhodobé investory s vyšší tolerancí k volatilitě, kteří chtějí mít výraznou část portfolia v amerických technologiích.</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <h2>Doporučené ETF na NASDAQ</h2>
    <p>
      Vybrali jsme nejsilnější ETF na index NASDAQ 100, které splňují nízké poplatky, velikost fondu a dostupnost u hlavních brokerů. Kliknutím na název zjistíte detailní informace, složení portfolia, poplatky a výkon.
    </p>
    
    <div className="space-y-4 my-8">
      {RECOMMENDED_NASDAQ_ETFS.map((etf, index) => (
        <Card key={etf.isin} className="hover:shadow-lg transition-shadow group border-l-4 border-violet-400">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-violet-100 text-violet-800 text-xs font-bold px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                  <Link
                    to={`/etf/${etf.isin}`}
                    className="text-lg font-semibold text-violet-700 hover:text-violet-900 transition-colors"
                  >
                    {etf.name}
                  </Link>
                </div>
                <p className="text-xs text-gray-500 mb-3">ISIN: {etf.isin}</p>
                <p className="text-gray-700">{etf.reason}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <h3>Výběrová kritéria nejlepších NASDAQ ETF</h3>
    <div className="grid md:grid-cols-2 gap-4 my-6">
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2">📊 Nízké poplatky (TER)</h4>
          <p className="text-sm text-gray-700">Preferujeme ETF s celkovými ročními náklady pod 0,2%</p>
        </CardContent>
      </Card>
      
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2">💰 Objem majetku</h4>
          <p className="text-sm text-gray-700">Vyšší likvidita a menší riziko ukončení fondu</p>
        </CardContent>
      </Card>
      
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2">🏢 Kvalitní správce</h4>
          <p className="text-sm text-gray-700">iShares, Invesco, Amundi - prověření správci</p>
        </CardContent>
      </Card>
      
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2">🇨🇿 Dostupnost v ČR</h4>
          <p className="text-sm text-gray-700">Jednoduše dostupné přes DEGIRO, XTB, FIO</p>
        </CardContent>
      </Card>
    </div>

    <h3>Přehled dalších ETF zaměřených na NASDAQ</h3>
    <p>
      V následující tabulce najdete další kvalitní ETF zaměřená na index NASDAQ, seřazeno dle výnosu za posledních 5 let. Můžete je srovnat podle správce, poplatků i velikosti.
    </p>
    <FilteredETFList filter={NASDAQ_ETF_TABLE_FILTER} />

    <Card className="bg-yellow-50 border-l-4 border-yellow-400 my-8">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-yellow-800 mb-1">Upozornění</p>
            <p className="text-yellow-700">Investování do akciových ETF na NASDAQ znamená výraznější kolísání hodnoty v krátkodobém horizontu. Minulé výnosy negarantují budoucí.</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <h2>Jak koupit ETF na NASDAQ krok za krokem?</h2>
    <div className="space-y-4 my-6">
      {[
        "Stanovte si cíle a poměr akciové složky v portfoliu, například NASDAQ vs. S&P 500",
        "Vyberte konkrétní ETF, nejlépe s nízkým TER a dostatečně velkou historií",
        "Ověřte si dostupnost ETF u vašeho brokera (DEGIRO, XTB, FIO atd.)",
        "Při nákupu zadávejte pokyn přes ISIN kód fondu pro zamezení chyb",
        "Zvažte pravidelné investování – průměrování ceny sníží dopad volatility trhu"
      ].map((step, index) => (
        <Card key={index} className="border-gray-200">
          <CardContent className="p-4 flex items-start gap-4">
            <span className="bg-violet-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              {index + 1}
            </span>
            <p className="text-gray-700">{step}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <h3>Časté dotazy (FAQ) – ETF na NASDAQ</h3>
    <div className="space-y-4 my-6">
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Je lepší investovat do NASDAQ nebo S&P500?</h4>
          <p className="text-gray-700">Index S&P500 je defenzivnější, obsahuje tradiční sektory i technologie, NASDAQ 100 je více růstový a volatilní. Doporučujeme kombinaci dle osobních preferencí.</p>
        </CardContent>
      </Card>
      
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Jaké ETF na NASDAQ mají nejnižší poplatky?</h4>
          <p className="text-gray-700">K nejlevnějším patří <Link to="/etf/IE00B53SZB19" className="text-violet-600 hover:text-violet-700 font-medium">iShares NASDAQ 100</Link> nebo <Link to="/etf/LU1681038243" className="text-violet-600 hover:text-violet-700 font-medium">Amundi NASDAQ-100</Link>, oba s TER kolem 0,20 %.</p>
        </CardContent>
      </Card>
      
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">V jaké měně nakupovat NASDAQ ETF?</h4>
          <p className="text-gray-700">Většina evropských NASDAQ ETF je v EUR i USD, dlouhodobě je rozdíl minimální, důležitější je poplatek TER, likvidita a správa fondu.</p>
        </CardContent>
      </Card>
      
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Vyplácí NASDAQ ETF dividendy?</h4>
          <p className="text-gray-700">Najdete jak akumulační, tak distribučí třídy. Většina technologických firem žádné významné dividendy nevyplácí, zaměřují se na růst.</p>
        </CardContent>
      </Card>
    </div>

    <h3>Závěr – NASDAQ v portfoliu dlouhodobého investora</h3>
    <p>
      <strong>NASDAQ ETF</strong> poskytují přístup ke špičkovým americkým technologickým firmám a jsou vhodné jako dynamická složka moderního akciového portfolia. Při správné kombinaci mohou zásadně zvýšit potenciál celkových výnosů vaší investice.
    </p>
    <p className="text-gray-600 mt-4">
      Další investiční tipy najdete v ostatních článcích našeho blogu nebo v hlavním srovnávači ETF na této stránce!
    </p>
  </BlogArticleLayout>
);

export default NejlepsiETFNaNASDAQ;
