import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'site',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'site/index.html'),
        services: resolve(__dirname, 'site/services.html'),
        doctors: resolve(__dirname, 'site/doctors.html'),
        patients: resolve(__dirname, 'site/patients.html'),
        referrals: resolve(__dirname, 'site/referrals.html'),
        contact: resolve(__dirname, 'site/contact.html'),
        registration: resolve(__dirname, 'site/forms/registration.html'),
        medicalHistory: resolve(__dirname, 'site/forms/medical-history.html'),
        insurance: resolve(__dirname, 'site/forms/insurance.html'),
        consent: resolve(__dirname, 'site/forms/consent.html'),
      }
    }
  }
});
