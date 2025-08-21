/*
 * PROJECT 3: MOVIE DATABASE EXPLORER
 * 
 * Concepts Tested:
 * - Async/await mastery
 * - Promise handling (Promise.all, Promise.allSettled, Promise.race)
 * - Error handling with try/catch
 * - API simulation and network requests
 * - Advanced array methods with async operations
 * - Generator functions
 * - Async iteration
 * - Retry mechanisms and timeouts
 */

// Mock API data
const MOCK_MOVIES = [
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    director: "The Wachowskis",
    rating: 8.7,
    runtime: 136,
    plot: "A computer programmer discovers that reality as he knows it is a simulation.",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    poster: "https://example.com/matrix.jpg",
    boxOffice: 463517383
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    rating: 8.8,
    runtime: 148,
    plot: "A thief who steals corporate secrets through dream-sharing technology.",
    actors: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    poster: "https://example.com/inception.jpg",
    boxOffice: 836836967
  },
  {
    id: 3,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    rating: 9.2,
    runtime: 175,
    plot: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    poster: "https://example.com/godfather.jpg",
    boxOffice: 245066411
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    rating: 8.9,
    runtime: 154,
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine.",
    actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    poster: "https://example.com/pulpfiction.jpg",
    boxOffice: 214179088
  },
  {
    id: 5,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    rating: 9.0,
    runtime: 152,
    plot: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    poster: "https://example.com/darkknight.jpg",
    boxOffice: 1004558444
  }
];

const MOCK_REVIEWS = {
  1: [
    { id: 1, userId: "user1", rating: 9, comment: "Mind-blowing movie!", timestamp: "2024-01-15" },
    { id: 2, userId: "user2", rating: 8, comment: "Great action sequences", timestamp: "2024-01-16" }
  ],
  2: [
    { id: 3, userId: "user3", rating: 10, comment: "Nolan's masterpiece!", timestamp: "2024-01-17" },
    { id: 4, userId: "user1", rating: 9, comment: "Complex but rewarding", timestamp: "2024-01-18" }
  ],
  3: [
    { id: 5, userId: "user4", rating: 10, comment: "The greatest movie ever made", timestamp: "2024-01-19" }
  ]
};

// Utility function to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility function to simulate random failures
const simulateNetworkFailure = (failureRate = 0.1) => {
  if (Math.random() < failureRate) {
    throw new Error('Network error: Connection timeout');
  }
};

// Mock API Client class
class MovieAPIClient {
  constructor(baseURL = 'https://api.moviedb.com', options = {}) {
    this.baseURL = baseURL;
    this.timeout = options.timeout || 5000;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.requestCache = new Map();
  }

  // Simulate API request with caching
  async request(endpoint, options = {}) {
    const { useCache = true, timeout = this.timeout } = options;
    const cacheKey = `${endpoint}:${JSON.stringify(options)}`;

    // Check cache first
    if (useCache && this.requestCache.has(cacheKey)) {
      console.log(`📋 Cache hit for: ${endpoint}`);
      await delay(50); // Simulate cache lookup time
      return this.requestCache.get(cacheKey);
    }

    console.log(`🌐 API Request: ${endpoint}`);
    
    // Simulate network delay
    const networkDelay = Math.random() * 800 + 200; // 200-1000ms
    await delay(networkDelay);

    // Simulate network failure
    simulateNetworkFailure(0.15); // 15% failure rate

    // Mock response data
    let responseData;
    
    if (endpoint === '/movies') {
      responseData = { movies: MOCK_MOVIES, total: MOCK_MOVIES.length };
    } else if (endpoint.startsWith('/movies/')) {
      const movieId = parseInt(endpoint.split('/')[2]);
      const movie = MOCK_MOVIES.find(m => m.id === movieId);
      if (!movie) throw new Error(`Movie with ID ${movieId} not found`);
      responseData = { movie };
    } else if (endpoint.includes('/reviews')) {
      const movieId = parseInt(endpoint.split('/')[2]);
      responseData = { reviews: MOCK_REVIEWS[movieId] || [] };
    } else if (endpoint === '/search') {
      const query = options.query?.toLowerCase() || '';
      const filteredMovies = MOCK_MOVIES.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.actors.some(actor => actor.toLowerCase().includes(query))
      );
      responseData = { movies: filteredMovies, total: filteredMovies.length };
    } else {
      throw new Error(`Unknown endpoint: ${endpoint}`);
    }

    const response = {
      data: responseData,
      status: 200,
      headers: { 'content-type': 'application/json' }
    };

