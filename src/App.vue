<script>
import HelloWorld from './components/HelloWorld.vue';
import axios from 'axios';

export default {
  components: {

  },
  props: {
    
  },
  data() {
    return {

    }
  },
  methods: {
    getMovies() {
      axios.get("https://api.themoviedb.org/3/search/movie?api_key=1d03bbfe81394b9ece2878065d077b7c&/3/movie/top_rated?language=en-US&page=1").then(risultato => {
        this.store.movies = risultato.
        console.log()
      })
    }
  },
  mounted() {

  },
}
</script>

<template>
  
</template>

<style scoped>

</style>
