# 🎨 ETF Průvodce - Design System & Grafický manuál

## 📋 Základní pravidla
Tento design system je vytvořen na základě homepage (`/src/components/home/`) a FIRE kalkulačky (`/src/components/tools/`) a zajišťuje konzistentní vzhled napříč celou aplikací.

## 🎨 Barevné schéma

### Hlavní barvy (violet/purple theme)
```css
/* Primární fialová */
- bg-violet-600, hover:bg-violet-700 (tlačítka)
- bg-violet-100, hover:bg-violet-200 (pozadí ikon)
- text-violet-700 (ikony)

/* Sekundární emerald/teal */  
- bg-gradient-to-r from-emerald-500 to-teal-600 (CTA tlačítka)
- hover:from-emerald-600 hover:to-teal-700

/* Tmavé pozadí (hero sekce) */
- bg-gray-900, bg-slate-900, bg-slate-800
- bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800
```

### Stavové barvy
```css
/* Úspěch */
- text-emerald-400, text-emerald-700
- bg-emerald-100, bg-emerald-50

/* Varování */  
- text-red-700, text-red-400
- bg-red-100, bg-red-50

/* Info */
- text-slate-300, text-slate-400 
- bg-violet-900/30 (overlay)
```

## 🏗️ Komponenty

### 1. Hero Sekce Pattern
**Kdy použít:** Pro hlavní výsledky, důležité informace
```tsx
<div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden rounded-2xl card-hover">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/30 to-transparent"></div>
  <div className="relative z-10 p-8 text-center">
    {/* Obsah s animacemi */}
    <div className="animate-fade-in [animation-delay:0.2s]">
      {/* Ikona + nadpis */}
    </div>
    <div className="animate-fade-in [animation-delay:0.4s]">
      {/* Hlavní hodnoty */}
    </div>
  </div>
</div>
```

### 2. Card Komponenty (USP styl)
**Kdy použít:** Pro detailní informace, srovnání, metriky
```tsx
<Card className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white">
  <div className="p-6 text-center">
    <div className="mb-4 flex items-center justify-center rounded-full bg-violet-100 w-12 h-12 mx-auto group-hover:bg-violet-200 transition-colors hover-scale">
      <Icon className="h-6 w-6 text-violet-700" />
    </div>
    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-violet-800 transition-colors">Nadpis</h3>
    {/* Obsah */}
  </div>
</Card>
```

### 3. Pokročilé Karty (FIRE kalkulačka styl)
**Kdy použít:** Pro komplexní nástroje, grafy, detailní výsledky
```tsx
<div className="border-transparent shadow-none hover:shadow-xl transition-all duration-300 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.2s]">
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center justify-center rounded-full bg-violet-100 w-12 h-12 group-hover:bg-violet-200 transition-colors hover-scale">
      <span className="text-2xl">🎯</span>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-violet-800 transition-colors">
      Nadpis sekce
    </h2>
  </div>
  {/* Obsah */}
</div>
```

### 4. Formulářové Karty (Input sekce)
**Kdy použít:** Pro formuláře, nastavení, vstupy uživatele
```tsx
<div className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white rounded-lg p-6 card-hover animate-fade-in [animation-delay:0.2s]">
  <div className="flex items-center gap-3 mb-4">
    <div className="flex items-center justify-center rounded-full bg-violet-100 w-10 h-10 group-hover:bg-violet-200 transition-colors hover-scale">
      <Icon className="h-5 w-5 text-violet-700" />
    </div>
    <h3 className="text-base font-semibold text-gray-900 group-hover:text-violet-800 transition-colors">Nadpis formuláře</h3>
  </div>
  {/* Formulářové prvky */}
</div>
```

### 5. Informační Sekce Pattern
**Kdy použít:** Pro vzdělávací obsah, vysvětlení, dokumentaci
```tsx
<div className="mt-16 border-transparent shadow-none hover:shadow-md transition-shadow duration-200 bg-white rounded-2xl p-8 mb-12">
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center justify-center rounded-full bg-violet-100 w-10 h-10">
      <span className="text-xl">📚</span>
    </div>
    <h2 className="text-2xl font-bold text-gray-900">Informační nadpis</h2>
  </div>
  {/* Obsah */}
</div>
```

### 6. CTA Tlačítka
```tsx
/* Primární violet */
<Button className="hover-scale bg-violet-600 hover:bg-violet-700 text-white">

/* Sekundární outline */  
<Button variant="outline" className="border-white/70 text-gray-900 bg-white hover:bg-gray-100 hover:text-gray-900 hover-scale">

/* Gradient CTA */
<Button className="hover-scale bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold">
```

