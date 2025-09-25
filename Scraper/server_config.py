# Produkční konfigurace pro automatické nahrávání market heatmap dat
# Pro český ETF web - cesky-etf.cz

# Server konfigurace pro Netlify/Vercel hosting
# Protože statické hostingy nemají FTP, použijeme GitHub Actions workflow
FTP_SERVER = "github.com"
FTP_USERNAME = "Kostrhoun1"  # GitHub username 
FTP_PASSWORD = None  # Používáme GitHub token přes environment
FTP_REMOTE_PATH = "/src/data/"
UPLOAD_METHOD = "github_commit"  # Speciální metoda pro GitHub

# Alternativně - pokud máš cPanel hosting, odkomentuj a napiš své údaje:
# FTP_SERVER = "cesky-etf.cz"
# FTP_USERNAME = "tvuj-cpanel-username"
# FTP_PASSWORD = "tvoje-cpanel-heslo"
# FTP_REMOTE_PATH = "/public_html/data/"
# UPLOAD_METHOD = "ftp"

# Zapnutí automatického uploadu
UPLOAD_HEATMAP_TO_SERVER = True