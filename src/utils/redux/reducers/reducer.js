const initialState = {
  movies: [],
  favorites: [],
  movie: {},
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case "FETCH_MOVIE_SUCCESS":
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case "GET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
