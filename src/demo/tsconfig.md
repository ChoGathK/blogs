# demo

```json

{
  "include": [
    "./src"
  ],
  "exclude": [
    "**/*.spec.ts",
    "**/*.spec.js",
    "node_modules"
  ],
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ESNext",
    "lib": ["ESNext"],
    "outDir": "./dist",
    "baseUrl": "./",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "removeComments": false,
    "incremental": false,
    "declaration": true,
    "sourceMap": false,
  }
}

```
