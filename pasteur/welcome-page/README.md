# welcome-page

This template should help get you started developing with Vue 3 in Vite.


## file setup

Before starting developping the Pasteur Galaxy welcome page, few things need to be done manually.

### Get the `base.css` from Galaxy code src

To do this you need to: 

1. Clone the repo
   ```sh
   git clone https://github.com/C3BI-pasteur-fr/galaxy
   ```
2. Checkout to the correct branch
   ```sh
   git checkout pasteur_release_[version]
   ```
3. go to the client directory
   ```sh
   cd ./client
   ```
4. install js dependencies
   ```sh
   yarn install
   ```
5. Build production dist
   ```sh
   yarn build-production
   ```
6. Copy `base.css`
   ```sh
   cp ../static/style/base.css [galaxy_prod_conf_ROOTDIR]/pasteur/welcome-page/src/assets/
   ```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
