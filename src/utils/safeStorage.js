const safeStorage = {
  get: (key) => {
    if (typeof window === 'undefined') {
      console.warn('Window object is not available');
      return null;
    }

    try {
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);

      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn('Storage access is restricted:', error);
      return null;
    }
  },

  set: (key, value) => {
    if (typeof window === 'undefined') {
      console.warn('Window object is not available');
      return false;
    }

    try {
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);

      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Storage access is restricted:', error);
      return false;
    }
  }
};

export default safeStorage;