import run from '@kanghyewon/esbuild-config';
import pkg from './package.json' assert { type: 'json' };

run({
  pkg,
})