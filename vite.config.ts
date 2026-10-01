import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const r = (p: string) => resolve(here, p);

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  server: { host: '127.0.0.1', strictPort: false },
  preview: { host: '127.0.0.1', strictPort: false },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: r('index.html'),
        work: r('work/index.html'),
        localization: r('work/localization-fallback-engine/index.html'),
        lts: r('work/aem-6-5-to-lts-migration/index.html'),
        translation: r('work/translation-and-blog-content-services/index.html'),
        cloud: r('work/cloud-service-migration/index.html'),
        dam: r('work/connected-dam-and-asset-ingestion/index.html'),
        components: r('work/enterprise-content-components-and-workflows/index.html'),
        services: r('services/index.html'),
        about: r('about/index.html'),
        writing: r('writing/index.html'),
        connectedAssets: r('writing/connected-assets-in-aem-as-a-cloud-service/index.html'),
        directBinary: r('writing/direct-binary-upload-the-cloud-way-to-ingest-assets/index.html'),
        assetsApis: r('writing/aem-assets-apis-and-content-fragment-management/index.html'),
        contact: r('contact/index.html'),
        notFound: r('404.html')
      }
    }
  }
});
