// Creating the map object
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2,
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
const link = "/static/data/countries.geojson";
const summaryData = "/static/data/1990_2022_summary.csv";


function chooseColor(instances) {
  if (instances > 721) return 'navy';
  else if (instances > 541) return "blue";
  else if (instances > 361) return "aqua";
  else if (instances > 181) return "lightgreen";
  else return "yellow";
};

let features = []
d3.json(link).then(function (data) {
  let geo = data['features']
  geodata = geo
  // let features = []
  d3.csv(summaryData).then(function (data) {
    for (row of data) {
      country = row.country
      instances = parseInt(row.total_occurences)
      deaths = parseInt(row.total_deaths)
      affected = parseInt(row.total_affected)
      try {
        let geometry = geodata.filter(row => row["properties"].ADMIN === country)[0].geometry
        let properties = { country, instances, deaths, affected }
        features.push({ "type": "Feature", properties, "geometry": geometry })
      }
      catch (error) {
        console.log(country)
      }
      finally {
        continue
      }
    }
  })
});
let summaryGeoJson = { type: "FeatureCollect", features }
function init() {
  L.choropleth(summaryGeoJson, {

    // Define which property in the features to use.
    valueProperty: "deaths",

    // Set the color scale.
    scale: ["#ffffb2", "#b10026"],

    // The number of breaks in the step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a popup to each layer
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.country + "</strong><br /><br />Total Deaths: " +
        feature.properties.deaths + "<br /><br />Estimated Total Income and Benefits for Families: $");
    }
  }).addTo(myMap);
  // Set up the legend.
  //   // var legend = L.control({ position: "bottomright" });
  //   // legend.onAdd = function() {
  //   //   var div = L.DomUtil.create("div", "info legend");
  //   //   var limits = geojson.options.limits;
  //   //   var colors = geojson.options.colors;
  //   //   var labels = [];

  //   //   // Add the minimum and maximum.
  //   //   var legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
  //   //     "<div class=\"labels\">" +
  //   //       "<div class=\"min\">" + limits[0] + "</div>" +
  //   //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //   //     "</div>";

  //   //   div.innerHTML = legendInfo;

  //   //   limits.forEach(function(limit, index) {
  //   //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //   //   });

  //   //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   //   return div;
  //   // };

  //   // Adding the legend to the map
  //   // legend.addTo(myMap);

  // }) 
};

init();




