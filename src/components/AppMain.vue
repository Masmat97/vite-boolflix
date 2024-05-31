<script>
import axios from 'axios';
import { store } from '../data/store.js';

export default {
  name: 'AppMain',
  data() {
    return {
      
      apiMoviesUrl: "https://api.themoviedb.org/3/movie/top_rated?api_key=1d03bbfe81394b9ece2878065d077b7c&query=language=en-US&page=1",
      apiSeriesUrl: "https://api.themoviedb.org/3/discover/tv?api_key=1d03bbfe81394b9ece2878065d077b7c&include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200'",

      imagePrefix: "https://image.tmdb.org/t/p/w500",
    };
  },
  computed: {
    movies() {
      return store.movies;
    },
    series() {
      return store.series;
    }
  },
  methods: {
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
    axios.get(this.apiMoviesUrl).then(results => {
      console.log(results.data.results)
      store.movies = results.data.results
    }).catch(error => {
      console.log("Film non trovato!")
    });

    axios.get(this.apiSeriesUrl).then(results => {
      console.log(results.data.results)
      store.series = results.data.results
    }).catch(error => {
      console.log("Serie non trovata!")
    });
  },
}
</script>

<template>
  <h2 class="film">Film piu apprezzati</h2>
  <div class="card">
    <div v-for="film in movies" class="box">
      <h4>{{ film.title }}</h4>
      <img class="poster" :src="imagePrefix + film.poster_path" alt="">
      <p>
        <i :class="getStars(film.vote_average, 1)"></i>
        <i :class="getStars(film.vote_average, 2)"></i>
        <i :class="getStars(film.vote_average, 3)"></i>
        <i :class="getStars(film.vote_average, 4)"></i>
        <i :class="getStars(film.vote_average, 5)"></i>
      </p>
      <img v-if="getFlag(film.original_language)" class="flag" :src="getFlag(film.original_language)" />
      <p v-else>{{ film.original_language }}</p>

    </div>
  </div>


  <h2 class="film">Serie tv</h2>
  <div class="card">
    <div v-for="serie in series" class="box">
      <h4>{{ serie.name }}</h4>
      <img class="poster" :src="imagePrefix + serie.poster_path" alt="">
      <p>
        <i :class="getStars(serie.vote_average, 1)"></i>
        <i :class="getStars(serie.vote_average, 2)"></i>
        <i :class="getStars(serie.vote_average, 3)"></i>
        <i :class="getStars(serie.vote_average, 4)"></i>
        <i :class="getStars(serie.vote_average, 5)"></i>
      </p>
      <img v-if="getFlag(serie.original_language)" class="flag" :src="getFlag(serie.original_language)" />
      <p v-else>{{ serie.original_language }}</p>

    </div>
  </div>

  

</template>

<style scoped>
.film{
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
}

.box {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 15rem;
  margin: 2rem;
  background-color: gray;
  padding: 1rem;
}

.card .poster {
  width: 7rem;
}

.flag {
  width: 1.5rem;
}
</style>