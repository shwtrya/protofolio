export const isStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn('Storage availability check failed:', error);
    return false;
  }
};

export const safeGetItem = (
  key: string,
  defaultValue: string | null = null
): string | null => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }
    const value = window.localStorage.getItem(key);
    return value ?? defaultValue;
  } catch (error) {
    console.warn(`Storage getItem failed for key "${key}":`, error);
    return defaultValue;
  }
};

export const safeSetItem = (key: string, value: string): boolean => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Storage setItem failed for key "${key}":`, error);
    return false;
  }
};

export const safeParseInt = (value: string | null, defaultValue = 0): number => {
  if (value === null) {
    return defaultValue;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
};
