<p align="center">
  <a href="#"><img width="400" src="https://github.com/ulivz/dmo/blob/master/.media/logo.png?raw=true" alt="Dmo logo"></a>
</p>

<p align="center">
  <!-- <a href="https://circleci.com/gh/ulivz/dmo/tree/dev"><img src="https://img.shields.io/circleci/project/ulivz/dmo/dev.svg" alt="Build Status"></a>
  <a href="https://codecov.io/github/ulivz/dmo?branch=dev"><img src="https://img.shields.io/codecov/c/github/ulivz/dmo/dev.svg" alt="Coverage Status"></a> -->
  <a href="https://www.npmjs.com/package/dmo"><img src="https://img.shields.io/npm/dm/dmo.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/dmo"><img src="https://img.shields.io/npm/v/dmo.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/dmo"><img src="https://img.shields.io/npm/l/dmo.svg" alt="License"></a>
</p>

# Features

- _**Pure function driven 🍣**_
- _**Support multiple modes 🎂**_
- _**Minimalist Responsive Design 🍉**_
- _**Detecting language 🧀**_
- _**Power from [vue](https://github.com/vuejs/vue) and [TypeScript](https://github.com/Microsoft/TypeScript) ❤**_

# Getting Started

Let's use dmo to make a simple **[Babel](http://babeljs.io/) REPL**, first, write a simple html file, then inject the following necessary dependencies:

```html
<script src="https://unpkg.com/dmo"></script>
<script src="https://unpkg.com/@babel/standalone@7.0.0-beta.38/babel.min.js"></script>
```

Next, initialize it:

```js
  window.dmo({
    title: 'Babel REPL',
    transformers: {
      es2015: function (input) {
        return Babel.transform(input, { presets: ['es2015'] }).code;
      }
    }
  })
```

Open the browser, then you can get a usable Babel REPL (_Check out the online [DEMO](http://www.v2js.com/dmo/)_):

<p align="center">
  <img src="https://github.com/ulivz/dmo/blob/master/.media/desktop.png?raw=true" height="" style=""/>
</p>

<details>
<summary>Open the mobile snapshot</summary>

<p align="center">
  <img src="https://github.com/ulivz/dmo/blob/master/.media/mobile.png?raw=true" width="300" height="" style=""/>
</p>

</details>

## Install

The recommendation is to use the [unpkg](https://unpkg.com/dmo) directly, of course, you can also use npm/yarn to download it:

```bash
npm i dmo --save
# yarn add dmo
```

## API

### dmo(options)

#### options

- Type: `Object`
- Required: `true`

  fields of options are as follows

##### input

- Type: `string`
- Required: `true`

  REPL's input initial value. it also supports reading Github files as input, such as:

  ```js
  'https://github.com/vuejs/vue/blob/dev/src/core/index.js'  // Full path
  '$github/vuejs/vue/dev/src/core/index.js'                  // Short cut
   ```

##### title

- Type: `string`
- Required: `true`

  REPL's title.


##### username

- Type: `string`
- Required: `true`

  user name.

##### name

- Type: `string`
- Required: `false`

  Project's name.

##### placeholder

- Type: `string`
- Required: `false`
- Default: `Please enter your input`

  placeholder of the input area.


##### transformers

- Type: `{ [mode: string]: transformFn }`
- Required: `true`

  An plain object, the key is the name of the mode, the value is the transform function corresponding to the mode, note that the transform accepts a string of the current input area as input, and the return value will display in the preview area.

##### detectLanguage

- Type: `boolean`
- Required: `false`
- Default: `false`

  Whether to enable language detection with [program-language-detector](https://github.com/ulivz/program-language-detector), From `v1.1.2`, it will automatically highlight the `input / ouput` by the detecting result, due to the real-time language detection will consume more performance, by default is `false`.

## Projects Using Dmo

- [markdown-catalogue-parser](https://github.com/ulivz/markdown-catalogue-parser): 🛁 Git the category via raw markdown file.
- [html-css-transformer](https://github.com/ulivz/html-css-transformer): 🎊 Get css from html.
- Feel free to add yours here :)


## Prior art

dmo wouldn't exist if it wasn't for excellent prior art, dmo is inspired by these projects:

- [vue](https://github.com/vuejs/vue)
- [docsify](https://github.com/QingWei-Li/docsify)
- [docute](https://github.com/egoist/docute)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**dmo** © [ulivz](https://github.com/ULIVZ), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by ulivz with help from contributors ([list](https://github.com/ULIVZ/dmo/contributors)).

> [github.com/ulivz](https://github.com/ulivz) · GitHub [@ulivz](https://github.com/ULIVZ)