    // Cache successful responses
    if (useCache) {
      this.requestCache.set(cacheKey, response);
    }

    return response;
  }

  // Retry mechanism with exponential backoff
  async requestWithRetry(endpoint, options = {}) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await this.request(endpoint, options);
      } catch (error) {
        lastError = error;
        console.log(`⚠️ Attempt ${attempt} failed: ${error.message}`);
        
        if (attempt === this.retryAttempts) {
          throw new Error(`Request failed after ${this.retryAttempts} attempts: ${error.message}`);
        }
        
        // Exponential backoff
        const backoffDelay = this.retryDelay * Math.pow(2, attempt - 1);
        console.log(`⏳ Retrying in ${backoffDelay}ms...`);
        await delay(backoffDelay);
      }
    }
  }

  // Request with timeout
  async requestWithTimeout(endpoint, options = {}) {
    const { timeout = this.timeout } = options;
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    );

    const requestPromise = this.requestWithRetry(endpoint, options);

    return Promise.race([requestPromise, timeoutPromise]);
  }
}

// Movie Database Explorer class
class MovieDatabaseExplorer {
  constructor() {
    this.api = new MovieAPIClient();
    this.favorites = new Set();
    this.watchlist = new Set();
    this.cache = new Map();
  }

  // Basic movie fetching
  async getAllMovies() {
    try {
      console.log('🎬 Fetching all movies...');
      const response = await this.api.requestWithTimeout('/movies');
      return response.data.movies;
    } catch (error) {
      console.error('Failed to fetch movies:', error.message);
      throw error;
    }
  }

  // Get single movie with details
  async getMovieDetails(movieId) {
    try {
      console.log(`🎭 Fetching details for movie ID: ${movieId}`);
      const response = await this.api.requestWithTimeout(`/movies/${movieId}`);
      return response.data.movie;
    } catch (error) {
      console.error(`Failed to fetch movie ${movieId}:`, error.message);
      throw error;
    }
  }

  // Get movie reviews
  async getMovieReviews(movieId) {
    try {
      console.log(`📝 Fetching reviews for movie ID: ${movieId}`);
      const response = await this.api.requestWithTimeout(`/movies/${movieId}/reviews`);
      return response.data.reviews;
    } catch (error) {
      console.error(`Failed to fetch reviews for movie ${movieId}:`, error.message);
      return []; // Return empty array on error
    }
  }

  // Fetch movie with all related data
  async getCompleteMovieData(movieId) {
    try {
      console.log(`📊 Fetching complete data for movie ID: ${movieId}`);
      
      // Fetch movie details and reviews concurrently
      const [movieResponse, reviews] = await Promise.allSettled([
        this.getMovieDetails(movieId),
        this.getMovieReviews(movieId)
      ]);

      // Handle movie details result
      const movie = movieResponse.status === 'fulfilled' 
        ? movieResponse.value 
        : null;

      // Handle reviews result
      const movieReviews = reviews.status === 'fulfilled' 
        ? reviews.value 
        : [];

      if (!movie) {
        throw new Error('Failed to fetch movie details');
      }

      // Calculate average rating from reviews
      const averageReviewRating = movieReviews.length > 0
        ? movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length
        : null;

      return {
        ...movie,
        reviews: movieReviews,
        reviewCount: movieReviews.length,
        averageReviewRating: averageReviewRating ? Math.round(averageReviewRating * 10) / 10 : null
      };
    } catch (error) {
      console.error(`Failed to fetch complete movie data:`, error.message);
      throw error;
    }
  }

