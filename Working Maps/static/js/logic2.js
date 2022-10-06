var world = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [world]
  });

  
const disasters='/static/data/natural_disasters.csv'

d3.csv(disasters).then(function(data){
    let disasters2022=data.filter(row=>row.year==2022)
    let top10 = disasters2022.sort((a,b)=>b.total_deaths-a.total_deaths).slice(0,1)
    for (row of top10){
        L.marker([row.lat, row.lng]).bindPopup(`<h3>Location: ${row.location_estimate}</h3><hr><h3>Date: ${row.start_date}</h3>
        <h4><h3>Disaster Type: ${row.disaster_type}</h3><hr><h3>Deaths: ${row.total_deaths}</h3><hr><h3>Affected: ${row.total_affected}</h3>`)
        .addTo(myMap);
    }
})