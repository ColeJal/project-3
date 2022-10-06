var deathChoro = L.layerGroup();
var instancesChoro = L.layerGroup();
var affectedChoro = L.layerGroup();
var top10markers = L.layerGroup();

var world = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// var baseMaps = {
//   "Satellite": sat,
//   "Street Map": world,
//   // "Topographic Map": topo
// };
var overlayMaps = {
  "Total Affected": affectedChoro,
  "Total Deaths": deathChoro,
  "Total Occurences": instancesChoro
};

var markerLayer = {
  "Worst Disasters in 2022": top10markers
}
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2,
  layers: [world]
});



// L.control.layers(baseMaps).addTo(myMap);

L.control.layers(overlayMaps, markerLayer, {
  collapsed: false
}).addTo(myMap);



const link = "https://raw.githubusercontent.com/nitchon/project-3/main/Working%20Maps/static/data/countries.geojson";
const summaryData = "/static/data/1990_2022_summary.csv";
const disasters = '/static/data/natural_disasters.csv';
const yearlybreakdown='static/data/yearlybreakdowns.csv'
// const summaryData =document.getElementById('summary').innerHTML;
// const disasters = document.getElementById('disaster').text



d3.csv("/summary").then(function(data){
  most_deaths = data.sort((a,b)=>b.total_deaths-a.total_deaths).slice(0,10).reverse();
  let trace1 = {
    x:most_deaths.map(object=>object.total_deaths),
    y:most_deaths.map(object=>object.country),
    text:most_deaths.map(object=>object.country),
    name:"Most Deaths",
    type:'bar',
    orientation:'h'
  }
  let traceData=[trace1];
  let layout = {
    title: "Top 10 Countries with Most Total Deaths",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  Plotly.newPlot("plot", traceData, layout);
})



var deathlayer;
var instanceslayer;
var affectedlayer;


let features = [];

function init() {
  d3.csv(disasters).then(function (data) {
    let disasters2022 = data.filter(row => row.year == 2022)
    let top10 = disasters2022.sort((a, b) => b.total_deaths - a.total_deaths).slice(0, 10)
    for (row of top10) {
      L.marker([row.lat, row.lng]).bindPopup(`<h3>Location: ${row.location_estimate}</h3><hr><h3>Date: ${row.start_date}</h3>
        <h4><h3>Disaster Type: ${row.disaster_type}</h3><hr><h3>Deaths: ${row.total_deaths}</h3><hr><h3>Affected: ${row.total_affected}</h3>`)
        .addTo(top10markers);
      top10markers.addTo(myMap);
    }
  })
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
      let summaryGeoJson = { type: "FeatureCollect", features }
      deathlayer = L.choropleth(summaryGeoJson, {

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
            feature.properties.deaths + "<br /><br />Total Affected: " + feature.properties.affected + "<br /><br />Total Occurences: " + feature.properties.instances);
        }
      }).addTo(deathChoro);
      deathChoro.addTo(myMap);
      var legend = L.control({ position: "bottomright" });
      legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend");
        var limits = deathlayer.options.limits;
        var colors = deathlayer.options.colors;
        var labels = [];

        var legendInfo = "<h3>Totals from 1990 - 2022<br/></h2>" +
          "<div class=\"labels\">" +
          // "<div class=\"min\">" + limits[0] + "</div>" +
          // "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
          "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
          labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
      }

      legend.addTo(myMap);

      instanceslayer = L.choropleth(summaryGeoJson, {

        // Define which property in the features to use.
        valueProperty: "instances",
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
            feature.properties.deaths + "<br /><br />Total Affected: " + feature.properties.affected + "<br /><br />Total Occurences: " + feature.properties.instances);
        }
      }).addTo(instancesChoro);
      instancesChoro.addTo(myMap);
      // var ilegend = L.control({ position: "bottomright" });
      // ilegend.onAdd = function (map) {
      //   var div = L.DomUtil.create("div", "info legend");
      //   var iLimits = instanceslayer.options.limits;
      //   var iColors = instanceslayer.options.colors;
      //   var iLabels = [];

      //   var legendInfo = "<h1>Legend<br/></h1>" +
      //     "<div class=\"labels\">" +
      //     "<div class=\"min\">" + iLimits[0] + "</div>" +
      //     "<div class=\"max\">" + iLimits[iLimits.length - 1] + "</div>" +
      //     "</div>";

      //   div.innerHTML = legendInfo;

      //   iLimits.forEach(function (iLimits, index) {
      //     iLabels.push("<li style=\"background-color: " + iColors[index] + "\"></li>");
      //   });

      //   div.innerHTML += "<ul>" + iLabels.join("") + "</ul>";
      //   return div;
      // }

      // ilegend.addTo(myMap);
      affectedlayer = L.choropleth(summaryGeoJson, {

        // Define which property in the features to use.
        valueProperty: "affected",
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
            feature.properties.deaths + "<br /><br />Total Affected: " + feature.properties.affected + "<br /><br />Total Occurences: " + feature.properties.instances);
        }
      }).addTo(affectedChoro);
      affectedChoro.addTo(myMap);
      // var alegend = L.control({ position: "bottomright" });
      // alegend.onAdd = function (map) {
      //   var div = L.DomUtil.create("div", "info legend");
      //   var aLimits = instanceslayer.options.limits;
      //   var aColors = instanceslayer.options.colors;
      //   var aLabels = [];

      //   var legendInfo = "<h1>Legend<br/></h1>" +
      //     "<div class=\"labels\">" +
      //     "<div class=\"min\">" + aLimits[0] + "</div>" +
      //     "<div class=\"max\">" + aLimits[aLimits.length - 1] + "</div>" +
      //     "</div>";

      //   div.innerHTML = legendInfo;

      //   aLimits.forEach(function (aLimits, index) {
      //     aLabels.push("<li style=\"background-color: " + aColors[index] + "\"></li>");
      //   });

      //   div.innerHTML += "<ul>" + aLabels.join("") + "</ul>";
      //   return div;
      // }

      // alegend.addTo(myMap);
    }
    );
  })
}
init();



