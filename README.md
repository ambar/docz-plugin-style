# docz-plugin-style

PostCSS plugin for docz.

- Import `.css` with PostCSS
- Import `.module.css` with PostCSS + CSS Modlue

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
      // postcss-preset-env options, defaults to stage 3
      env: {},
    }),
  ],
}
```
