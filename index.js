import getImports from './src/get-imports.js'
import bundle from './src/bundle.js'

export default function(cwd=process.cwd()) {
	const imp = getImports(cwd)
	console.log(cwd)
	console.log(imp)
	for (const f of Object.keys(imp)) {
		const grp = imp[f],
					input = `${ grp.scope ? grp.scope+'/' : '' }${ grp.module }${ grp.file ? grp.file+'.js' : ''}`
		console.log('from', input, 'to', f)
		bundle(input, f)
	}
}

/*
let esbuild = require('esbuild')
let result1 = esbuild.transformSync(code, options)
let result2 = esbuild.buildSync(options)

require('esbuild').transformSync('let x: number = 1', {
	format: 'esm',
	minify: true,
  loader: 'ts',
})
{
  code: 'let x = 1;\n',
  map: '',
  warnings: []
}
require('esbuild').buildSync({
  entryPoints: ['in.ts'],
	bundle: true,
  outfile: 'out.js',
})
{ errors: [], warnings: [] }

*/
