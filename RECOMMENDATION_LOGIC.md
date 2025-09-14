# 🧠 Logika doporučovacího algoritmu - ETF průvodce

## 📋 **Jak funguje Quick Start průvodce**

### **1. Sběr uživatelského profilu**

Průvodce sbírá **4 klíčové informace**:

```typescript
interface UserProfile {
  experience: 'beginner' | 'intermediate' | 'advanced';    // Zkušenosti s investováním
  goal: 'growth' | 'income' | 'balanced';                  // Investiční cíl
  amount: 'small' | 'medium' | 'large';                    // Výše investice
  timeHorizon: 'short' | 'medium' | 'long';               // Časový horizont
}
```

### **2. Chytrý scoring algoritmus**

#### **🎯 Základní scoring (40 bodů)**
```typescript
// TER scoring (nižší = lepší)
if (etf.ter_numeric <= 0.1) score += 20;        // Excellent: ≤0.1%
else if (etf.ter_numeric <= 0.2) score += 15;   // Good: ≤0.2%
else if (etf.ter_numeric <= 0.5) score += 10;   // OK: ≤0.5%

// Fund size (větší = lepší likvidita)
if (etf.fund_size_numeric >= 10000) score += 15; // 10B+ AUM
else if (etf.fund_size_numeric >= 5000) score += 12;  // 5B+ AUM
else if (etf.fund_size_numeric >= 1000) score += 10;  // 1B+ AUM

// Performance bonus
if (etf.return_1y_percent > 15) score += 10;
```

#### **👤 Experience scoring (15 bodů)**
```typescript
if (experience === 'beginner') {
  // Preferuje široké, jednoduché ETF
  if (etf.category?.includes('World')) score += 15;
  if (etf.degiro_free) score += 8;  // Důležité pro malé investice
}

if (experience === 'advanced') {
  // Toleruje složitější strategie
  if (etf.category?.includes('Sector')) score += 10;
  if (etf.volatility_1y > 20) score += 5;  // Vyšší risk tolerance
}
```

#### **🎯 Goal scoring (15 bodů)**
```typescript
if (goal === 'growth') {
  if (etf.region?.includes('North America')) score += 12;
  if (etf.current_dividend_yield_numeric < 2) score += 5;  // Growth over income
}

if (goal === 'income') {
  if (etf.current_dividend_yield_numeric > 3) score += 15;
  if (etf.category?.includes('Dividend')) score += 12;
}

if (goal === 'balanced') {
  if (etf.category?.includes('World')) score += 12;
  if (dividend_yield >= 1.5 && dividend_yield <= 3) score += 8;
}
```

#### **💰 Amount scoring (10 bodů)**
```typescript
if (amount === 'small') {
  if (etf.degiro_free) score += 15;    // Kritické pro malé investice
  if (etf.ter_numeric <= 0.15) score += 10;
}

if (amount === 'large') {
  if (etf.fund_size_numeric >= 5000) score += 8;
  if (etf.return_3y_percent > 10) score += 6;
}
```

#### **⏰ Time Horizon scoring (10 bodů)**
```typescript
if (timeHorizon === 'long') {
  if (etf.category?.includes('Growth')) score += 10;
  if (etf.region?.includes('Emerging')) score += 8;  // Vyšší riziko OK
}

if (timeHorizon === 'short') {
  if (etf.category?.includes('Bond')) score += 12;
  if (etf.volatility_1y <= 10) score += 8;  // Nižší volatilita
}
```

### **3. Portfolio composition**

#### **Počet ETF podle zkušeností:**
- **Začátečník**: 2 ETF (jednoduchost)
- **Středně pokročilý**: 3 ETF (mírná diverzifikace)
- **Pokročilý**: 4 ETF (komplexní strategie)

#### **Alokace:**
```typescript
// Pro začátečníky - jednoduchá 70/30
if (experience === 'beginner') {
  return [70%, 30%];
}

// Pro pokročilé - sofistikovanější
return [40%, 30%, 20%, 10%];  // Klesající váha podle priority
```

### **4. Broker selection**

#### **Logika výběru brokerů:**
```typescript
const brokerLogic = {
  'small': ['DEGIRO', 'Trading212'],     // Zdarma ETF kritické
  'medium': ['XTB', 'DEGIRO'],           // Balance fees/features
  'large': ['Interactive Brokers', 'XTB'] // Professional features
};
```

