#!/usr/bin/env python3
"""
Test pouze market heatmap generování s upload funkčností
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from final_scraper import CompleteProductionScraper

def test_heatmap_generation():
    """Test pouze market heatmap část final_scraper.py"""
    
    print("🧪 Test: Market Heatmap Generation s Upload funkcionalitou")
    print("="*60)
    
    # Vytvořit instanci scraperu
    scraper = CompleteProductionScraper(batch_size=1)
    
    try:
        # Spustit pouze market heatmap generování
        scraper._generate_market_heatmap_data()
        print("✅ Test dokončen úspěšně!")
        
    except Exception as e:
        print(f"❌ Test selhal: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_heatmap_generation()