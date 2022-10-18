var world = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [world]
});

const link = "https://raw.githubusercontent.com/nitchon/project-3/main/Working%20Maps/static/data/countries.geojson";


function chooseColor(Conid) {
    if (Conid === 'Africa') {
        return 'blue'
    }
    else if (Conid === 'Americas') {
        return 'orange'
    }
    else if (Conid === 'Asia') {
        return 'green'
    }
    else if (Conid === 'Europe') {
        return 'red'
    }
    else {
        return 'purple'
    }
};


function plots(id) {
    if (document.getElementById('map') != null && document.getElementById('map') != undefined) {
        document.getElementById('map').remove()
        let map_container = d3.select('#map_container')
        map_container.append('div').attr('id', 'map')
        var world = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        var myMap = L.map("map", {
            center: [0, 0],
            zoom: 2,
            layers: [world]
        });
    }
    d3.json("http://127.0.0.1:5000/countrySum").then(function (data) {
        let features = [];
        dataSelect = data.filter(obj => obj[0] === id)
        top5 = dataSelect.sort((a, b) => b[3] - a[3]).slice(0, 5)
        d3.json(link).then(function (data) {
            let geo = data['features']
            geodata = geo
            for (row of top5) {
                country = row[1]
                instances = parseInt(row[6])
                deaths = parseInt(row[3])
                affected = parseInt(row[4])
                damages = parseInt(row[5])
                gni = row[14]
                gdp = row[7]
                co2 = row[9]
                population = parseInt(row[10])
                try {
                    let geometry = geodata.filter(row => row["properties"].ADMIN === country)[0].geometry
                    let properties = { country, instances, deaths, affected, damages, gni, gdp, co2, population }
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
            geo = L.geoJson(summaryGeoJson, {
                style: function (feature) {
                    return {
                        color: "white",
                        fillColor: chooseColor(id),
                        fillOpacity: 0.5,
                        weight: 1.5
                    };
                },
                onEachFeature: function (feature, layer) {
                    layer.on({
                        mouseover: function (event) {
                            layer = event.target;
                            layer.setStyle({
                                fillOpacity: 0.9
                            });
                        },
                        mouseout: function (event) {
                            layer = event.target;
                            layer.setStyle({
                                fillOpacity: 0.5
                            });
                        },
                        click: function (event) {
                            myMap.fitBounds(event.target.getBounds());
                        }
                    });
                    layer.bindPopup("<strong>" + feature.properties.country + "</strong><br /><br />Total Deaths: " +
                        feature.properties.deaths + "<br /><br />Total Affected: " + feature.properties.affected + "<br /><br />Total Occurences: "
                        + feature.properties.instances + "<br /><br />Total Damages: " + feature.properties.damages + "<br /><br />GNI Per Capita: " + feature.properties.gni
                        + "<br /><br />GDP Per Capita: " + feature.properties.gdp + "<br /><br />CO2 Emissions Per Capita: " + feature.properties.co2 + "<br /><br />Population: " + feature.properties.population);
                }
            }).addTo(myMap);
            myMap.fitBounds(geo.getBounds())

        })
    })
};
function graphs(id) {
    d3.json("http://127.0.0.1:5000/countrySum").then(function (data) {
        let features = [];
        dataSelect = data.filter(obj => obj[0] === id)
        top5 = dataSelect.sort((a, b) => b[3] - a[3]).slice(0, 5)
        d3.json('http://127.0.0.1:5000/countryBD').then(function (data) {
            selection = data.filter(obj => obj[0] === top5[0][1])
            let instancesData = [{
                values: selection.map(obj => obj[7]),
                labels: selection.map(obj => obj[2]),
                type: "pie"
            }]
            var instancesLayout = {
                height: 500,
                width: 500,
                title: `Number of Occurrences in ${top5[0][1]}`,
                paper_bgcolor: 'rgba(245,246,249,1)',
                plot_bgcolor: 'rgba(245,246,249,1)',
            };
            Plotly.newPlot('instancePie', instancesData, instancesLayout)
            let deathData = [{
                values: selection.map(obj => obj[5]),
                labels: selection.map(obj => obj[2]),
                type: "pie"
            }]
            var deathLayout = {
                height: 500,
                width: 500,
                title: `Deaths in ${top5[0][1]}`,
                margin: "auto",
                paper_bgcolor: 'rgba(245,246,249,1)',
                plot_bgcolor: 'rgba(245,246,249,1)',
            };
            Plotly.newPlot('deathPie', deathData, deathLayout)
            let lossData = [{
                values: selection.map(obj => obj[7]),
                labels: selection.map(obj => obj[2]),
                type: "pie"
            }]
            var lossLayout = {
                height: 500,
                width: 500,
                title: `Damages in ${top5[0][1]}`,
                paper_bgcolor: 'rgba(245,246,249,1)',
                plot_bgcolor: 'rgba(245,246,249,1)',
            };
            Plotly.newPlot('lossPie', lossData, lossLayout)
        })
    })

}





function optionChanged(id) {
    plots(id);
    graphs(id);
};



function init() {
    let CondropDown = d3.select('#selDataset');
    let Conid = CondropDown.property('value');
    names = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    Object.values(names).forEach(value => {
        CondropDown.append('option').text(value);
    });

    plots(names[0]);
    graphs(names[0]);
};



feather.replace({ 'aria-hidden': 'true' })
init();