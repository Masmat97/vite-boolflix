import { reactive } from 'vue';

export const store = reactive({
    movies: [],
    setMovies(movies) {
        this.movies = movies;
    }
});