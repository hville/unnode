#!/usr/bin/env node
import pack from './index.js'

const args = process.argv.slice(2),
			name = args.shift(),
			opts = {}
for (let arg of args) {
	const [key, val] = arg.split('=')
	opts[key] = val ? JSON.parse(val) : true
}
console.log(opts)
pack(name, opts)
