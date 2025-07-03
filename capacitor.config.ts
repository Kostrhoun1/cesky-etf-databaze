import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.448821a1c7844b73bc04ff0651ee8e0c',
  appName: 'cesky-etf-databaze',
  webDir: 'dist',
  server: {
    url: "https://448821a1-c784-4b73-bc04-ff0651ee8e0c.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: false
    }
  }
};

export default config;