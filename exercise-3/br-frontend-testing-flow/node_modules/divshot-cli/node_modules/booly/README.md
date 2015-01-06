# booly

Convert numerous value types to booleans

## Install

```
npm install booly --save
```

## Usage

```js
var booly = require('booly');

console.log(booly(1)) // true
console.log(booly('true')) // true

console.log(booly('false')) // false

console.log(booly('some string')) // some string
```

## Run Tests

```
npm install
npm test
```
