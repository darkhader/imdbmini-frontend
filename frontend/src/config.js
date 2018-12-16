export default {
  rootPath:
    process.env.REACT_APP_STATE === "localhost" ? "http://imdb-backend.herokuapp.com" : ""
};
