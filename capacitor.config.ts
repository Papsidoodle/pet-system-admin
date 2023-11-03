import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.petscureadmin.app',
  appName: 'PetsCure Admin',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
