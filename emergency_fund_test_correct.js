// Aktualizovaný test Emergency Fund Calculator - odpovídá skutečnému interface
// Testuje 5 různých klientských profilů podle aktuální implementace

console.log('🧪 TESTOVÁNÍ EMERGENCY FUND CALCULATOR - AKTUALIZOVANÝ');
console.log('======================================================\n');

// Test profil 1: Mladý absolvent - 25 let, žádné závislosti
console.log('👨‍🎓 PROFIL 1: Mladý absolvent');
const profile1 = {
  monthlyExpenses: 25000,
  jobStability: 'unstable', // první práce
  familySize: 1, // jen sebe
  hasSecondIncome: false,
  hasDebt: false,
  currentSavings: 15000,
  monthlySavingCapacity: 5000,
  contractType: 'fixed_term',
  ageGroup: 'young',
  education: 'university',
  region: 'prague_brno'
};

console.log(`Měsíční výdaje: ${profile1.monthlyExpenses.toLocaleString()} Kč`);
console.log(`Současné úspory: ${profile1.currentSavings.toLocaleString()} Kč`);
console.log(`Měsíční spoření: ${profile1.monthlySavingCapacity.toLocaleString()} Kč`);
console.log(`Velikost rodiny: ${profile1.familySize}`);
console.log(`Stabilita práce: ${profile1.jobStability}`);
console.log(`Typ smlouvy: ${profile1.contractType}`);
console.log(`Věková skupina: ${profile1.ageGroup}`);
console.log('---');
console.log('✅ Očekávané výsledky:');
console.log('- Nestabilní práce → více měsíců rezervy');
console.log('- Mladý věk → nižší riziko');
console.log('- Vysokoškolák → nižší riziko');
console.log('- Jen sebe → méně rezervy\n');

// Test profil 2: Rodina s dětmi a hypotékou - 35 let, 2 děti
console.log('👨‍👩‍👧‍👦 PROFIL 2: Rodina s hypotékou');
const profile2 = {
  monthlyExpenses: 45000,
  jobStability: 'stable', // stabilní práce
  familySize: 4, // 2 rodiče + 2 děti
  hasSecondIncome: true, // manželka pracuje
  hasDebt: true, // hypotéka
  currentSavings: 80000,
  monthlySavingCapacity: 8000,
  contractType: 'permanent',
  ageGroup: 'middle',
  education: 'university',
  region: 'industrial'
};

console.log(`Měsíční výdaje: ${profile2.monthlyExpenses.toLocaleString()} Kč`);
console.log(`Současné úspory: ${profile2.currentSavings.toLocaleString()} Kč`);
console.log(`Měsíční spoření: ${profile2.monthlySavingCapacity.toLocaleString()} Kč`);
console.log(`Velikost rodiny: ${profile2.familySize}`);
console.log(`Stabilita práce: ${profile2.jobStability}`);
console.log(`Druhý příjem: ${profile2.hasSecondIncome ? 'Ano' : 'Ne'}`);
console.log(`Má dluh: ${profile2.hasDebt ? 'Ano' : 'Ne'}`);
console.log('---');
console.log('✅ Očekávané výsledky:');
console.log('- Stabilní práce → méně měsíců');
console.log('- Velká rodina → více rezervy');
console.log('- Druhý příjem → méně riziko');
console.log('- Dluh → více riziko\n');

// Test profil 3: Freelancer - 40 let, nestabilní příjem
console.log('💻 PROFIL 3: Freelancer s nestabilním příjmem');
const profile3 = {
  monthlyExpenses: 35000,
  jobStability: 'unstable', // freelancing
  familySize: 2, // freelancer + partner
  hasSecondIncome: false,
  hasDebt: false,
  currentSavings: 50000,
  monthlySavingCapacity: 12000,
  contractType: 'freelance',
  ageGroup: 'middle',
  education: 'university',
  region: 'prague_brno'
};

console.log(`Měsíční výdaje: ${profile3.monthlyExpenses.toLocaleString()} Kč`);
console.log(`Současné úspory: ${profile3.currentSavings.toLocaleString()} Kč`);
console.log(`Měsíční spoření: ${profile3.monthlySavingCapacity.toLocaleString()} Kč`);
console.log(`Velikost rodiny: ${profile3.familySize}`);
console.log(`Stabilita práce: ${profile3.jobStability}`);
console.log(`Typ smlouvy: ${profile3.contractType}`);
console.log('---');
console.log('✅ Očekávané výsledky:');
console.log('- Freelancer → nejvíce měsíců rezervy!');
console.log('- Nestabilní příjem → vysoké riziko');
console.log('- Střední věk → středně riziko\n');

