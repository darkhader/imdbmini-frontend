export default {
  rootPath:
    process.env.REACT_APP_STATE === "localhost" ? "https://imdb-backend.herokuapp.com" : ""
};
