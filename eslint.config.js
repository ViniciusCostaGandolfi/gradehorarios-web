// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const unusedImports = require("eslint-plugin-unused-imports");
const simpleImportSort = require("eslint-plugin-simple-import-sort");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // ==== ORGANIZAÇÃO ====
      // Ordenação automática e inteligente de imports e exports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Limpeza automática de imports não utilizados
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Desativa as regras originais para não conflitar com o unused-imports
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // ==== REDUÇÃO DE BOILERPLATE NO ANGULAR ====
      // Força o uso do inject() ao invés do constructor (Reduz verbosidade e facilita testes)
      "@angular-eslint/prefer-inject": "error",
      // Força uso de Standalone Components (sem precisar de NgModule e declarations espalhadas)
      "@angular-eslint/prefer-standalone": "error",

      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],

      // ==== TIPAGEM INTENSA ("TIPANDO") ====
      // Proíbe uso explícito de `any`
      "@typescript-eslint/no-explicit-any": "error",
      
      // Exige retorno de métodos em classes (excelente para APIs claras e manutenções futuras)
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true },
      ],
      
      // Força o uso de `import type` quando usado apenas pela tipagem
      "@typescript-eslint/consistent-type-imports": "error",

      // Componentes vazios são comuns em Angular (apenas para template e style)
      "@typescript-eslint/no-extraneous-class": "off",

      // Converte erros frustrantes do 'strictTypeChecked' em warnings, 
      // mantendo a tipagem forte mas sem bloquear agressivamente o desenvolvimento com erros imensos de terceiros:
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/restrict-template-expressions": "warn"
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      // ==== ANGULAR REDUÇÃO DE BOILERPLATE (TEMPLATES) ====
      // Usa o novo control flow do Angular 17 (@if, @for) e avisa se usar *ngIf (Menos código, performance melhor)
      "@angular-eslint/template/prefer-control-flow": "error",
      
      // Regras de acessibilidade desativas configuradas originalmente
      "@angular-eslint/template/alt-text": "off",
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
    },
  }
]);
