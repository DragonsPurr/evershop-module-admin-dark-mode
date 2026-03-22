const SCOPE = 'html.admin-dark-mode';
/**
 * Prefixes every rule selector so dark theme only applies when `html` has `.admin-dark-mode`.
 * Strips block comments from selector lists before splitting on commas.
 */
export function scopeAdminDarkCss(css) {
    const parts = css.trim().split('}');
    const out = [];
    for (const raw of parts) {
        const segment = raw.trim();
        if (!segment)
            continue;
        const openIdx = segment.indexOf('{');
        if (openIdx === -1) {
            out.push(segment);
            continue;
        }
        let selPart = segment.slice(0, openIdx);
        const body = segment.slice(openIdx + 1).trim();
        selPart = selPart.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\s+/g, ' ').trim();
        if (!selPart)
            continue;
        const selectors = selPart
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => {
            if (s === ':root')
                return SCOPE;
            return `${SCOPE} ${s}`;
        })
            .join(', ');
        out.push(`${selectors} {\n    ${body}\n  }`);
    }
    return out.join('\n\n');
}
//# sourceMappingURL=scopeAdminDarkCss.js.map