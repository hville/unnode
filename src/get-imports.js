import { readFileSync } from 'fs'
import Path from 'path'
import withFiles from './each-file.js'
import RE from './re.js'

export default function(root, devFolder) {
	const found = {},
				pathRE = RE(devFolder)
	withFiles(root, origin => {
		for (const match of readFileSync(origin, 'utf8')?.matchAll(pathRE)) {
			console.log(origin, match[0])
			const path = match[0],
						{module, subpath, base} = match.groups,
						tgt = base[0] === '/' ? Path.resolve(root, devFolder) : Path.resolve(Path.dirname(origin), base, devFolder),
						src = subpath[0]==='.' ? module : module+subpath
			if (!found[tgt]) found[tgt] = {}
			found[tgt][src.replace(/\.[^./]+$/, '')] = src
		}
	})
	return found
}
