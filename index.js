import getImports from './src/get-imports.js'
import esbuild from 'esbuild'

const defaults = {
	bundle: true,
	//minify: true,
	//sourcemap: true,
	format: 'esm',
	//target: ['esnext'], //default=esnext es2020
}

export default function(devFolder, buildOptions={}) {
	console.log(devFolder, process.cwd())
	const imp = getImports(process.cwd(), devFolder)
	console.log(imp)
	Promise.all(
		Object.keys(imp).map(
			outdir => esbuild.build(
				Object.assign( { entryPoints: imp[outdir], outdir }, defaults, buildOptions )
			)
		)
	).catch(e => process.exit(1))
}

