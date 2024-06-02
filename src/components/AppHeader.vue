<script>
import axios from 'axios';
import { store } from '../data/store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            query: '',
            newMovies: [],
            newSeries: [],
            imagePrefix: "https://image.tmdb.org/t/p/w500",
        };
    },
    computed: {
        moviesSearch() {
            return store.newMovies;
        },
        seriesSearch() {
            return store.newSeries;
        }
    },
    methods: {
        search() {
            // Ricerca Film
            axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=1d03bbfe81394b9ece2878065d077b7c&query=language=en-US&page=1`)
                .then(response => {
                    store.setNewMovies(response.data.results);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                });

            // Ricerca Serie TV
            axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=1d03bbfe81394b9ece2878065d077b7c&include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200',`)
                .then(response => {
                    store.setNewSeries(response.data.results);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getVote(vote) {
            let newVote = vote / 2;
            newVote = newVote.toFixed(2);
            Math.floor(newVote);
            return newVote
        },
        getStars(vote, numeroStella) {
            let newVote = this.getVote(vote)
            let classe = 'fa-regular fa-star';
            if (newVote >= numeroStella) {
                classe = 'fa fa-star';
            }
            return classe;
        },
        getFlag(language) {
            let result = false;
            if (language == "it") {
                result = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png";
            } else if (language == "en") {
                result = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg";
            }
            return result;
        }
    },
    mounted() {
    }
}
</script>

<template>
    <div class="search-container">
        <input v-model="query" type="text" placeholder="Scegli nome" />
        <button @click="search">Cerca</button>
    </div>
    <div>
        <div v-if="moviesSearch.length" class="card">
            <h2 class="film">Film</h2>
            <div v-for="film in moviesSearch" :key="film.id" class="box">
                <h2>{{ film.title }}</h2>
                <img class="poster" :src="imagePrefix + film.poster_path" alt="">
                <p><strong>Original Title:</strong> {{ film.original_title }}</p>
                <p><strong>Language:</strong> {{ film.original_language }}</p>
                <p><strong>Vote:</strong>
                    <i :class="getStars(film.vote_average, 1)"></i>
                    <i :class="getStars(film.vote_average, 2)"></i>
                    <i :class="getStars(film.vote_average, 3)"></i>
                    <i :class="getStars(film.vote_average, 4)"></i>
                    <i :class="getStars(film.vote_average, 5)"></i>
                </p>
                <img v-if="getFlag(film.original_language)" class="flag" :src="getFlag(film.original_language)" />
                <p v-else>{{ film.original_language }}</p>
                <div class="additional-info">
                    <p><strong>Overview:</strong> {{ film.overview }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="seriesSearch.length" class="card">
        <h2 class="film">Serie TV</h2>
        <div v-for="serie in seriesSearch" :key="serie.id" class="box">
            <img class="poster" :src="imagePrefix + serie.poster_path" alt="">
            <h2>{{ serie.name }}</h2>
            <p><strong>Original Title:</strong> {{ serie.original_name }}</p>
            <p><strong>Language:</strong> {{ serie.original_language }}</p>
            <p><strong>Vote:</strong>
                <i :class="getStars(serie.vote_average, 1)"></i>
                <i :class="getStars(serie.vote_average, 2)"></i>
                <i :class="getStars(serie.vote_average, 3)"></i>
                <i :class="getStars(serie.vote_average, 4)"></i>
                <i :class="getStars(serie.vote_average, 5)"></i>
            </p>
            <img v-if="getFlag(serie.original_language)" class="flag" :src="getFlag(serie.original_language)" />
            <p v-else>{{ serie.original_language }}</p>
            <div class="additional-info">
                <p><strong>Overview:</strong> {{ serie.overview }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.film {
    color: red;
    padding: 2rem;
    font-style: oblique;
}

.card {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scrollbar-color: transparent;
    background-color: black;
    color: white;
    height: 40rem;
}

.box {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 15rem;
    margin: 2rem;
    background-color: gray;
    padding: 1rem;
    position: relative;
    transition: transform 0.3s, background-color 0.3s;
}

.card .poster {
    width: 7rem;
}

.flag {
    width: 1.5rem;
}
.box:hover {
    transform: scale(1.05);
    background-color: darkgray;
}

.additional-info {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 1rem;
    text-align: left;
    z-index: 1;
    overflow-y: auto;
}

.box:hover .additional-info {
    display: flex;
}

.search-container {
    margin: 1rem;
}
</style>
