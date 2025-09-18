import json

# Load nejnovější výsledky
with open('/Users/tomaskostrhoun/Documents/ETF/Scraper/justetf_complete_production/results/FINAL_COMPLETE_WITH_DIVIDENDS_20250918_121539.json', 'r') as f:
    data = json.load(f)

print(f'=== ANALÝZA {len(data)} ETF Z NEJNOVĚJŠÍHO TESTU ===')

# Analyzuj datumy
dates_analysis = {}
older_etfs = []

for etf in data:
    inception = etf.get('inception_date', '')
    rating = etf.get('rating')
    
    if inception:
        year = None
        try:
            # Zkusme najít rok
            if '2024' in inception:
                year = 2024
            elif '2023' in inception:
                year = 2023
            elif '2022' in inception:
                year = 2022
            elif '2021' in inception:
                year = 2021
            elif '2020' in inception:
                year = 2020
            elif '2019' in inception:
                year = 2019
            elif '2018' in inception:
                year = 2018
            elif '2017' in inception:
                year = 2017
            elif '2016' in inception:
                year = 2016
            elif '2015' in inception:
                year = 2015
            elif '2014' in inception:
                year = 2014
            elif '2013' in inception:
                year = 2013
            elif '2012' in inception:
                year = 2012
            elif '2011' in inception:
                year = 2011
            elif '2010' in inception:
                year = 2010
            elif '200' in inception:
                # 2000-2009
                year = 'pre-2010'
                
            if year:
                dates_analysis[year] = dates_analysis.get(year, 0) + 1
                
                # Uložit starší ETF (2021 a starší)
                if year and year not in [2024, 2023, 2022]:
                    older_etfs.append({
                        'isin': etf.get('isin'),
                        'name': etf.get('name', '')[:50],
                        'inception': inception,
                        'year': year,
                        'rating': rating,
                        'rating_score': etf.get('rating_score')
                    })
        except:
            pass

print('\nDistribuce podle let:')
years = list(dates_analysis.keys())
# Separate string and numeric years
numeric_years = [y for y in years if isinstance(y, int)]
string_years = [y for y in years if isinstance(y, str)]

for year in sorted(numeric_years, reverse=True):
    count = dates_analysis[year]
    print(f'  {year}: {count} ETF')

for year in sorted(string_years, reverse=True):
    count = dates_analysis[year]
    print(f'  {year}: {count} ETF')

print(f'\n=== ETF STARŠÍ NEŽ 2022 (měly by mít rating) ===')
print(f'Nalezeno {len(older_etfs)} starších ETF:')

for etf in older_etfs[:15]:  # Show first 15
    rating_str = f'{etf["rating"]}/5 ⭐' if etf['rating'] else 'ŽÁDNÝ'
    score_str = f'{etf["rating_score"]}/100' if etf['rating_score'] else 'ŽÁDNÝ'
    print(f'  {etf["isin"]} | {etf["year"]} | {etf["name"]}...')
    print(f'    Rating: {rating_str} | Score: {score_str}')

print(f'\n=== POČET S RATINGEM ===')
with_rating = [etf for etf in older_etfs if etf['rating']]
print(f'ETF starší než 2022 s ratingem: {len(with_rating)}/{len(older_etfs)}')