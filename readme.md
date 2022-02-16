<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD029 MD031 MD032 MD036 -->
# @hugov/unnode

*minimal bundling for near unbundled web development*

• [Example](#example) • [Goals](#goals) • [License](#license)

## Example

```javascript
import a from '/web_modules/moduleName.js'       // import a from 'moduleName' in node
import b from '/web_modules/moduleName/index.js' // import b from 'moduleName' in node
import('./web_modules/moduleName/src/util.js')   // import ('moduleName/src/util.js') in node
```

```sh
##     target dir  chain of esbuild options
unnode web_modules minify sourcemap=true #will bundle all references starting with web_modules
```

## Notes
- used for static site where the source code is served unbundled, as is (e.g. GH pages)
- source html and js files are never changed and can be served as-is
- only bundle node_modules that are requested in the source files
- bundle once, even if imported multiple times
- local ./bundles or shared /bundles
- import bare modules `myModule.js` or parts of a module `myModule/src/util.js`
- esbuild build options

see [schem.ist](schem.ist) source code for example use

# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
