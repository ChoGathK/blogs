# 学习 Nest.js

## 准备工作

> 确保操作系统上安装了 Node.js（ >= 8.9.0）

### 全局安装依赖

```shell

yarn global add @nestjs/cli

```

### 使用脚手架创建基础项目

```shell

nest new template

```

### 更新 .eslintrc.js

```js

module.exports = {
  root: true,

  env: { node: true },

  parser: '@typescript-eslint/parser',

  parserOptions: { sourceType: 'module' },

  plugins: ['@typescript-eslint/eslint-plugin'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi-spacing': [2, {'before': false, 'after': true}], // 强制分号前后不允许空格
    'no-trailing-spaces': 'error', // 一行结束后面有空格就发出警告
    'no-irregular-whitespace': 0, // 不规则的空白不允许
    'no-use-before-define': 2, // 未定义前不能使用
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'quotes': [2, 'single'], // 单引号
    'no-dupe-args': 2,  // 函数参数不能重复
    'no-unreachable': 1, // 不能有无法执行的代码
    'no-undef': 2, // 不能有未定义的变量
    'no-lone-blocks': 0, // 禁止不必要的嵌套块
    'no-class-assign': 2, // 禁止给类赋值
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-delete-var': 2, // 不能对var声明的变量使用delete操作符
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复
    'no-empty': 2, // 块语句中的内容不能为空
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-invalid-this': 0, // 禁止无效的this，只能用在构造器，类，对象字面量
    'indent': [2, 2], // 控制缩进为2
    'eqeqeq': 1,// 警告使用全等
    'semi': 2, // 强制使用分号
  },

};


```
