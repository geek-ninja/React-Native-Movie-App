import movieTypes from "../api/movieTypes";

const genres = [
    {
        id:1,
        name : "Trending",
        genresType : movieTypes.fetchTrending,
        tabcolor : "#EB6841",
        icon: "bolt"
    },
    {
        id:2,
        name : "Comedy",
        genresType : movieTypes.fetchComedyMovies,
        tabcolor : "#F99F38",
        icon:"laugh-squint"
    },
    {
        id:3,
        name : "Horror",
        genresType : movieTypes.fetchHorrorMovies,
        tabcolor : "#694fad",
        icon:"ghost"
    },
    {
        id:4,
        name : "Animation",
        genresType : movieTypes.fetchAnimation,
        tabcolor : "#2AB7CA",
        icon:"dragon"
    },
    {
        id:5,
        name : "Romance",
        genresType : movieTypes.fetchRomanceMovies,
        tabcolor : "#FF5588",
        icon:"heartbeat"
    },
    {
        id:6,
        name : "SciFi",
        genresType : movieTypes.fetchSciFi,
        tabcolor : "#03B159",
        icon:"jedi"
    }
]

export default genres