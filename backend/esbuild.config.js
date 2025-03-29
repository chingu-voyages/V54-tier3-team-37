import {build} from 'esbuild';

build({
    entryPoints: ['./src/server.ts'],
    bundle: true,
    platform: 'node',
    target: ['node20'],
    format: 'esm',
    outdir: 'dist',
    sourcemap: true,
    outExtension: {'.js': '.js'},
    tsconfig: './tsconfig.build.json'
}).catch(() => process.exit(1));