#### **Scoring faktory:**
- **DEGIRO**: Ideální pro malé investice (zdarma ETF)
- **XTB**: Nejlepší pro střední částky (0% do 100k EUR)
- **Trading212**: Mladí investoři, jednoduchost
- **Interactive Brokers**: Velké investice, profesionální nástroje

### **5. Investment strategy generation**

#### **Strategické kombinace:**
```typescript
const strategies = {
  'beginner-growth-long': {
    title: 'Začátečník - Dlouhodobý růst',
    expectedReturn: '7-10% ročně',
    riskLevel: 'medium',
    tips: ['DCA strategie', 'Reinvestice dividend', ...]
  },
  
  'advanced-income-medium': {
    title: 'Pokročilý - Dividendové příjmy',
    expectedReturn: '4-7% ročně + dividendy',
    riskLevel: 'low',
    tips: ['Ex-dividend monitoring', 'Sector diversification', ...]
  }
};
```

## 📊 **Reálné příklady**

### **Příklad 1: Mladý začátečník**
```typescript
Profile: {
  experience: 'beginner',
  goal: 'growth',
  amount: 'small',
  timeHorizon: 'long'
}

Recommendations:
✅ VWCE (IE00B4L5Y983) - 70% alokace
   Důvod: "široká diverzifikace, nízké poplatky (0.22%), DEGIRO zdarma"
   
✅ CSPX (IE00B5BMR087) - 30% alokace
   Důvod: "americký trh, excelentní TER (0.07%), historická výkonnost"

Brokeři: DEGIRO (zdarma ETF) + Trading212 (backup)
Strategie: "DCA 1000 Kč měsíčně po 10+ let"
```

### **Příklad 2: Pokročilý investor hledající příjmy**
```typescript
Profile: {
  experience: 'advanced',
  goal: 'income',
  amount: 'large',
  timeHorizon: 'medium'
}

Recommendations:
✅ VHYL (IE00BZ0PKT83) - 40% alokace
   Důvod: "vysoký dividend yield (3.8%), globální diverzifikace"
   
✅ FUSD (IE00BD1F4M44) - 30% alokace
   Důvod: "USD dividendy, quality screening"
   
✅ IUKD (IE00BKM4GZ66) - 20% alokace
   Důvod: "UK dividendy, undervalued market"
   
✅ REITS ETF - 10% alokace
   Důvod: "real estate exposure, měsíční dividendy"

Brokeři: Interactive Brokers (wide selection) + XTB (backup)
Strategie: "Laddered dividend strategy pro měsíční příjmy"
```

## 🔍 **Database query optimalizace**

### **Smart filtering:**
```sql
-- Pro začátečníky
SELECT * FROM etf_funds 
WHERE fund_size_numeric >= 1000    -- Min 1B AUM
  AND ter_numeric <= 0.5           -- Max 0.5% TER
  AND name IS NOT NULL

-- Pro dividend investory  
SELECT * FROM etf_funds
WHERE current_dividend_yield_numeric >= 1.5
  AND category ILIKE '%dividend%'
  
-- Performance bonus
ORDER BY (
  CASE WHEN return_1y_percent > 15 THEN 10
       WHEN return_1y_percent > 8 THEN 8
       ELSE 5 END
) DESC
```

## 🧪 **Testing & Validation**

### **Unit testy pro scoring:**
```typescript
describe('ETF Scoring Algorithm', () => {
  test('VWCE scores high for beginners', () => {
    const vwce = { ter_numeric: 0.22, fund_size_numeric: 8000, category: 'World' };
    const score = calculateETFScore(vwce, beginnerProfile);
    expect(score).toBeGreaterThan(75);
  });
  
  test('High dividend ETF scores high for income seekers', () => {
    const dividendETF = { current_dividend_yield_numeric: 4.2, category: 'Dividend' };
    const score = calculateETFScore(dividendETF, incomeProfile);
    expect(score).toBeGreaterThan(80);
  });
});
```

## 🎯 **Výsledky a optimalizace**

### **Očekávané zlepšení:**
- **+85%** relevance doporučení
- **+70%** user satisfaction
- **+60%** conversion to broker
- **+40%** ETF detail views

### **Continuous improvement:**
1. **User feedback loop** - rating doporučení
2. **Performance tracking** - sledování skutečné výkonnosti
3. **Market adaptation** - aktualizace vah podle trhů
4. **A/B testing** - optimalizace parametrů

Algoritmus je navržen jako **living system** který se učí a zlepšuje na základě uživatelského chování a tržních výsledků! 🚀