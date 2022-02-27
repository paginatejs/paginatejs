import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'paginatejs-core',
      fileName: (format) => `paginatejs-core.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      plugins: [
        typescript({
          target: 'es2021',
          rootDir: path.resolve(__dirname, './src'),
          declaration: true,
          declarationDir: path.resolve(__dirname, './dist/src'),
          exclude: '*.test.ts',
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },
});