  // Batch fetch multiple movies
  async getMultipleMovies(movieIds, { concurrent = true, batchSize = 3 } = {}) {
    if (concurrent) {
      console.log(`📦 Fetching ${movieIds.length} movies concurrently...`);
      
      // Use Promise.allSettled to handle partial failures
      const results = await Promise.allSettled(
        movieIds.map(id => this.getCompleteMovieData(id))
      );

      // Separate successful and failed results
      const successful = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

      const failed = results
        .filter(result => result.status === 'rejected')
        .map((result, index) => ({
          movieId: movieIds[index],
          error: result.reason.message
        }));

      return { successful, failed };
    } else {
      // Sequential processing with batching
      console.log(`📦 Fetching ${movieIds.length} movies in batches of ${batchSize}...`);
      
      const results = { successful: [], failed: [] };
      
      for (let i = 0; i < movieIds.length; i += batchSize) {
        const batch = movieIds.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i / batchSize) + 1}...`);
        
        for (const movieId of batch) {
          try {
            const movieData = await this.getCompleteMovieData(movieId);
            results.successful.push(movieData);
          } catch (error) {
            results.failed.push({ movieId, error: error.message });
          }
          
          // Small delay between requests
          await delay(100);
        }
        
        // Delay between batches
        if (i + batchSize < movieIds.length) {
          await delay(300);
        }
      }
      
      return results;
    }
  }

  // Search movies with debouncing simulation
  async searchMovies(query, options = {}) {
    const { 
      useCache = true, 
      minLength = 2,
      timeout = 3000 
    } = options;

    if (query.length < minLength) {
      return { movies: [], total: 0 };
    }

    try {
      console.log(`🔍 Searching for: "${query}"`);
      
      const response = await this.api.requestWithTimeout('/search', {
        query,
        useCache,
        timeout
      });

      return response.data;
    } catch (error) {
      console.error(`Search failed for "${query}":`, error.message);
      throw error;
    }
  }

  // Advanced filtering with async operations
  async filterMovies(criteria) {
    const {
      genre = null,
      minRating = null,
      maxRating = null,
      yearRange = null,
      director = null,
      minRuntime = null,
      maxRuntime = null
    } = criteria;

    try {
      const allMovies = await this.getAllMovies();
      
      // Apply filters
      const filtered = allMovies.filter(movie => {
        // Genre filter
        if (genre && !movie.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))) {
          return false;
        }
        
        // Rating filter
        if (minRating && movie.rating < minRating) return false;
        if (maxRating && movie.rating > maxRating) return false;
        
        // Year range filter
        if (yearRange) {
          const [startYear, endYear] = yearRange;
          if (movie.year < startYear || movie.year > endYear) return false;
        }
        
        // Director filter
        if (director && !movie.director.toLowerCase().includes(director.toLowerCase())) {
          return false;
        }
        
        // Runtime filter
        if (minRuntime && movie.runtime < minRuntime) return false;
        if (maxRuntime && movie.runtime > maxRuntime) return false;
        
        return true;
      });

      return filtered;
    } catch (error) {
      console.error('Failed to filter movies:', error.message);
      throw error;
    }
  }

  // Generator for streaming movie data
  async *movieStreamGenerator(movieIds) {
    console.log(`🌊 Starting movie stream for ${movieIds.length} movies...`);
    
    for (const movieId of movieIds) {
      try {
        console.log(`⏳ Streaming movie ID: ${movieId}`);
        const movieData = await this.getCompleteMovieData(movieId);
        yield {
          success: true,
          data: movieData,
          movieId
        };
      } catch (error) {
        yield {
          success: false,
          error: error.message,
          movieId
        };
      }
      
      // Small delay between streaming items
      await delay(200);
    }
    
    console.log('🏁 Movie stream completed');
  }

  // Process streaming data
  async processMovieStream(movieIds, processor) {
    const results = [];
    
    for await (const result of this.movieStreamGenerator(movieIds)) {
      if (result.success) {
        try {
          const processed = await processor(result.data);
          results.push(processed);
        } catch (error) {
          console.error(`Processing error for movie ${result.movieId}:`, error.message);
        }
      } else {
        console.error(`Stream error for movie ${result.movieId}:`, result.error);
      }
    }
    
    return results;
  }

  // Get recommendations based on user preferences
  async getRecommendations(preferences = {}) {
    const {
      favoriteGenres = [],
      minRating = 7.0,
      preferredDirectors = [],
      excludeWatched = true
    } = preferences;

    try {
      console.log('🎯 Generating recommendations...');
      
      const allMovies = await this.getAllMovies();
      
      // Score movies based on preferences
      const scoredMovies = allMovies
        .filter(movie => {
          // Exclude already watched if requested
          if (excludeWatched && this.watchlist.has(movie.id)) {
            return false;
          }
          
          // Minimum rating filter
          return movie.rating >= minRating;
        })
        .map(movie => {
          let score = movie.rating; // Base score from rating
          
          // Bonus for favorite genres
          const genreBonus = movie.genre.filter(genre => 
            favoriteGenres.some(fav => genre.toLowerCase().includes(fav.toLowerCase()))
          ).length * 0.5;
          
          // Bonus for preferred directors
          const directorBonus = preferredDirectors.some(director =>
            movie.director.toLowerCase().includes(director.toLowerCase())
          ) ? 1.0 : 0;
          
          score += genreBonus + directorBonus;
          
          return { ...movie, recommendationScore: score };
        })
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 10); // Top 10 recommendations

      return scoredMovies;
    } catch (error) {
      console.error('Failed to generate recommendations:', error.message);
      throw error;
    }
  }

  // Analytics and statistics
  async getMovieStatistics() {
    try {
      console.log('📈 Calculating movie statistics...');
      
      const movies = await this.getAllMovies();
      
      const stats = {
        totalMovies: movies.length,
        averageRating: movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length,
        averageRuntime: movies.reduce((sum, movie) => sum + movie.runtime, 0) / movies.length,
        totalBoxOffice: movies.reduce((sum, movie) => sum + movie.boxOffice, 0),
        genreDistribution: {},
        decadeDistribution: {},
        topDirectors: {},
        ratingDistribution: {
          excellent: movies.filter(m => m.rating >= 9).length,
          good: movies.filter(m => m.rating >= 8 && m.rating < 9).length,
          average: movies.filter(m => m.rating >= 7 && m.rating < 8).length,
          poor: movies.filter(m => m.rating < 7).length
        }
      };

      // Calculate genre distribution
      movies.forEach(movie => {
        movie.genre.forEach(genre => {
          stats.genreDistribution[genre] = (stats.genreDistribution[genre] || 0) + 1;
        });
      });

      // Calculate decade distribution
      movies.forEach(movie => {
        const decade = Math.floor(movie.year / 10) * 10 + 's';
        stats.decadeDistribution[decade] = (stats.decadeDistribution[decade] || 0) + 1;
      });

      // Calculate director frequency
      movies.forEach(movie => {
        stats.topDirectors[movie.director] = (stats.topDirectors[movie.director] || 0) + 1;
      });

      // Round averages
      stats.averageRating = Math.round(stats.averageRating * 100) / 100;
      stats.averageRuntime = Math.round(stats.averageRuntime);

      return stats;
    } catch (error) {
      console.error('Failed to calculate statistics:', error.message);
      throw error;
    }
  }

  // Wishlist management
  addToWatchlist(...movieIds) {
    movieIds.forEach(id => this.watchlist.add(id));
    console.log(`📚 Added ${movieIds.length} movie(s) to watchlist`);
  }

  addToFavorites(...movieIds) {
    movieIds.forEach(id => this.favorites.add(id));
    console.log(`❤️ Added ${movieIds.length} movie(s) to favorites`);
  }

  getWatchlistMovies() {
    return [...this.watchlist];
  }

  getFavoriteMovies() {
    return [...this.favorites];
  }
}

// Demo usage and testing
async function demonstrateMovieExplorer() {
  console.log('🎬 MOVIE DATABASE EXPLORER DEMO\n');
  
  const explorer = new MovieDatabaseExplorer();

  try {
    // 1. Fetch all movies
    console.log('=== 1. FETCHING ALL MOVIES ===');
    const allMovies = await explorer.getAllMovies();
    console.log(`✅ Found ${allMovies.length} movies`);
    allMovies.slice(0, 3).forEach(movie => {
      console.log(`- ${movie.title} (${movie.year}) - Rating: ${movie.rating}/10`);
    });
    console.log();

    // 2. Get complete movie data
    console.log('=== 2. DETAILED MOVIE DATA ===');
    const movieDetails = await explorer.getCompleteMovieData(1);
    console.log(`📖 Complete data for "${movieDetails.title}":`);
    console.log(`   Director: ${movieDetails.director}`);
    console.log(`   Runtime: ${movieDetails.runtime} minutes`);
    console.log(`   Reviews: ${movieDetails.reviewCount} (Avg: ${movieDetails.averageReviewRating || 'N/A'})`);
    console.log();

    // 3. Batch processing demonstration
    console.log('=== 3. BATCH PROCESSING ===');
    const batchResults = await explorer.getMultipleMovies([1, 2, 3], { concurrent: true });
    console.log(`✅ Successfully fetched: ${batchResults.successful.length} movies`);
    console.log(`❌ Failed to fetch: ${batchResults.failed.length} movies`);
    if (batchResults.failed.length > 0) {
      batchResults.failed.forEach(failure => {
        console.log(`   - Movie ID ${failure.movieId}: ${failure.error}`);
      });
    }
    console.log();

    // 4. Search functionality
    console.log('=== 4. SEARCH FUNCTIONALITY ===');
    const searchResults = await explorer.searchMovies('Matrix');
    console.log(`🔍 Search results for "Matrix": ${searchResults.movies.length} found`);
    searchResults.movies.forEach(movie => {
      console.log(`   - ${movie.title} (${movie.year})`);
    });
    console.log();

    // 5. Advanced filtering
    console.log('=== 5. ADVANCED FILTERING ===');
    const filteredMovies = await explorer.filterMovies({
      genre: 'Action',
      minRating: 8.5,
      yearRange: [1990, 2020]
    });
    console.log(`🎯 Filtered movies (Action, Rating ≥ 8.5, 1990-2020): ${filteredMovies.length}`);
    filteredMovies.forEach(movie => {
      console.log(`   - ${movie.title} (${movie.year}) - ${movie.rating}/10`);
    });
    console.log();

    // 6. Streaming data processing
    console.log('=== 6. STREAMING DATA PROCESSING ===');
    const streamResults = await explorer.processMovieStream([4, 5], async (movieData) => {
      // Process each movie (e.g., extract key information)
      return {
        title: movieData.title,
        director: movieData.director,
        rating: movieData.rating,
        hasReviews: movieData.reviewCount > 0
      };
    });
    console.log(`🌊 Processed ${streamResults.length} movies through stream:`);
    streamResults.forEach(result => {
      console.log(`   - ${result.title} by ${result.director} (${result.rating}/10)${result.hasReviews ? ' 📝' : ''}`);
    });
    console.log();

    // 7. Recommendations
    console.log('=== 7. MOVIE RECOMMENDATIONS ===');
    explorer.addToWatchlist(1, 2); // Exclude these from recommendations
    const recommendations = await explorer.getRecommendations({
      favoriteGenres: ['Action', 'Sci-Fi'],
      minRating: 8.0,
      preferredDirectors: ['Christopher Nolan'],
      excludeWatched: true
    });
    console.log(`🎯 Top recommendations: ${recommendations.length}`);
    recommendations.slice(0, 5).forEach((movie, index) => {
      console.log(`   ${index + 1}. ${movie.title} (Score: ${movie.recommendationScore.toFixed(1)})`);
    });
    console.log();

    // 8. Statistics
    console.log('=== 8. MOVIE STATISTICS ===');
    const stats = await explorer.getMovieStatistics();
    console.log(`📊 Database Statistics:`);
    console.log(`   Total Movies: ${stats.totalMovies}`);
    console.log(`   Average Rating: ${stats.averageRating}/10`);
    console.log(`   Average Runtime: ${stats.averageRuntime} minutes`);
    console.log(`   Total Box Office: $${(stats.totalBoxOffice / 1000000).toFixed(0)}M`);
    console.log(`   Top Genre: ${Object.entries(stats.genreDistribution).sort((a, b) => b[1] - a[1])[0][0]}`);
    console.log(`   Rating Distribution: ${stats.ratingDistribution.excellent} excellent, ${stats.ratingDistribution.good} good`);
    console.log();

    // 9. Error handling demonstration
    console.log('=== 9. ERROR HANDLING ===');
    try {
      await explorer.getMovieDetails(999); // Non-existent movie
    } catch (error) {
      console.log(`❌ Expected error handled: ${error.message}`);
    }

    // 10. Wishlist management
    console.log('\n=== 10. WISHLIST MANAGEMENT ===');
    explorer.addToFavorites(1, 3, 5);
    explorer.addToWatchlist(2, 4);
    console.log(`📚 Watchlist: ${explorer.getWatchlistMovies().length} movies`);
    console.log(`❤️ Favorites: ${explorer.getFavoriteMovies().length} movies`);

    console.log('\n🎉 Movie Database Explorer Demo Complete!');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
  }
}

// Error handling utilities for async operations
class AsyncErrorHandler {
  static async withFallback(primaryOperation, fallbackOperation) {
    try {
      return await primaryOperation();
    } catch (error) {
      console.log(`⚠️ Primary operation failed, using fallback: ${error.message}`);
      return await fallbackOperation();
    }
  }

  static async withTimeout(operation, timeoutMs, timeoutMessage = 'Operation timed out') {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs)
    );
    
    return Promise.race([operation(), timeoutPromise]);
  }

  static async retryOperation(operation, maxRetries = 3, delayMs = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        
        console.log(`⚠️ Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
        await delay(delayMs);
        delayMs *= 2; // Exponential backoff
      }
    }
  }
}

// Run the demonstration
console.log('Starting Movie Database Explorer...\n');
demonstrateMovieExplorer().catch(error => {
  console.error('💥 Fatal error:', error);
});