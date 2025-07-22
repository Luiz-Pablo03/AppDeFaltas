let cache = {};

export default {
  setItem: jest.fn((key, value) => {
    return new Promise((resolve) => {
      cache[key] = value;
      resolve(null);
    });
  }),

  getItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(cache[key] || null);
    });
  }),

  removeItem: jest.fn((key) => {
    return new Promise((resolve) => {
      delete cache[key];
      resolve(null);
    });
  }),

  clear: jest.fn(() => {
    return new Promise((resolve) => {
      cache = {};
      resolve(null);
    });
  }),
};
