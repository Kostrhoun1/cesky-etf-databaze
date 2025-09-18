import { Broker, ComparisonRow } from '../types/broker';

export const brokers: Broker[] = [
  {
    id: 'degiro',
    name: 'DEGIRO',
    logo: '/lovable-uploads/f9bacf3b-7b11-4c31-917d-e16803dc0887.png',
    description: 'Populární evropský broker s nízkými poplatky a širokou nabídkou ETF. Ideální pro cost-conscious investory.',
    rating: 4.5,
    regulation: 'BaFin (DE), DNB/AFM (NL)',
    protection: '100 000 EUR (DE), 20 000 EUR (investice)',
    etfFee: '1 EUR (Core), 3 EUR (ostatní)',
    managementFee: '0 EUR (roční popl. za burzy 2,5 EUR)',
    fxFee: 'CZK/EUR zdarma, ostatní 0,25%',
    fractional: false,
    czSupport: true,
    czDividends: '35% (možnost vratky 20%)',
    minDeposit: '0 EUR',
    platforms: ['Web', 'Android', 'iOS'],
    markets: ['EU', 'US', 'Asia'],
    etfCount: '3000+',
    languages: ['čeština', 'angličtina', 'němčina'],
    customerSupport: '9-17 (pracovní dny)',
    specialFeatures: ['Core ETF selection', 'Dividend reinvestment', 'Tax reports'],
    pros: [
      'Velmi nízké poplatky na ETF',
      'Bezplatná konverze CZK/EUR',
      'Široká nabídka UCITS ETF',
      'Česká zákaznická podpora'
    ],
    cons: [
      'Omezení kvůli PRIIPS dokumentaci',
      'Nepodporuje frakční ETF',
      'Vyšší zdanění českých dividend'
    ]
  },
  {
    id: 'xtb',
    name: 'XTB',
    logo: '/lovable-uploads/a7162820-5478-4cd8-9bfd-fd04b80a42ff.png',
    description: 'Polský broker s výbornou českou podporou, vzdělávacími materiály a bezplatnými ETF obchody.',
    rating: 4.7,
    regulation: 'CySEC (EU), ČNB (CZ)',
    protection: '100 000 EUR (EU)',
    etfFee: '0% (do 100k EUR/měs.), pak 0,2%',
    managementFee: '0 EUR (možná 10 EUR/měs. za neaktivitu)',
    fxFee: '0,5%',
    fractional: true,
    czSupport: true,
    czDividends: '35%',
    minDeposit: '0 EUR',
    platforms: ['xStation 5', 'Web', 'Android', 'iOS'],
    markets: ['EU', 'US', 'UK'],
    etfCount: '400+',
    languages: ['čeština', 'polština', 'angličtina'],
    customerSupport: '24/5',
    specialFeatures: ['Fractional shares', 'Educational content', 'Real time data'],
    pros: [
      'Bezplatné ETF obchody do 100k EUR',
      'Frakční investování',
      'Výborná česká podpora',
      'Rozsáhlé vzdělávací materiály'
    ],
    cons: [
      'Vyšší poplatek za konverzi měn',
      'Vyšší zdanění českých dividend',
      'Poplatek za neaktivitu'
    ]
  },
  {
    id: 'fio',
    name: 'Fio e-Broker',
    logo: '/lovable-uploads/55aac89b-3834-421c-8689-34fb13fad2b1.png',
    description: 'Český broker s lokální podporou a optimálním zdaněním českých dividend (15%).',
    rating: 4.0,
    regulation: 'ČNB (CZ)',
    protection: '100 000 EUR (CZ)',
    etfFee: '0,29-0,35% (CZ), 7,95-9,95 USD (US)',
    managementFee: '0 Kč',
    fxFee: 'Zdarma (dle kurzu banky)',
    fractional: false,
    czSupport: true,
    czDividends: '15%',
    minDeposit: '0 Kč',
    platforms: ['Web', 'Android', 'iOS'],
    markets: ['CZ', 'EU', 'US'],
    etfCount: '200+',
    languages: ['čeština'],
    customerSupport: '8-18 (pracovní dny)',
    specialFeatures: ['Czech dividend optimization', 'Free currency exchange', 'Local support'],
    pros: [
      'Česká společnost s lokální podporou',
      'Standardní 15% zdanění českých dividend',
      'Bezplatná konverze měn',
      'KID dokumentace v češtině'
    ],
    cons: [
      'Vyšší poplatky za ETF',
      'Technické problémy platformy',
      'Nepodporuje frakční ETF'
    ]
  },
  {
    id: 'trading212',
    name: 'Trading 212',
    logo: '/lovable-uploads/25c6d816-7993-40c3-abe2-e21c45cc239d.png',
    description: 'Zcela bezpoplatkový broker s moderní mobilní aplikací, frakčním investováním a AutoInvest funkcí.',
    rating: 4.2,
    regulation: 'FCA (UK), CySEC (EU), BaFin (DE)',
    protection: '85 000 £ (UK)',
    etfFee: '0%',
    managementFee: '0 EUR',
    fxFee: '0,15% (v aplikaci)',
    fractional: true,
    czSupport: false,
    czDividends: 'Standard (dle typu fondu)',
    minDeposit: '1 EUR',
    platforms: ['Web', 'Android', 'iOS'],
    markets: ['EU', 'US', 'UK'],
    etfCount: '1500+',
    languages: ['angličtina'],
    customerSupport: '24/7 (chat)',
    specialFeatures: ['Pie charts investing', 'Commission-free', 'AutoInvest'],
    pros: [
      'Zcela bezplatné obchodování',
      'Frakční investování od 1 £',
      'Intuitivní mobilní aplikace',
      'Automatizované investování (Pies)'
    ],
    cons: [
      'Omezená česká podpora',
      'Méně pokročilých analytických nástrojů',
      'Závislost na mobilní aplikaci'
    ]
  },
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    logo: '/lovable-uploads/4465126c-b9d7-4fc5-b560-477d3425500d.png',
    description: 'Globální broker s nejširší nabídkou trhů, pokročilými nástroji a velmi konkurenceschopnými poplatky.',
    rating: 4.8,
    regulation: 'CBI (IE), SEC (US), FCA (UK), ČNB (CZ)',
    protection: '100 000 EUR (IE)',
    etfFee: '0 USD (US Lite), 0,0005-0,0035 USD/akcii (US Pro)',
    managementFee: '0 EUR',
    fxFee: '0,2% (min. 2 EUR)',
    fractional: true,
    czSupport: false,
    czDividends: '15%',
    minDeposit: '0 USD (2000 USD pro margin)',
    platforms: ['TWS', 'Web', 'Android', 'iOS', 'Desktop'],
    markets: ['Global - 150+ trhů'],
    etfCount: '7000+',
    languages: ['angličtina', 'němčina', 'francouzština'],
    customerSupport: '24/7',
    specialFeatures: ['Advanced analytics', 'Global markets', 'Professional tools'],
    pros: [
      'Nejširší nabídka trhů a ETF',
      'Velmi nízké poplatky',
      'Pokročilé analytické nástroje',
      'Standardní zdanění českých dividend'
    ],
    cons: [
      'Pouze anglická podpora',
      'Složitá platforma pro začátečníky',
      'Vyžaduje vyšší minimální vklad'
    ]
  },
  {
    id: 'portu',
    name: 'Portu',
    logo: '/portu-logo.svg',
    description: 'Český robo-advisor zaměřený na automatizované investování do ETF portfolií s aktivním managementem.',
    rating: 4.1,
    regulation: 'ČNB (CZ)',
    protection: '100 000 EUR (CZ)',
    etfFee: '0,85% ročně (all-in fee)',
    managementFee: '0,85% ročně (zahrnuje vše)',
    fxFee: 'Zahrnut v poplatku',
    fractional: true,
    czSupport: true,
    czDividends: '15%',
    minDeposit: '1 000 Kč',
    platforms: ['Web', 'Android', 'iOS'],
    markets: ['Globální ETF portfolia'],
    etfCount: 'Předvybrané ETF portfolia',
    languages: ['čeština'],
    customerSupport: '9-17 (pracovní dny)',
    specialFeatures: ['Robo-advisor', 'Automatické rebalancing', 'Předvybraná portfolia'],
    pros: [
      'Plně automatizované investování',
      'Česká společnost s lokální podporou',
      'Automatické rebalancing portfolia',
      'Vhodné pro úplné začátečníky'
    ],
    cons: [
      'Vyšší celkové náklady (0,85% ročně)',
      'Omezený výběr investičních strategií',
      'Nelze vybírat jednotlivé ETF',
      'Vyšší minimální vklad'
    ]
  }
];

