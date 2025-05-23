// Wrapper seguro para localStorage
const safeStorage = {
  get: (key) => {
    if (typeof window === 'undefined') {
      console.warn('Window object is not available');
      return null;
    }

    // Check if localStorage is accessible
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

    // Check if localStorage is accessible
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
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Erro ao remover do localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Erro ao limpar localStorage:', error);
      return false;
    }
  },

  isAvailable: () => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default safeStorage;