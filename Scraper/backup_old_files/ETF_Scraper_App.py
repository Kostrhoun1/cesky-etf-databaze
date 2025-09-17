#!/usr/bin/env python3
"""
ETF SCRAPER DESKTOP APP
Jednoduchá GUI aplikace pro manuální spuštění ETF scrapingu
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import subprocess
import threading
import os
import sys
from datetime import datetime
import queue
import signal

class ETFScraperApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🤖 ETF Scraper")
        self.root.geometry("800x600")
        self.root.resizable(True, True)
        
        # Nastavení pro bezpečné ukončení
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        signal.signal(signal.SIGINT, self.signal_handler)
        
        self.scraping_process = None
        self.caffeinate_process = None
        self.is_running = False
        self.output_queue = queue.Queue()
        
        self.setup_ui()
        self.check_dependencies()
        
    def setup_ui(self):
        """Nastavení uživatelského rozhraní"""
        
        # Hlavní frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Konfigurace grid
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(2, weight=1)
        
        # Nadpis
        title_label = ttk.Label(main_frame, text="🤖 ETF Scraper", font=("Arial", 18, "bold"))
        title_label.grid(row=0, column=0, columnspan=3, pady=(0, 10))
        
        # Status
        self.status_var = tk.StringVar(value="⏸️ Připraven k spuštění")
        status_label = ttk.Label(main_frame, textvariable=self.status_var, font=("Arial", 12))
        status_label.grid(row=1, column=0, columnspan=3, pady=(0, 10))
        
        # Tlačítka
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=2, column=0, sticky=(tk.W, tk.E), pady=(0, 10))
        button_frame.columnconfigure(1, weight=1)
        
        self.start_button = ttk.Button(button_frame, text="🚀 Spustit ETF Scraping", 
                                     command=self.start_scraping, style="Success.TButton")
        self.start_button.grid(row=0, column=0, padx=(0, 5))
        
        self.stop_button = ttk.Button(button_frame, text="🛑 Zastavit", 
                                    command=self.stop_scraping, state="disabled", style="Danger.TButton")
        self.stop_button.grid(row=0, column=1, padx=5)
        
        self.upload_button = ttk.Button(button_frame, text="📤 Otevřít Upload", 
                                      command=self.open_upload_page)
        self.upload_button.grid(row=0, column=2, padx=(5, 0))
        
        # Progress bar
        self.progress_var = tk.StringVar(value="Připraven...")
        progress_label = ttk.Label(main_frame, textvariable=self.progress_var)
        progress_label.grid(row=3, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(0, 5))
        
        self.progress_bar = ttk.Progressbar(main_frame, mode='indeterminate')
        self.progress_bar.grid(row=4, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(0, 10))
        
        # Log výstup
        log_label = ttk.Label(main_frame, text="📄 Log výstup:")
        log_label.grid(row=5, column=0, sticky=tk.W, pady=(0, 5))
        
        self.log_text = scrolledtext.ScrolledText(main_frame, height=20, width=80)
        self.log_text.grid(row=6, column=0, columnspan=3, sticky=(tk.W, tk.E, tk.N, tk.S), pady=(0, 10))
        main_frame.rowconfigure(6, weight=1)
        
        # Dolní panel s informacemi
        info_frame = ttk.Frame(main_frame)
        info_frame.grid(row=7, column=0, columnspan=3, sticky=(tk.W, tk.E))
        
        ttk.Label(info_frame, text="💡 Tip: Nechte Mac zapnutý během scrapingu (4-6 hodin)").grid(row=0, column=0, sticky=tk.W)
        
        # Style
        style = ttk.Style()
        style.configure("Success.TButton", foreground="green")
        style.configure("Danger.TButton", foreground="red")
        
    def check_dependencies(self):
        """Kontrola závislostí"""
        missing = []
        
        if not os.path.exists("final_scraper.py"):
            missing.append("final_scraper.py")
        if not os.path.exists("ISIN.csv"):
            missing.append("ISIN.csv")
        if not os.path.exists("complete_automation.py"):
            missing.append("complete_automation.py")
            
        if missing:
            self.log(f"⚠️ Chybí soubory: {', '.join(missing)}")
            self.start_button.config(state="disabled")
        else:
            self.log("✅ Všechny soubory nalezeny")
            
    def log(self, message):
        """Přidá zprávu do logu"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        formatted_message = f"[{timestamp}] {message}\n"
        
        self.log_text.insert(tk.END, formatted_message)
        self.log_text.see(tk.END)
        self.root.update_idletasks()
        
    def start_scraping(self):
        """Spustí scraping v novém vláknu"""
        if self.is_running:
            return
            
        self.is_running = True
        self.start_button.config(state="disabled")
        self.stop_button.config(state="normal")
        self.status_var.set("🚀 Spouštím scraping...")
        self.progress_var.set("Inicializuji...")
        self.progress_bar.start()
        
        # Spustí v novém vláknu
        threading.Thread(target=self.run_scraping, daemon=True).start()
        
        # Spustí monitoring výstupu
        self.root.after(100, self.check_output_queue)
        
    def run_scraping(self):
        """Hlavní scraping logika"""
        try:
            self.output_queue.put("🌙 Začínám noční ETF scraping...")
            self.output_queue.put("☕ Spouštím caffeinate - Mac se neuspí...")
            
            # Spustí caffeinate
            self.caffeinate_process = subprocess.Popen([
                'caffeinate', '-d', '-i', '-s', '-u'
            ])
            
            self.output_queue.put("🚀 Spouštím complete automation...")
            
            # Spustí automation s real-time výstupem
            self.scraping_process = subprocess.Popen([
                "python3", "complete_automation.py", 
                "--batch-size", "50"
            ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, 
               text=True, bufsize=1, universal_newlines=True)
            
            # Čte výstup v real-time
            while True:
                output = self.scraping_process.stdout.readline()
                if output == '' and self.scraping_process.poll() is not None:
                    break
                if output:
                    self.output_queue.put(output.strip())
                    
            # Zkontroluj výsledek
            return_code = self.scraping_process.poll()
            
            if return_code == 0:
                self.output_queue.put("✅ ETF scraping úspěšně dokončen!")
                self.output_queue.put("📁 Kontrolujte složku: ready_for_upload/")
                self.output_queue.put("📤 Můžete nahrát data přes tlačítko 'Otevřít Upload'")
                self.output_queue.put("STATUS:SUCCESS")
            else:
                self.output_queue.put(f"❌ ETF scraping selhal (kód: {return_code})")
                self.output_queue.put("STATUS:ERROR")
                
        except Exception as e:
            self.output_queue.put(f"❌ Neočekávaná chyba: {e}")
            self.output_queue.put("STATUS:ERROR")
        finally:
            # Ukončí caffeinate
            if self.caffeinate_process:
                self.caffeinate_process.terminate()
                self.output_queue.put("💤 Caffeinate ukončen - Mac může spát")
                
            self.output_queue.put("STATUS:FINISHED")
            
    def check_output_queue(self):
        """Kontroluje queue s výstupem"""
        try:
            while True:
                message = self.output_queue.get_nowait()
                
                if message.startswith("STATUS:"):
                    status = message.split(":", 1)[1]
                    if status == "SUCCESS":
                        self.on_scraping_finished(True)
                    elif status == "ERROR":
                        self.on_scraping_finished(False)
                    elif status == "FINISHED":
                        self.cleanup_processes()
                else:
                    self.log(message)
                    
        except queue.Empty:
            pass
            
        if self.is_running:
            self.root.after(100, self.check_output_queue)
            
    def on_scraping_finished(self, success):
        """Callback po dokončení scrapingu"""
        self.progress_bar.stop()
        
        if success:
            self.status_var.set("✅ Scraping dokončen úspěšně")
            self.progress_var.set("Hotovo! Připraveno k uploadu.")
            
            # Zobrazí success dialog
            result = messagebox.askyesno(
                "Scraping dokončen", 
                "ETF scraping byl úspěšně dokončen!\n\nChcete otevřit upload stránku?"
            )
            if result:
                self.open_upload_page()
        else:
            self.status_var.set("❌ Scraping selhal")
            self.progress_var.set("Chyba - zkontrolujte log")
            messagebox.showerror("Chyba", "ETF scraping selhal. Zkontrolujte log pro více informací.")
            
    def cleanup_processes(self):
        """Uklidí procesy a obnoví UI"""
        self.is_running = False
        self.start_button.config(state="normal")
        self.stop_button.config(state="disabled")
        
        self.scraping_process = None
        if self.caffeinate_process:
            self.caffeinate_process = None
            
    def stop_scraping(self):
        """Zastaví scraping"""
        if not self.is_running:
            return
            
        self.log("🛑 Zastavuji scraping...")
        
        if self.scraping_process:
            self.scraping_process.terminate()
            
        if self.caffeinate_process:
            self.caffeinate_process.terminate()
            
        self.progress_bar.stop()
        self.status_var.set("🛑 Zastaveno uživatelem")
        self.progress_var.set("Zastaveno")
        self.cleanup_processes()
        
    def open_upload_page(self):
        """Otevře upload stránku v prohlížeči"""
        url = "http://localhost:8083/admin?password=Omitac116"
        subprocess.run(["open", url])  # macOS
        self.log(f"🌐 Otevírám upload stránku: {url}")
        
        # Otevře také složku s připravenými soubory
        if os.path.exists("ready_for_upload"):
            subprocess.run(["open", "ready_for_upload"])
            self.log("📁 Otevírám složku ready_for_upload/")
        
    def signal_handler(self, signum, frame):
        """Handler pro signály"""
        self.on_closing()
        
    def on_closing(self):
        """Callback při zavírání aplikace"""
        if self.is_running:
            result = messagebox.askyesno(
                "Ukončit aplikaci", 
                "Scraping stále běží. Chcete ho zastavit a ukončit aplikaci?"
            )
            if result:
                self.stop_scraping()
                self.root.destroy()
        else:
            self.root.destroy()

def main():
    # Kontrola aktuálního adresáře
    if not os.path.exists("final_scraper.py"):
        import tkinter.messagebox as mb
        mb.showerror(
            "Chyba", 
            "Aplikace musí být spuštěna ze složky se scraperem!\n\n"
            "Přejděte do složky s final_scraper.py a spusťte znovu."
        )
        return
        
    root = tk.Tk()
    app = ETFScraperApp(root)
    
    try:
        root.mainloop()
    except KeyboardInterrupt:
        app.on_closing()

if __name__ == "__main__":
    main()