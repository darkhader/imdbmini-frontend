export default {
  rootPath:
    process.env.REACT_APP_STATE === "localhost" ? "https://imdb-mini.herokuapp.com/" : ""
};
