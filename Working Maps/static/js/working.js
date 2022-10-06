// L.geoJson(summaryGeoJson, {
//   style: function (feature) {
//     return {
//       color: "white",
//       fillColor: chooseColor(feature.properties.properties.deaths),
//       fillOpacity: 0.5,
//       weight: 1.5
//     };
//   },
//   // This is called on each feature.
//   onEachFeature: function (feature, layer) {
//     // Set the mouse events to change the map styling.
//     layer.on({
//       // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
//       mouseover: function (event) {
//         layer = event.target;
//         layer.setStyle({
//           fillOpacity: 0.9
//         });
//       },
//       // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
//       mouseout: function (event) {
//         layer = event.target;
//         layer.setStyle({
//           fillOpacity: 0.5
//         });
//       },
//       // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//       click: function (event) {
//         myMap.fitBounds(event.target.getBounds());
//       }
//     });
//     // Giving each feature a popup with information that's relevant to it
//     // layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
//     layer.bindPopup("<h1>" + feature.properties.properties.country + "</h1>");
//   }
// }).addTo(myMap);


 // d3.json(link).then(function (geodata) {
  //   let geo = geodata['features'];
  //   for (row of geo) {
  //     let collection = row
  //     let geoCountry = collection["properties"].ADMIN
  //     L.geoJson(collection, {
  //       style: function (feature) {
  //         return {
  //           color: "white",
  //           fillColor: matchColor(geoCountry),
  //           fillOpacity: 0.5,
  //           weight: 1.5
  //         };
  //       },
  //       // This is called on each feature.
  //       onEachFeature: function (feature, layer) {
  //         // Set the mouse events to change the map styling.
  //         layer.on({
  //           // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
  //           mouseover: function (event) {
  //             layer = event.target;
  //             layer.setStyle({
  //               fillOpacity: 0.9
  //             });
  //           },
  //           // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
  //           mouseout: function (event) {
  //             layer = event.target;
  //             layer.setStyle({
  //               fillOpacity: 0.5
  //             });
  //           },
  //           // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
  //           click: function (event) {
  //             myMap.fitBounds(event.target.getBounds());
  //           }
  //         });
  //         // Giving each feature a popup with information that's relevant to it
  //         // layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
  //         layer.bindPopup("<h1>" + geoCountry + "</h1>");
  //       }
  //     }).addTo(myMap);

  //   }
  // })

// let instanceArray = []

// d3.csv(summaryData).then(function (data) {
//   for (row of data) {
//     country = row.country
//     instances = row.total_occurences
//     let instanceCollection = { country, instances }
//     instanceArray.push(instanceCollection)
//   }
// });


// function matchInstance(geoCountry) {
//   d3.json(link).then(function (geodata) {
//     let geo = geodata['features'];
//     for (row of geo) {
//       let collection = row
//       let geoCountry = collection["properties"].ADMIN
//       for (row of instanceArray) {
//         if (row.country === geoCountry) {
//           return row.instances;
//         }
//         else continue
//       }
//     }
//   })
// }

// let features = []
// d3.json(link).then(function (data) {
//   let geo = data['features']
//   geodata = geo
//   // let features = []
//   d3.csv(summaryData).then(function (data) {
//     for (row of data) {
//       country = row.country
//       instances = row.total_occurences
//       deaths = row.total_deaths
//       affected = row.total_affected
//       try {
//         let geometry = geodata.filter(row => row["properties"].ADMIN === country)[0].geometry
//         let properties = { country, instances, deaths, affected }
//         features.push({ "type": "Feature", "properties": { properties }, "geometry": geometry })
//       }
//       catch (error) {
//         console.log(country)
//       }
//       finally {
//         continue
//       }

//     }
//   })
  // let summaryGeoJson = { type: "FeatureCollect", features }



  // let summaryGeoJson = { type: "FeatureCollect", features }

// const fs = require('fs');

// const jsonContent = JSON.stringify(summaryGeoJson);

// fs.writeFile("./summaryGeoJson.json", jsonContent, 'utf8', function (err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("The file was saved!");
// });


// let features = []
// d3.csv(summaryData).then(function (data) {
//   for (row of data) {
//     country = row.country
//     instances = row.total_occurences
//     deaths = row.total_deaths
//     affected = row.total_affected
//     try {
//       let geometry = geodata.filter(row => row["properties"].ADMIN === country)[0].geometry
//       let properties = { country, instances, deaths, affected }
//       features.push({ "type": "Feature", "properties": { properties }, "geometry": geometry })
//     }
//     catch (error) {
//       console.log(country)
//     }
//     finally {
//       continue
//     }

//   }
// })

// let summaryGeoJson = { type: "FeatureCollect", features }