### 7. Úspěšné stavy (emerald gradient)
**Kdy použít:** Pro pozitivní výsledky, splněné cíle
```tsx
<div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
  <div className="relative z-10 p-6">
    {/* Obsah */}
  </div>
</div>
```

### 8. Grafy a Vizualizace
**Kdy použít:** Pro Recharts komponenty, analytické nástroje
```tsx
<div className="border-transparent shadow-none hover:shadow-xl transition-all duration-300 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.4s]">
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center justify-center rounded-full bg-emerald-100 w-12 h-12 group-hover:bg-emerald-200 transition-colors hover-scale">
      <span className="text-2xl">📈</span>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
      Název grafu
    </h2>
  </div>
  <div className="rounded-xl p-4">
    <ResponsiveContainer width="100%" height={400}>
      {/* Graf komponenta */}
    </ResponsiveContainer>
  </div>
</div>
```

## 🔤 Typography

### Nadpisy
```css
/* Hero nadpis */
text-4xl md:text-6xl font-bold tracking-tight

/* Sekce nadpis */  
text-2xl font-bold text-gray-800

/* Card nadpis */
text-base font-semibold text-gray-900

/* Podnádpis */
text-lg font-semibold text-gray-900
```

### Texty
```css
/* Hero popis */
text-xl md:text-2xl text-slate-300

/* Běžný text */
text-gray-600, text-gray-700

/* Malý text */
text-xs text-gray-500

/* White text (na tmavém pozadí) */
text-white, text-slate-300, text-slate-400
```

## 📏 Spacing & Layout

### Padding
```css
/* Hero sekce */ 
p-8, py-20 sm:py-24

/* Card komponenty */
p-6 (vnitřní obsah)
py-5 px-3 (kompaktní verze)

/* Sekce */
py-8 (běžné sekce)
```

### Gaps
```css
/* Grid layouts */
gap-4 (běžný)
gap-6 (větší)
gap-8 (velký)

/* Flex layouts */  
gap-2, gap-3, gap-4
```

### Margins
```css
/* Sekce mezery */
space-y-6, space-y-8

/* Elementy */
mb-2, mb-4, mb-6
```

## ✨ Animace & Efekty

### Hover efekty
```css
/* Card hover - základní */
hover:shadow-md transition-shadow duration-200

/* Card hover - pokročilý */
hover:shadow-xl transition-all duration-300 card-hover

/* Tlačítka hover */
hover-scale (vlastní třída)

/* Ikony hover */
group-hover:bg-violet-200 transition-colors hover-scale
```

### Stínování
```css
/* Základní karty */
border-transparent shadow-none hover:shadow-md transition-shadow duration-200

/* Pokročilé karty (FIRE kalkulačka) */
border-transparent shadow-none hover:shadow-xl transition-all duration-300 card-hover

/* Bez stínů */
border-transparent shadow-none
```

### Fade-in animace
```css
/* Staggered animations */
animate-fade-in [animation-delay:0.2s]
animate-fade-in [animation-delay:0.4s]
animate-fade-in [animation-delay:0.6s]
animate-fade-in [animation-delay:0.8s]
animate-fade-in [animation-delay:1.0s]
```

## 🎯 Příklady použití

### ✅ SPRÁVNĚ - FIRE kalkulačka
```tsx
// Hero sekce s hlavními výsledky
<div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden rounded-2xl">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/30 to-transparent"></div>
  <div className="relative z-10 p-8 text-center">
    <h2 className="text-2xl font-bold text-white mb-4">FIRE je dosažitelný</h2>
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="text-slate-300 text-sm mb-2">FIRE věk</p>
        <p className="text-4xl font-bold text-violet-400">54</p>
        <p className="text-slate-400 text-sm">let</p>
      </div>
    </div>
  </div>
</div>

// Card komponenty pro detaily
<Card className="border-transparent shadow-none hover:shadow-md transition-shadow duration-200 group bg-white">
  <div className="p-6 text-center">
    <div className="mb-4 flex items-center justify-center rounded-full bg-emerald-100 w-12 h-12 mx-auto group-hover:bg-emerald-200 transition-colors">
      <TrendingUp className="h-6 w-6 text-emerald-700" />
    </div>
    <h3 className="text-base font-semibold text-gray-900 mb-2">Optimistický scénář</h3>
    // obsah...
  </div>
</Card>
```

