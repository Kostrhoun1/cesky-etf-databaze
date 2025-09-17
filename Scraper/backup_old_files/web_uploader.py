#!/usr/bin/env python3
"""
ETF Web Upload Helper - Nahrává CSV přes existující web rozhraní
"""

import requests
import os
import logging
from pathlib import Path

# Konfigurace
ADMIN_PASSWORD = "Omitac116"
UPLOAD_URL = "http://localhost:8083/admin"  # Změňte na produkční URL

logger = logging.getLogger(__name__)

class WebUploader:
    def __init__(self, base_url: str = "http://localhost:8083", password: str = ADMIN_PASSWORD):
        self.base_url = base_url
        self.password = password
        self.session = requests.Session()
    
    def upload_csv(self, csv_file_path: str) -> bool:
        """Nahraje CSV soubor přes web rozhraní"""
        try:
            if not os.path.exists(csv_file_path):
                logger.error(f"❌ CSV soubor neexistuje: {csv_file_path}")
                return False
            
            # Přečte CSV obsah
            with open(csv_file_path, 'r', encoding='utf-8') as f:
                csv_content = f.read()
            
            logger.info(f"📤 Nahrávám CSV: {csv_file_path}")
            logger.info(f"📊 Velikost: {len(csv_content)} znaků")
            
            # Simuluje form upload přes web rozhraní
            files = {
                'csvFile': (os.path.basename(csv_file_path), csv_content, 'text/csv')
            }
            
            params = {
                'password': self.password
            }
            
            # POST na admin stránku
            response = self.session.post(
                f"{self.base_url}/admin",
                params=params,
                files=files,
                timeout=300
            )
            
            if response.status_code == 200:
                logger.info("✅ CSV úspěšně nahráno")
                return True
            else:
                logger.error(f"❌ Upload selhal: {response.status_code}")
                logger.error(f"Response: {response.text[:200]}...")
                return False
                
        except Exception as e:
            logger.error(f"❌ Chyba při uploadu: {e}")
            return False