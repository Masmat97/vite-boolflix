<script>
import axios from 'axios';
import { store } from '../data/store.js';


export default {
    name: 'AppHeader',
    data() {
        return {
            query: '',
         
        };

    },

    computed: {
        moviesSearch() {
            return store.films;
        },
        seriesSearch() {
            return store.serie;
        }
    },
    methods: {
        // chiamata axios per i film
        films() {
            if (this.query) {
                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: '1d03bbfe81394b9ece2878065d077b7c',
                        query: this.query
                    }
                }).then(response => {
                    store.setFilms(response.data.results);
                    console.log(response.data.results)
                })
            };
        },
        // chiamata axios per le serie
        serie() {
            if (this.query) {
                axios.get('https://api.themoviedb.org/3/tv/top_rated', {
                    params: {
                        api_key: '1d03bbfe81394b9ece2878065d077b7c',
                        query: this.query
                    }
                }).then(response => {
                    store.setSerie(response.data.results);
                    console.log(response.data)
                })
            };
        },

    },
    mounted() {

    }
}
</script>

<template>
    <div class="search-container">
        <input v-model="query" type="text" placeholder="Scegli nome" />
        <button @click="films">Cerca</button>
        <div class="results">
            <div v-for="film in films" :key="film.id" class="result-item">
                <img :src="'https://image.tmdb.org/t/p/w342' + film.poster_path" :alt="film.title">
                <h2>{{ film.title }}</h2>
                <p><strong>Original Title:</strong> {{ film.original_title }}</p>
                <p><strong>Language:</strong> {{ film.original_language }}</p>
                <p><strong>Vote:</strong> {{ film.vote_average }}</p>
            </div>
        </div>
    </div>

    <div class="search-container">
        <input v-model="query" type="text" placeholder="Scegli nome" />
        <button @click="serie">Cerca</button>
        <div class="results">
            <div v-for="tv in serie" :key="tv.id" class="result-item">
                <img :src="'https://image.tmdb.org/t/p/w342' + tv.poster_path" :alt="tv.title">
                <h2>{{ serie.name }}</h2>
                <p><strong>Original Title:</strong> {{ tv.original_name }}</p>
                <p><strong>Language:</strong> {{ tv.original_language }}</p>
                <p><strong>Vote:</strong> {{ tv.vote_average }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-container{
    color: white;
}
</style>