### ❌ ŠPATNĚ - Staré řešení
```tsx
// Nevhodné barvy a styl
<Card className="bg-blue-50 border-blue-200">
<div className="bg-green-50 p-3 rounded border border-green-200">
<p className="text-xs font-medium text-green-700 mb-1">📈 Optimistický</p>
```

## 🔧 Implementační tipy

1. **Vždy začni s hero sekcí** pro hlavní výsledky
2. **Použij správný typ karty** podle obsahu:
   - **USP karty** pro jednoduché informace
   - **Pokročilé karty** pro komplexní nástroje
   - **Formulářové karty** pro vstupy
   - **Informační sekce** pro vzdělávací obsah
3. **Držej se violet/emerald barevného schématu**
4. **Používej stejné spacing patterns** (p-6, p-8, gap-4, atd.)
5. **Přidej hover efekty a animace** na všechny interaktivní elementy
6. **Konzistentní typography** - font-bold pro důležité, text-gray-600 pro běžný text
7. **Staggered animace** - používej animation-delay pro postupné zobrazování
8. **Správné mezery** - mt-16 mezi hlavními sekcemi pro oddělení

## 📱 Responzivita

### Breakpointy
```css
/* Mobile first */
grid-cols-1 md:grid-cols-3
text-xl md:text-2xl  
p-4 md:p-6
gap-4 md:gap-6
```

### Grid patterns
```css
/* Homepage USP pattern */
grid-cols-1 sm:grid-cols-2 md:grid-cols-4

/* Card layouts */
grid-cols-1 md:grid-cols-3

/* Hero layouts */  
grid-cols-1 md:grid-cols-2
```

## 📊 Recharts Styling Guide

### Graf margins a legenda
```css
/* Základní margins pro grafy */
margin={{ top: 10, right: 20, left: 100, bottom: 60 }}

/* Legenda nastavení */
<Legend 
  wrapperStyle={{ paddingTop: '25px', fontSize: '13px', fontWeight: '500' }}
  iconType="circle"
  verticalAlign="bottom"
  height={40}
/>

/* ResponsiveContainer */
<ResponsiveContainer width="100%" height={400}>
```

### Tooltip styling
```tsx
<Tooltip 
  contentStyle={{
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    fontSize: '14px',
    padding: '12px 16px'
  }}
  labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
/>
```

### Osy a mřížka styling
```tsx
/* X osa */
<XAxis 
  dataKey="age" 
  label={{ value: 'Věk', position: 'insideBottom', offset: -10, style: { fontSize: '14px', fontWeight: 'bold', fill: '#475569' } }}
  tick={{ fontSize: 12, fill: '#64748b' }}
  axisLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
  tickLine={{ stroke: '#cbd5e1' }}
/>

/* Y osa */
<YAxis 
  tick={{ fontSize: 12, fill: '#64748b' }}
  axisLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
  tickLine={{ stroke: '#cbd5e1' }}
/>

/* Mřížka */
<CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
```

### Gradient definice
```tsx
<defs>
  <linearGradient id="optimisticGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
  </linearGradient>
  <linearGradient id="realisticGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
  </linearGradient>
</defs>
```

### Interaktivní LineChart komponenty
**Kdy použít:** Pro optimalizační grafy, trendy, simulace
```tsx
<div className="border-transparent shadow-none hover:shadow-xl transition-all duration-300 group bg-white rounded-2xl p-8 card-hover animate-fade-in [animation-delay:0.4s]">
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center justify-center rounded-full bg-emerald-100 w-12 h-12 group-hover:bg-emerald-200 transition-colors hover-scale">
      <span className="text-2xl">📈</span>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
      Interaktivní optimalizace
    </h2>
  </div>
  <div className="rounded-xl p-4">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
        <XAxis 
          dataKey="savings" 
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            fontSize: '14px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="fireAge" 
          stroke="#10b981" 
          strokeWidth={3}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
```

---

**🎯 Cíl:** Každá stránka by měla vypadat jako součást jedné konzistentní aplikace používající tento design system.

## 🚀 Quick Start Checklist

Pro novou stránku/komponentu zkontroluj:
- [ ] Použil jsi správný typ karty podle obsahu?
- [ ] Má každá interaktivní karta hover efekty?
- [ ] Používáš violet/emerald barevné schéma?
- [ ] Máš staggered animace s animation-delay?
- [ ] Je mezi sekcemi dostatečná mezera (mt-16)?
- [ ] Ikony jsou v kruhu s hover efekty?
- [ ] Grafy mají správné margins a legendu?
- [ ] Tooltip má moderní styling?
- [ ] Interaktivní LineChart grafy mají emerald barvy?
- [ ] Používáš height={300} pro optimalizační grafy?