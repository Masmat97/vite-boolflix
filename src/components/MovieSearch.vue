<script>
import axios from 'axios';
import { store } from '../data/store.js';

export default {
  name: 'MovieSearch',
  data() {
    return {
      query: ''
    };
  },
  computed: {
    movies() {
      return store.movies;
    }
  },
  methods: {
    async searchMovies() {
      if (this.query) {
        try {
          const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key: '1d03bbfe81394b9ece2878065d077b7c',
              query: this.query
            }
          });
          store.setMovies(response.data.results);
          console.log(response.data)
        } catch  {
          
        }
      }
    }
  }
};
</script>

<template>

  <div class="search-container">
    <input v-model="query" type="text" placeholder="Scegli nome" />
    <button @click="searchMovies">Cerca</button>
    <div class="results">
        <div v-for="movie in movies" :key="movie.id" class="result-item">
          <h2>{{ movie.title }}</h2>
          <p><strong>Original Title:</strong> {{ movie.original_title }}</p>
          <p><strong>Language:</strong> {{ movie.original_language }}</p>
          <p><strong>Vote:</strong> {{ movie.vote_average }}</p>
        </div>
    </div>
  </div>
</template>

<style></style>