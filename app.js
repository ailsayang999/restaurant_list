//Include express
const express = require("express");
const app = express();

//Define server related variables
const port = 3000;
const restaurants = require("./restaurant.json");


//Setting handlebars
const exphbs = require("express-handlebars");
//Setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//Setting view engine
app.set("view engine", "handlebars");

//Setting static files
app.use(express.static("public"));

//Setting route and the corresponding response
app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurants.results });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurantDetail = restaurants.results.find(
    (item) => item.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurantDetail: restaurantDetail });
});

//Search Bar
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const filterRestaurant = restaurants.results.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
  );
  res.render("index", { restaurant: filterRestaurant, keyword: keyword });
});

//favorite
app.get('/favorite', (res,req)=>{
  res.render("favorite", { favorite: favoriteRestaurant });
})

//Listen and start server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