export const comparisonData: ComparisonRow[] = [
  { feature: 'Regulace (hlavní)', degiro: 'BaFin (DE), DNB/AFM (NL)', xtb: 'CySEC (EU), ČNB (CZ)', fio: 'ČNB (CZ)', trading212: 'FCA (UK), CySEC (EU)', ibkr: 'CBI (IE), SEC (US)', portu: 'ČNB (CZ)' },
  { feature: 'Ochrana hotovosti', degiro: '100 000 EUR (DE)', xtb: '100 000 EUR (EU)', fio: '100 000 EUR (CZ)', trading212: '85 000 £ (UK)', ibkr: '100 000 EUR (IE)', portu: '100 000 EUR (CZ)' },
  { feature: 'Poplatek nákup ETF', degiro: '1 EUR (Core), 3 EUR (ostatní)', xtb: '0% (do 100k EUR/měs.)', fio: '0,29-0,35% (CZ)', trading212: '0% (bez limitu)', ibkr: '0 USD (US Lite)', portu: '0,85% ročně (all-in)' },
  { feature: 'Konverze měn', degiro: 'CZK/EUR zdarma, ostatní 0,25%', xtb: '0,5%', fio: 'Zdarma (dle kurzu banky)', trading212: '0,15%', ibkr: '0,2% (min. 2 EUR)', portu: 'Zahrnut v poplatku' },
  { feature: 'Frakční ETF', degiro: 'Ne', xtb: 'Ano', fio: 'Ne', trading212: 'Ano (od 1 EUR)', ibkr: 'Ano', portu: 'Ano (automaticky)' },
  { feature: 'Česká podpora', degiro: 'Částečně', xtb: 'Ano (24/5)', fio: 'Ano (8-18)', trading212: 'Ne (pouze AJ)', ibkr: 'Ne', portu: 'Ano (9-17)' },
  { feature: 'Zdanění CZ dividend', degiro: '35% (vratka možná)', xtb: '35%', fio: '15%', trading212: 'Nevztahuje se', ibkr: '15%', portu: '15%' },
  { feature: 'AutoInvest/DCA', degiro: 'Ne', xtb: 'Investiční plány', fio: 'Ne', trading212: 'Pies & AutoInvest', ibkr: 'Omezené', portu: 'Plně automatické' },
  { feature: 'Min. vklad', degiro: '0 EUR', xtb: '0 EUR', fio: '0 Kč', trading212: '1 EUR', ibkr: '0 USD', portu: '1 000 Kč' }
];
