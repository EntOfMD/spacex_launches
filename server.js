const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const path = require("path");
const cors = require("cors");
const app = express();

//Allow cross-origin
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendfile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
