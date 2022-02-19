/*
Patch releases: 1.0 or 1.0.x or ~1.0.4
Minor releases: 1 or 1.x or ^1.0.4
Major releases: * or x

http://www.faqs.org/rfcs/rfc1738.html
hpath          = hsegment *[ "/" hsegment ]
hsegment       = *[ uchar | ";" | ":" | "@" | "&" | "=" ]
uchar          = unreserved | escape
unreserved     = alpha | digit | safe | extra
safe           = "$" | "-" | "_" | "." | "+"
extra          = "!" | "*" | "'" | "(" | ")" | "," //NOT USED

https://www.ietf.org/rfc/rfc3986.txt
segment       = *pchar
pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"
sub-delims  = "!" / "$" / "&" / "'" / "(" / ")"
                  / "*" / "+" / "," / ";" / "="

https://datatracker.ietf.org/doc/html/rfc8187
*/

const r = String.raw,
			char = r`[a-zA-Z0-9\-_~!$&()*+]`,
			base = r`(?<base>[./]+)`,
			module = r`(?<module>(?:@${char}+\/)?${char}+)`,
			subpath = r`(?<subpath>(?:${char}|\.|\/)*.js)`

export default devPath => RegExp(
	r`(?<!${char})${base}${devPath}\/${module}${subpath}`,
	'g'
)

/* const r = String.raw,
			char = '[^= <>\'""``]',
			word = r`(?!min\W|js\W)${char}+`,
			scope = r`(?<scope>@${char}+)`,
			module = r`(?<module>${char}+)`,
			file = r`(?:[./](?<file>${word}(?:\.${word})*))`,
			minified = r`(?<minified>\.min)`

export default function (devFolder) {
	return RegExp(
		r`\.?\/${devFolder}\/(?:${scope}\/)?${module}${file}?${minified}?\.js(?!${char})`,
		'g'
	)
}
 */
