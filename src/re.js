/*
Patch releases: 1.0 or 1.0.x or ~1.0.4
Minor releases: 1 or 1.x or ^1.0.4
Major releases: * or x
*/

const r = String.raw,
			char = r`\w\-$~^*!&()+,;=`,
			word = r`(?!min\W|js\W)[${char}]+`,
			scope = r`(?<scope>@[${char}]+)`,
			module = r`(?<module>[${char}]+)`,
			file = r`(?:[./](?<file>${word}(?:\.${word})*))`,
			minified = r`(?<minified>\.min)`

export default RegExp(r`\/[.\/${char}]*npm[.\/](?:${scope}[.\/])?${module}${file}?${minified}?\.js(?![${char}])`, 'g')