// L.choropleth(summaryGeoJson, {

//   // Define which property in the features to use.
//   valueProperty: "instances",

//   // Set the color scale.
//   scale: ["#fee0d2", "#de2d26"],

//   // The number of breaks in the step range
//   steps: 25,

//   // q for quartile, e for equidistant, k for k-means
//   mode: "q",
//   style: {
//     // Border color
//     color: "#fff",
//     weight: 1,
//     fillOpacity: 0.8
//   },

//   // Binding a popup to each layer
//   // onEachFeature: function(feature, layer) {
//   //   layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Estimated employed population with children age 6-17: " +
//   //     feature.properties.DP03_16E + "<br /><br />Estimated Total Income and Benefits for Families: $" + feature.properties.DP03_75E);
//   // }
// }).addTo(myMap);


// d3.json(summaryGeoJson).then(function (geodata) {


//   // Create a new choropleth layer.
//   L.choropleth(geodata, {

//     // Define which property in the features to use.
//     valueProperty: "total_occurences",

//     // Set the color scale.
//     scale: ["#ffffb2", "#b10026"],

//     // The number of breaks in the step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "#fff",
//       weight: 1,
//       fillOpacity: 0.8
//     },

//     // Binding a popup to each layer
//     // onEachFeature: function(feature, layer) {
//     //   layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Estimated employed population with children age 6-17: " +
//     //     feature.properties.DP03_16E + "<br /><br />Estimated Total Income and Benefits for Families: $" + feature.properties.DP03_75E);
//     // }
//   }).addTo(myMap);

//  
// }
//   // }
// );



// d3.csv(summaryData).then(function (data) {
//   for (row of data) {
//     country = row.country
//     instances = row.total_occurences
//     d3.json(link).then(function (geodata) {
//       geo = geodata['features'];
//       for (row of geo) {
//         collection = row
//         geoCountry = collection["properties"].ADMIN
//         if (geoCountry === country) {
//           L.geoJson(collection, {
//             // Styling each feature (in this case, a neighborhood)
//             style: function (feature) {
//               return {
//                 color: "white",
//                 // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//                 fillColor: chooseColor(instances),
//                 fillOpacity: 0.5,
//                 weight: 1.5
//               };
//             },
//             // This is called on each feature.
//             onEachFeature: function (feature, layer) {
//               // Set the mouse events to change the map styling.
//               layer.on({
//                 // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
//                 mouseover: function (event) {
//                   layer = event.target;
//                   layer.setStyle({
//                     fillOpacity: 0.9
//                   });
//                 },
//                 // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
//                 mouseout: function (event) {
//                   layer = event.target;
//                   layer.setStyle({
//                     fillOpacity: 0.5
//                   });
//                 },
//                 // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//                 click: function (event) {
//                   myMap.fitBounds(event.target.getBounds());
//                 }
//               });
//               // Giving each feature a popup with information that's relevant to it
//               // layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
//             }
//           }).addTo(myMap);
//         }
//       }
//     })
//   }
// })

// // Getting our GeoJSON data
// d3.json(link).then(function (data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Styling each feature (in this case, a neighborhood)
//     style: function (feature) {
//       return {
//         color: "white",
//         // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//         fillColor: chooseColor(feature.properties.borough),
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     },
//     // This is called on each feature.
//     onEachFeature: function (feature, layer) {
//       // Set the mouse events to change the map styling.
//       layer.on({
//         // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
//         mouseover: function (event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.9
//           });
//         },
//         // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
//         mouseout: function (event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.5
//           });
//         },
//         // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//         click: function (event) {
//           myMap.fitBounds(event.target.getBounds());
//         }
//       });
//       // Giving each feature a popup with information that's relevant to it
//       layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

//     }
//   }).addTo(myMap);
// });



// let shadeArray = []

// d3.csv(summaryData).then(function (data) {
//   for (row of data) {
//     country = row.country
//     instances = row.total_occurences
//     chooseColor(country, instances)
//     let colorCollection = { country, shade }
//     shadeArray.push(colorCollection)
//   }
// });


// function matchColor(geoCountry) {
//   for (row of shadeArray) {
//     if (row.country === geoCountry) {
//       return row.shade;
//     }
//     else continue
//   }
// }


// function chooseColor(instances) {
//   if (instances > 721) shade = 'navy';
//   else if (instances > 541) shade = "blue";
//   else if (instances > 361) shade = "aqua";
//   else if (instances > 181) shade = "lightgreen";
//   else shade = "yellow";
// }
function chooseColor(instances) {
  if (instances > 721) return 'navy';
  else if (instances > 541) return "blue";
  else if (instances > 361) return "aqua";
  else if (instances > 181) return "lightgreen";
  else return "yellow";
};