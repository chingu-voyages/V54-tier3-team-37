import {build} from 'esbuild';

build({
    entryPoints: ['./src/server.ts'],
    bundle: false,
    platform: 'node',
    target: ['node20'],
    format: 'esm',
    outdir: 'dist',
    sourcemap: true,
    outExtension: {'.js': '.js'},
    tsconfig: './tsconfig.build.json'
}).catch((err) => {
    console.error('Build failed:', err);
    process.exit(1);
});

