import { reactive } from 'vue';

export const store = reactive({
    movies: [],
    setMovies(movies) {
        this.movies = movies;
    },

    series: [],
    setSeries(series) {
        this.series = series;
    },

    films: [],
    setFilms(films) {
        this.films = films;
    },

    serie: [],
    setSerie(serie) {
        this.serie = serie;
    }
});