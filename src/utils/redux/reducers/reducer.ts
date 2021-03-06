const initialState = {
  movies: [],
  favorites: [],
  movie: {},
  loading: false,
  session_id: "",
  user_id: 0,
  query: "",
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_SESSION_ID":
      return {
        ...state,
        session_id: action.payload.session_id,
        user_id: action.payload.user_id,
      };
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
    case "ADD_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
        loading: false,
      };
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;
