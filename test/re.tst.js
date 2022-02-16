import RE from '../src/re.js'
const re = RE('_npm')

function test1(str, ref) {
	const grp = re.exec(str)?.groups
	re.lastIndex=0
	if (!grp) return console.error('failed to parse', str.replace('\n', '\\n'))
	for (const k of Object.keys(grp)) console.assert(grp[k] === ref[k], `${k}: ${grp[k]} !== ${ref[k]} in ${str}`)
}
function test(str, ref) {
	test1(str, ref)
	test1(`import a from "${str}"\n`, ref)
	test1(`import a from '${str}'\n`, ref)
	test1(`import '${str}'\n`, ref)
	test1(`import "${str}"\n`, ref)
	test1(`src=${str}>`, ref)
	test1(`src=${str} >`, ref)
	test1(`src="${str}">`, ref)
	test1(`src='${str}'>`, ref)
}

//module with added file extention
test(`/_npm/mod.js`, {base:'/', module:'mod', subpath:'.js'})
test(`./_npm/mod.js`, {base:'./', module:'mod', subpath:'.js'})
test(`/_npm/@scope/mod.js`, {base:'/', module:'@scope/mod', subpath:'.js'})
test(`./_npm/@scope/mod.js`, {base:'./', module:'@scope/mod', subpath:'.js'})
test(`./_npm/@scope/my-mod.js`, {base:'./', module:'@scope/my-mod', subpath:'.js'})

//sub-module direct file
test(`/_npm/mod/file.js`, {base:'/', module:'mod', subpath:'/file.js'})
test(`/_npm/mod/file.min.js`, {base:'/', module:'mod', subpath:'/file.min.js'})
test(`/_npm/mod/sub/file.js`, {base:'/', module:'mod', subpath:'/sub/file.js'})
test(`../_npm/mod/sub/file.min.js`, {base:'../', module:'mod', subpath:'/sub/file.min.js'})
