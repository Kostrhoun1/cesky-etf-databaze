#!/usr/bin/env python3
"""
Test kategorizace Real Estate ETF
"""

# Jednoduchý test kategorizace
def test_real_estate_categorization():
    # Test data
    name = "iShares STOXX Europe 600 Real Estate UCITS ETF (DE)"
    index_name = "STOXX Europe 600 Real Estate"
    
    name_lower = name.lower()
    index_lower = index_name.lower()
    
    print(f"Testing: {name}")
    print(f"Index: {index_name}")
    print()
    
    # Real estate keywords from scraper
    real_estate_keywords = [
        'real estate', 'reit', 'property', 'infrastructure', 'utilities',
        'immobilien', 'immobilier', 'prop', 'properties', 'realestate',
        'real est', 'propiedades', 'biens immobiliers', 'listed property',
        'listed real estate', 'commercial property', 'residential property',
        'property securities', 'property companies', 'property investment',
        'property index', 'european property', 'global property', 'us property',
        'asia property', 'developed property', 'international property',
        'ftse epra', 'epra nareit', 'epra', 'nareit'
    ]
    
    print("Checking keywords in name:")
    for keyword in real_estate_keywords:
        if keyword in name_lower:
            print(f"✅ Found '{keyword}' in name")
    
    print("\nChecking keywords in index:")
    for keyword in real_estate_keywords:
        if keyword in index_lower:
            print(f"✅ Found '{keyword}' in index")
    
    # Test condition
    has_real_estate = any(keyword in name_lower for keyword in real_estate_keywords) or \
                     any(keyword in index_lower for keyword in real_estate_keywords)
    
    print(f"\nResult: Should be categorized as Real Estate: {has_real_estate}")
    
    if has_real_estate:
        category = "Nemovitosti"
    else:
        category = "Akcie"  # Default
    
    print(f"Final category: {category}")

if __name__ == "__main__":
    test_real_estate_categorization()