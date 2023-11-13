import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'admin.ui',
  appName: 'admin-ui',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
