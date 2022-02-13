import { readdirSync } from 'fs'
import Path from 'path'

export default function(root, each) {
	root = Path.resolve(process.cwd(), root)
	return getDir(root, each)
}

function getDir(name, each) {
	for (const dirent of readdirSync(name, {withFileTypes: true})) {
		if (dirent.isDirectory()) getDir(Path.resolve(name, dirent.name), each)
		else if (dirent.isFile()) each(Path.resolve(name, dirent.name))
	}
}
