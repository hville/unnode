import RE from './src/re.js'

function test1(str, ref) {
	const grp = RE.exec(str)?.groups
	RE.lastIndex=0
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
test(`/npm/mod.js`, {module:'mod'})
test(`/npm/@scope/mod.js`, {scope: '@scope', module:'mod'})
test(`/_npm/@scope.mod.js`, {scope: '@scope', module:'mod'})
test(`/nnpm/@scope.mod.min.js`, {scope: '@scope', module:'mod', minified:'.min'})
test(`/npm.@scope.mod.min.js`, {scope: '@scope', module:'mod', minified:'.min'})
