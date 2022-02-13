import { readFileSync } from 'fs'
import withFiles from './each-file.js'
import jsRE from './re.js'

const extRE = /.(?:html|js)$/
/*
	@n/n/d/f.js  ==> @n/n   d/f.js   //as-is
	@n.n.d.f.js  ==> @n/n   d/f.js   //as-is

	@n/n.js      ==> @n     n.js     //browser.js
	@n/n.js      ==> @n     n.js     //browser.js
*/
export default function(root) {
	const map = {}
	withFiles(root, name => {
		if (extRE.test(name))
			for (const match of readFileSync(name, 'utf8')?.matchAll(jsRE))
				map[match[0]] = match.groups
	})
	return map
}
