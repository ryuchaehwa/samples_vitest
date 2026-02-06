# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


# VITEST

## install
- yarn add -D vitest
- *Vitest requires Vite >=v6.0.0 and Node >=v20.0.0*

## commands
Coverage
```npm install -D @vitest/coverage-v8```
1. ```npx vitest run --coverage```
2. ```rm -rf coverage && npx vitest run --coverage```
3. ```npm install -D vitest # 메인 도구 (공용)```
4. ```npm install -D @vitest/coverage-v8 # Vitest 팀에서 공식적으로 만든 부가 도구 (소속)```