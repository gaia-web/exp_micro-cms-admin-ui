import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'deno-micro-cms-admin-ui',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
