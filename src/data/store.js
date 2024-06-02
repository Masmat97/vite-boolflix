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
    newMovies: [],
    setNewMovies(newMovies) {
        this.newMovies = newMovies;
    },

    newSeries: [],
    setNewSeries(newSeries) {
        this.newSeries = newSeries;
    },

 
    
});