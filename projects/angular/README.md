# Basic Usage

```bash
npx versem -p angular --target 10.1.x
npm install # after rm -rf node_modules in some cases
npm run build core --prod
```

If you use the [Github Action](github-action), it will call VerSem for each matrix entry.

# VerSem Hook

You might need to do custom updates before and afer VerSem run

```
npx versem -p angular --target 10.1.x --plugin tools/index.js
```

```js index.js
const before = (context) => {};

const after = (context) => {};

module.exports = {
  before,
  after,
};
```

# Github Action

```
npx versem -p angular action
```

```yml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ env.NODE_LATEST }}
      - run: yarn install
      - run: yarn build:lib
      - uses: actions/upload-artifact@v2
        with:
          name: lumberjack-package
          path: dist/ngworker/lumberjack
          if-no-files-found: error

  app:
    runs-on: ubuntu-latest
    needs: build

    strategy:
      matrix:
        node-version: [10.x, 12.x]
        angular-version:
          [9.0.x, 9.1.x, 10.0.x, 10.1.x, 10.2.x, 11.0.x, 11.1.x, 11.2.x]

    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}

      - name: Use Angular version ${{ matrix.angular-version }}
        uses: versem/angular-action@v3
        with:
          angular-version: ${{ matrix.angular-version }}

      - run: yarn install

      - uses: actions/download-artifact@v2
        with:
          name: __PACKAGE__-package
          path: node_modules/__PACKAGE__

      - run: yarn build:app # Build demo app with the targeted version
```
