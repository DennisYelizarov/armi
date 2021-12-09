function grid_gui(id, data) {

var points = data["points"];

var svg = d3.select(id).append("svg")
    .attr("height", 200)
    .attr("width", 450)
    .style("background-color", "#f5f5f5");

var g = svg.selectAll("g").data(points).enter().append("g");

g.attr("width", 40).attr("height", 40);

g.append("rect")
    .attr("x", (d) => d.x * 40)
    .attr("y", (d) => d.y * 40)
    .attr("width", 40).attr("height", 40)
    .attr("stroke", "black")
    .attr("stroke-width", "2px")
    .style("fill", "white");

g.append("text")
    .text((d) => `${d.x},${d.y}`)
    .attr("x", (d) => d.x * 40)
    .attr("y", (d) => d.y * 40)
    .attr("transform", "translate(20,20)")
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("class", "inner");

var button = d3.select(id).append("button")
    .text("I do nothing").style("display", "block");
}