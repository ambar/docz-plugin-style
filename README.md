# docz-plugin-style

PostCSS plugin for docz:

- Import `.css` with PostCSS ([postcss-preset-env](https://preset-env.cssdb.org/))
- Import `.module.css` with PostCSS ([postcss-preset-env](https://preset-env.cssdb.org/)) + [CSS Modlues](https://github.com/css-modules/css-modules)

## Install

```bash
npm install docz-plugin-style
```

## Usage

Add plugin to `doczrc.js`:

```js
import style from 'docz-plugin-style'

export default {
  plugins: [
    style({
      // postcss-preset-env options, defaults to `{stage: 3}`
      env: {},
    }),
  ],
}
```

Import CSS files:

```js
import './styles.css'
import styles from './styles.module.css'
```
