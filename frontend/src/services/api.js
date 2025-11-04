import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://pagepicks-backend.railway.app/api';

// Simple cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Create axios instances
export const authAPI = axios.create({
  baseURL: BASE_URL + '/auth',
});

export const booksAPI = axios.create({
  baseURL: BASE_URL + '/books',
});

export const libraryAPI = axios.create({
  baseURL: BASE_URL + '/library',
});

// Add token to requests automatically
const addAuthToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Request interceptors
authAPI.interceptors.request.use(addAuthToken);
booksAPI.interceptors.request.use(addAuthToken);
libraryAPI.interceptors.request.use(addAuthToken);

// Response interceptors for error handling
const handleResponseError = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

authAPI.interceptors.response.use(response => response, handleResponseError);
booksAPI.interceptors.response.use(response => response, handleResponseError);
libraryAPI.interceptors.response.use(response => response, handleResponseError);

// Book API functions
export const bookService = {
  // Get all books
  getAllBooks: async () => {
    const cacheKey = 'all-books';
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return { data: cachedData };
    }

    const response = await booksAPI.get('/');
    setCachedData(cacheKey, response.data);
    return response;
  },

  // Get book by ID
  getBookById: async (id) => {
    const cacheKey = `book-${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return { data: cachedData };
    }

    const response = await booksAPI.get(`/${id}`);
    setCachedData(cacheKey, response.data);
    return response;
  },

  // Get books by genre
  getBooksByGenre: async (genre) => {
    const cacheKey = `books-genre-${genre}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return { data: cachedData };
    }

    const response = await booksAPI.get(`/?genre=${genre}`);
    setCachedData(cacheKey, response.data);
    return response;
  },

  // Create new book
  createBook: (bookData) => booksAPI.post('/', bookData),

  // Update book
  updateBook: (id, bookData) => booksAPI.put(`/${id}`, bookData),

  // Delete book
  deleteBook: (id) => booksAPI.delete(`/${id}`),

  // Get popular books (limit to 4)
  getPopularBooks: async () => {
    const cacheKey = 'popular-books';
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return { data: cachedData };
    }

    const response = await booksAPI.get('/?limit=4');
    setCachedData(cacheKey, response.data);
    return response;
  },

  // Search books
  searchBooks: (query) => booksAPI.get(`/search?q=${query}`)
};

// Library API functions
export const libraryService = {
  // Add book to user's library
  addToLibrary: (bookId) => libraryAPI.post('/add', { bookId }),

  // Get user's library
  getUserLibrary: () => libraryAPI.get('/'),

  // Remove book from user's library
  removeFromLibrary: (bookId) => libraryAPI.delete(`/remove/${bookId}`),

  // Check if book is in user's library
  isInLibrary: async (bookId) => {
    try {
      const library = await libraryService.getUserLibrary();
      return library.data.some(item => item.book._id === bookId);
    } catch (error) {
      return false;
    }
  }
};