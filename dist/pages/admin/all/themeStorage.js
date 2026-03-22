/** localStorage key for admin dark vs light preference (EverShop admin extension). */
export const ADMIN_THEME_STORAGE_KEY = 'evershop_admin_dark_mode';
/** Default: dark mode on when unset. */
export function readAdminDarkPreference() {
    if (typeof window === 'undefined')
        return true;
    try {
        const raw = window.localStorage.getItem(ADMIN_THEME_STORAGE_KEY);
        if (raw === null)
            return true;
        return raw !== 'false';
    }
    catch (_a) {
        return true;
    }
}
export function writeAdminDarkPreference(enabled) {
    if (typeof window === 'undefined')
        return;
    try {
        window.localStorage.setItem(ADMIN_THEME_STORAGE_KEY, String(enabled));
    }
    catch (_a) {
        /* ignore quota / private mode */
    }
}
/** Applies or removes the root class used by scoped dark CSS. */
export function applyAdminDarkClassToDocument(enabled) {
    if (typeof document === 'undefined')
        return;
    document.documentElement.classList.toggle('admin-dark-mode', enabled);
}
//# sourceMappingURL=themeStorage.js.map