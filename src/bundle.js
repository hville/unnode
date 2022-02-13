/* import { promises as fs } from 'fs'
import {resolve, dirname} from 'path'
import {access, readFile, realpath, stat, realpathSync} from 'fs/promises';

import getImports from './get-imports.js'
import {terser} from 'terser' */

/*
ROLLUP
//https://github.com/rollup/plugins/tree/master/packages/auto-install
//https://github.com/mjackson/rollup-plugin-url-resolve
*/
import {rollup} from 'rollup'
import autoInstall from '@rollup/plugin-auto-install'
import nodeResolve from '@rollup/plugin-node-resolve'
import virtual from '@rollup/plugin-virtual'

export default async function(entry, file) {
	const bndl = await rollup({
		input: `./node_modules/${entry}`,
		plugins: [
			autoInstall(),
			nodeResolve({
				mainFields: ['browser', 'module', 'main'],
				browser: true
			})
		]
	})
	await bndl.write({
		file: '.' + file,
		format:'es'
	})
	await bndl.close()
}
/* function outputFile (file, data, encoding) {
	const dir = dirname(file)
	return fs.access(dir)
		.catch( () => fs.mkdir(dir, { recursive: true }) )
		.then( () => fs.writeFile(file, data, encoding) )
}

function minify(src) {
	const res = terser.minify(src)
	if (res.error) throw(res.error)
	return res.code
}
 */
