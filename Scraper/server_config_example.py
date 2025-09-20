# ============================================================================
# KONFIGURACE SERVERU PRO AUTOMATICKÉ NAHRÁVÁNÍ MARKET HEATMAP DAT
# ============================================================================

# INSTRUKCE PRO NASTAVENÍ:
# 1. Zkopírujte tento soubor jako 'server_config.py'
# 2. Vyplňte své údaje pro server
# 3. Importujte v final_scraper.py: from server_config import *

# KONFIGURACE SERVERU
FTP_SERVER = "vase-domena.cz"  # Váš server/doména
FTP_USERNAME = "vas-username"  # FTP/SSH uživatelské jméno
FTP_PASSWORD = "vase-heslo"    # FTP/SSH heslo (nebo None pro SSH klíče)
FTP_REMOTE_PATH = "/public_html/data/"  # Cesta na serveru kam nahrát JSON soubory

# METODA NAHRÁVÁNÍ
# Možnosti: "sftp", "ftp", "scp"
# - "sftp" - Nejbezpečnější, vyžaduje SSH přístup
# - "ftp" - Klasické FTP (méně bezpečné)
# - "scp" - SSH copy (vyžaduje SSH klíče nebo heslo)
UPLOAD_METHOD = "sftp"

# ZAPNUTÍ/VYPNUTÍ UPLOADU
UPLOAD_HEATMAP_TO_SERVER = True

# ============================================================================
# PŘÍKLADY KONFIGURACE PRO RŮZNÉ POSKYTOVATELE HOSTINGU:
# ============================================================================

# PRZYKŁAD - Webhosting s cPanel:
# FTP_SERVER = "ftp.vase-domena.cz"
# FTP_USERNAME = "vas-cpanel-username"
# FTP_PASSWORD = "vase-cpanel-heslo"
# FTP_REMOTE_PATH = "/public_html/data/"
# UPLOAD_METHOD = "ftp"

# PRZYKŁAD - VPS server s SSH:
# FTP_SERVER = "123.456.789.10"  # IP adresa serveru
# FTP_USERNAME = "root"  # nebo jiný SSH uživatel
# FTP_PASSWORD = "vase-ssh-heslo"  # nebo None pro SSH klíče
# FTP_REMOTE_PATH = "/var/www/html/data/"
# UPLOAD_METHOD = "sftp"

# PRZYKŁAD - GitHub Pages (přes Git):
# Pro GitHub Pages byste potřebovali jiné řešení pomocí Git
# (není podporováno v tomto scriptu)

# ============================================================================
# INSTALACE ZÁVISLOSTÍ:
# ============================================================================
# pip install paramiko  # pro SFTP podporu

# ============================================================================
# TESTOVÁNÍ PŘIPOJENÍ:
# ============================================================================
# Můžete otestovat připojení pomocí jednoduchého scriptu:

# import paramiko
# ssh = paramiko.SSHClient()
# ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# ssh.connect(FTP_SERVER, username=FTP_USERNAME, password=FTP_PASSWORD)
# print("✅ Připojení úspěšné!")
# ssh.close()