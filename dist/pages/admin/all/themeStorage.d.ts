/** localStorage key for admin dark vs light preference (EverShop admin extension). */
export declare const ADMIN_THEME_STORAGE_KEY = "evershop_admin_dark_mode";
/** Default: dark mode on when unset. */
export declare function readAdminDarkPreference(): boolean;
export declare function writeAdminDarkPreference(enabled: boolean): void;
/** Applies or removes the root class used by scoped dark CSS. */
export declare function applyAdminDarkClassToDocument(enabled: boolean): void;
