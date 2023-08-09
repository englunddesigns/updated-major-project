var scaleMultiplier = 10;

drawMap = function () {
  var width = 960,
    height = 1160;

  //creating the Albers Projection of the earth on which the countries can be drawn
  var projection = d3.geo
    .albers()
    .center([0, 50.7])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(1200 * scaleMultiplier)
    .translate([width / 2, height / 2]);

  var path = d3.geo.path().projection(projection).pointRadius(0);

  var svg = d3.select("svg");

  //loading all the information from the JSON file and storing them as usable variables
  d3.json("/static/d3/europe.json", function (error, uk) {
    //All of the countries and there boundaries are now stored in this variable
    var subunits = topojson.feature(uk, uk.objects.subunitseurope),
      //All of the locations with the coordinates and number of mariners are included in this variable
      places = topojson.feature(uk, uk.objects.places);

    //the following code is drawing each of the countries onto the projection and assigning
    // the correct class name
    svg
      .selectAll(".subunit")
      .data(subunits.features)
      .enter()
      .append("path")
      .attr("class", function (d) {
        return "subunit " + d.id;
      })
      .attr("d", path);

    svg
      .append("path")
      .datum(
        topojson.mesh(uk, uk.objects.subunitseurope, function (a, b) {
          return a !== b;
        })
      )
      .attr("d", path)
      .attr("class", "subunit-boundary");

    svg.append("path").datum(places).attr("d", path).attr("class", "place");

    var labels = [];

    // Store the projected coordinates of the places for the points and the labels
    // This was necessary to get the force simulation to work correctly
    places.features.forEach(function (d, i) {
      var f = projection(d.geometry.coordinates);
      var r = ((50 - 10) / (10725 - 50)) * (d.properties.size - 50) + 10;
      labels.push({
        x: f[0],
        y: f[1],
        name: d.properties.name,
        size: d.properties.size,
        radius: r,
      });
    });
    //setting up the forces that will act on the red circles on the map
    var simulation = d3
      .forceSimulation(labels)
      .force(
        "x",
        d3.forceX().x(function (d) {
          return d.x;
        })
      )
      .force(
        "y",
        d3.forceY().y(function (d) {
          return d.y;
        })
      )
      .force(
        "collision",
        d3.forceCollide().radius(function (d) {
          return d.radius * (scaleMultiplier / 10);
        })
      )
      .on("tick", ticked);

    //The following code adds a red circle for each location along with its corresponding label
    var label = svg
      .append("g")
      .selectAll(".label")
      .data(labels)
      .enter()
      .append("g")
      .attr("class", "label");

    label
      .append("circle")
      .attr("class", "circle")
      .attr("r", function (d) {
        return d.radius * (scaleMultiplier / 10);
      })
      .attr("fill", "red")
      .attr("fill-opacity", "0.5");

    label
      .append("text")
      .attr("class", "place-label")
      .attr("text-anchor", "middle")
      .attr("font-size", "0.4em")
      .text(function (d) {
        return d.name;
      });

    label
      .append("text")
      .attr("class", "place-size-label")
      .attr("text-anchor", "middle")
      .attr("font-size", "0.4em")
      .attr("dy", "1em")
      .text(function (d) {
        return d.size;
      });
    //This function is used by the force simulation to update the position of each circle
    //after each tick of the simulation
    function ticked() {
      label.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }
  });
};
//when the page loads call the function that is defined above. Without this line of code
//errors were being thrown as objects were being referenced that did not exist yet
window.onload = drawMap();

//The Scale multiplier is a variable used to change the size of the map
//once the user clicks either the zoom in or zoom out button the variable is updated
//and the entire map is redrawn with the new scale
document.getElementById("zoomin").onclick = function () {
  if (scaleMultiplier <= 80) {
    scaleMultiplier = scaleMultiplier + 1;
    d3.select("svg").selectAll("*").remove();
    drawMap();
  }
};

document.getElementById("zoomout").onclick = function () {
  if (scaleMultiplier >= 2) {
    scaleMultiplier = scaleMultiplier - 1;
    d3.select("svg").selectAll("*").remove();
    drawMap();
  }
};
