import { readFileSync } from 'fs'
import Path from 'path'
import RE from './re.js'
import walk from 'ignore-walk'

export default function(root, devFolder) {
	const found = {},
				pathRE = RE(devFolder)
	for (const origin of walk.sync({ignoreFiles: [ '.gitignore', '.npmignore', '.ignore' ]})) {
		for (const match of readFileSync(origin, 'utf8')?.matchAll(pathRE)) {
			const {base, module, subpath} = match.groups,
						tgt = base[0] === '/' ? Path.resolve(root, devFolder) : Path.resolve(Path.dirname(origin), base, devFolder),
						imp = subpath[0]==='.' ? module : module+subpath
			if (!found[tgt]) found[tgt] = {}
			found[tgt][imp.replace(/\..?js$/,'')] = imp
		}
	}
	return found
}