// Test profil 4: Senior před důchodem - 58 let, stabilní ale věk
console.log('👨‍🦳 PROFIL 4: Senior před důchodem');
const profile4 = {
  monthlyExpenses: 40000,
  jobStability: 'stable',
  familySize: 2, // senior + manželka
  hasSecondIncome: false,
  hasDebt: false,
  currentSavings: 200000,
  monthlySavingCapacity: 15000,
  contractType: 'permanent',
  ageGroup: 'senior',
  education: 'high_school',
  region: 'rural'
};

console.log(`Měsíční výdaje: ${profile4.monthlyExpenses.toLocaleString()} Kč`);
console.log(`Současné úspory: ${profile4.currentSavings.toLocaleString()} Kč`);
console.log(`Měsíční spoření: ${profile4.monthlySavingCapacity.toLocaleString()} Kč`);
console.log(`Velikost rodiny: ${profile4.familySize}`);
console.log(`Stabilita práce: ${profile4.jobStability}`);
console.log(`Věková skupina: ${profile4.ageGroup}`);
console.log(`Vzdělání: ${profile4.education}`);
console.log('---');
console.log('✅ Očekávané výsledky:');
console.log('- Stabilní práce → základní rezerva');
console.log('- Senior věk → více riziko');
console.log('- Střední škola → více riziko');
console.log('- Venkov → více riziko\n');

// Test profil 5: Vysokopříjmová rodina - 42 let, vysoce placená práce
console.log('💼 PROFIL 5: Vysokopříjmová rodina');
const profile5 = {
  monthlyExpenses: 80000,
  jobStability: 'stable', // management pozice
  familySize: 3, // 2 rodiče + 1 dítě
  hasSecondIncome: true,
  hasDebt: true, // hypotéka na drahý dům
  currentSavings: 300000,
  monthlySavingCapacity: 25000,
  contractType: 'permanent',
  ageGroup: 'middle',
  education: 'university',
  region: 'prague_brno'
};

console.log(`Měsíční výdaje: ${profile5.monthlyExpenses.toLocaleString()} Kč`);
console.log(`Současné úspory: ${profile5.currentSavings.toLocaleString()} Kč`);
console.log(`Měsíční spoření: ${profile5.monthlySavingCapacity.toLocaleString()} Kč`);
console.log(`Velikost rodiny: ${profile5.familySize}`);
console.log(`Stabilita práce: ${profile5.jobStability}`);
console.log(`Druhý příjem: ${profile5.hasSecondIncome ? 'Ano' : 'Ne'}`);
console.log('---');
console.log('✅ Očekávané výsledky:');
console.log('- Stabilní práce → méně měsíců');
console.log('- Vysoké příjmy → více rezerva absolutně');
console.log('- Druhý příjem → méně riziko');
console.log('- Praha → méně riziko\n');

console.log('🎯 LOGICKÉ OČEKÁVÁNÍ VÝSLEDKŮ:');
console.log('===============================');
console.log('1. Freelancer (profil 3) by měl mít NEJVÍCE měsíců rezervy');
console.log('2. Mladý absolvent (profil 1) by měl mít středně měsíců');
console.log('3. Stabilní rodina (profil 2) by měla mít méně měsíců než freelancer');
console.log('4. Senior (profil 4) by měl mít více měsíců kvůli věku');
console.log('5. Vysokopříjmoví (profil 5) by mohli mít méně kvůli stabilitě\n');

console.log('📋 POZNÁMKA:');
console.log('Tento test slouží k ověření, že kalkulačka správně zohledňuje:');
console.log('- Stabilitu práce (stable < moderate < unstable)');
console.log('- Velikost rodiny (více lidí = více rezervy)');
console.log('- Věk (senior = více riziko)');
console.log('- Typ kontraktu (freelance = nejvíce riziko)');
console.log('- Druhý příjem (snižuje riziko)');
console.log('- Dluhy (zvyšují riziko)');
console.log('\nPro spuštění skutečného testu otevřete kalkulačku v prohlížeči a zadejte tyto hodnoty manuálně.');