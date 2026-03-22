/**
 * Prefixes every rule selector so dark theme only applies when `html` has `.admin-dark-mode`.
 * Strips block comments from selector lists before splitting on commas.
 */
export declare function scopeAdminDarkCss(css: string): string;
