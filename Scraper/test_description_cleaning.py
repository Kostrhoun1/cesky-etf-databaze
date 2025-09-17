#!/usr/bin/env python3
"""
Test script pro ověření čištění popisů ETF od "Show more/Show less" artefaktů
"""

import re

def clean_description_text(description_text):
    """Stejná logika čištění jako v final_scraper.py"""
    if description_text:
        # Odstranění UI artefaktů "Show more/Show less" ve všech variantách
        description_text = re.sub(r'Show more\s*Show less', '', description_text, flags=re.IGNORECASE)
        description_text = re.sub(r'Ukázat více\s*show méně', '', description_text, flags=re.IGNORECASE)
        description_text = re.sub(r'Show more\s*show méně', '', description_text, flags=re.IGNORECASE)
        description_text = re.sub(r'Ukázat více\s*Show less', '', description_text, flags=re.IGNORECASE)
        description_text = re.sub(r'Show more', '', description_text, flags=re.IGNORECASE)
        description_text = re.sub(r'Show less', '', description_text, flags=re.IGNORECASE)
        description_text = re.sub(r'Ukázat více', '', description_text, flags=re.IGNORECASE)
        description_text = re.sub(r'show méně', '', description_text, flags=re.IGNORECASE)
        
        # Standardní čištění bílých znaků
        description_text = re.sub(r'\s+', ' ', description_text)
        description_text = description_text.replace('\n', ' ').replace('\r', ' ')
        description_text = description_text.strip()
        
    return description_text

# Test cases
test_cases = [
    "This ETF tracks the S&P 500 index. Ukázat více show méně",
    "Investment fund description here. Show more Show less",
    "Some ETF description. Show more show méně",
    "Another description. Ukázat více Show less",
    "Clean description without artifacts.",
    "Show more at the beginning. Description continues here.",
    "Description here. show méně at the end",
    "Multiple Show more and Show less and Ukázat více artifacts show méně",
    "   Whitespace test   Show more   Show less   with spaces   ",
    ""
]

print("🧪 TESTOVÁNÍ ČIŠTĚNÍ POPISŮ ETF")
print("=" * 60)

for i, test in enumerate(test_cases, 1):
    print(f"\n{i}. PŘED: '{test}'")
    cleaned = clean_description_text(test)
    print(f"   PO:   '{cleaned}'")
    
    # Kontrola zda byly odstraněny artefakty
    has_artifacts = any(artifact.lower() in cleaned.lower() for artifact in [
        'show more', 'show less', 'ukázat více', 'show méně'
    ])
    
    status = "❌ STÁLE OBSAHUJE ARTEFAKTY" if has_artifacts else "✅ ČISTÉ"
    print(f"   {status}")

print(f"\n{'=' * 60}")
print("✅ Test dokončen!")