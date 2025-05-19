// Wrapper seguro para localStorage
const safeStorage = {
  get: (key) => {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('Local storage is not available');
      return null;
    }
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Erro ao salvar no localStorage:', error);
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