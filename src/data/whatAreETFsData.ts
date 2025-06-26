
import { TrendingUp, Target, Users, BookOpen, Lightbulb, Scale, Shield, Zap, CheckCircle, XCircle, BarChart, DollarSign, ShoppingCart } from 'lucide-react';

export const recommendedVideos = [
  {
    title: "Warren Buffett vysvětluje indexové fondy",
    description: "Legendární investor Warren Buffett vysvětluje, proč doporučuje indexové fondy běžným investorům a jak mohou být lepší volbou než aktivně spravované fondy.",
    videoUrl: "https://youtu.be/ZXISzZlVeLg",
    author: "Warren Buffett"
  },
  {
    title: "Buffettova rada pro začínající investory",
    description: "Warren Buffett sdílí své nejlepší rady pro začínající investory, včetně důležitosti dlouhodobého investování a diverzifikace prostřednictvím indexových fondů.",
    videoUrl: "https://youtu.be/paruIsAkK-0",
    author: "Warren Buffett"
  }
];

export const etfAdvantages = [
  { title: "Nízké náklady", desc: "Výrazně nižší poplatky (TER) díky pasivní správě." },
  { title: "Okamžitá diverzifikace", desc: "Jedním nákupem investujete do stovek firem." },
  { title: "Vysoká likvidita", desc: "Snadný nákup a prodej na burze kdykoliv během dne." },
  { title: "Transparentnost", desc: "Přesné složení fondu je denně veřejné." },
  { title: "Daňová efektivita", desc: "Po 3 letech držení je zisk osvobozen od daně." }
];

export const etfDisadvantages = [
  { title: "Tržní riziko", desc: "Hodnota investice se hýbe s celým trhem." },
  { title: "Spread (rozpětí)", desc: "Malý rozdíl mezi nákupní a prodejní cenou." },
  { title: "Tracking Error", desc: "Drobná odchylka od výkonnosti indexu." },
  { title: "Riziko protistrany", desc: "Malé riziko u syntetických ETF (swap)." }
];

export const investmentSteps = [
  { 
    title: "Stanovte si cíl a strategii", 
    description: "Určete si, na jak dlouho chcete investovat (investiční horizont) a jaké riziko jste ochotni podstoupit.",
    icon: Target,
    color: "bg-blue-500"
  },
  { 
    title: "Vyberte si brokera", 
    description: "Založte si účet u brokera jako XTB, Trading 212 nebo Portu. Srovnejte poplatky.",
    icon: Users,
    color: "bg-green-500"
  },
  { 
    title: "Vyberte konkrétní ETF", 
    description: "Použijte náš srovnávač k nalezení fondu, který odpovídá vaší strategii. Sledujte TER, domicil a velikost fondu.",
    icon: BarChart,
    color: "bg-purple-500"
  },
  { 
    title: "Proveďte nákup", 
    description: "Pošlete peníze na brokerský účet a zadejte pokyn k nákupu. Investujte jednorázově nebo pravidelně (DCA).",
    icon: DollarSign,
    color: "bg-orange-500"
  },
  { 
    title: "Držte a kontrolujte", 
    description: "Investování do ETF je maraton. Kontrolujte portfolio 1-2x ročně a držte se své strategie.",
    icon: TrendingUp,
    color: "bg-red-500"
  }
];

export const brokers = [
  { name: "XTB", desc: "česká pobočka, snadné ověření totožnosti, nákup ETF bez poplatků (na hlavní evropské burzy), jednoduché rozhraní.", color: "border-blue-200 bg-blue-50" },
  { name: "Trading 212", desc: "intuitivní aplikace, široká nabídka evropských ETF, možnost nakoupit i frakční podíly.", color: "border-green-200 bg-green-50" },
  { name: "DEGIRO", desc: "dlouhodobě populární volba v Evropě, velmi nízké poplatky, široká nabídka ETF (i některé bez poplatků).", color: "border-purple-200 bg-purple-50" },
  { name: "Portu", desc: "vhodné pro úplné začátečníky, nabízí automatizované portfolia složená z ETF.", color: "border-orange-200 bg-orange-50" },
  { name: "Interactive Brokers", desc: "vhodné pro pokročilejší investory a spravování větších portfolií.", color: "border-red-200 bg-red-50" }
];

export const faqItems = [
  {
    question: "Co znamená zkratka UCITS?",
    answer: "UCITS je regulační rámec EU, který zajišťuje vysokou ochranu investorů. ETF s označením UCITS splňují přísné standardy, a proto jsou pro evropské investory doporučenou volbou."
  },
  {
    question: "Jaký je rozdíl mezi ETF a akcií?",
    answer: "Akcie je podíl v jedné firmě. ETF je koš mnoha akcií (nebo jiných aktiv). Nákupem ETF sázíte na úspěch celého trhu nebo sektoru, což je méně rizikové."
  },
  {
    question: "Jaký je rozdíl mezi ETF a podílovým fondem?",
    answer: "ETF mají typicky nižší poplatky a obchodují se na burze jako akcie. Klasické podílové fondy jsou často dražší a méně flexibilní při obchodování."
  },
  {
    question: "Kolik peněz potřebuji, abych mohl začít?",
    answer: "Díky moderním brokerům můžete začít investovat do ETF i s velmi malými částkami, často již od několika stovek korun, díky možnosti nákupu frakčních podílů."
  },
  {
    question: "Je investování do ETF bezpečné?",
    answer: "Každá investice nese riziko. Bezpečnost ETF spočívá v jejich silné regulaci (zejména UCITS) a široké diverzifikaci. Váš majetek je navíc oddělen od majetku emitenta."
  }
];
