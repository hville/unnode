#!/usr/bin/env node
import pack from './index.js'

const args = process.argv.slice(2)
if (args.length) args.map( pack )
else pack()


/* const path = require('path')
function resolveArg (arg) {
	return path.resolve(process.cwd(), arg)
}
 */
