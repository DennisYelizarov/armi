function define_nav_bar(nav_bar) {
    nav_bar.attr("class", "navbar navbar-expand-sm bg-dark navbar-dark");

    nav_bar.append("a")
        .attr("class", "navbar-brand")
        .attr("href", "#")
        .text("Terrapower ARMI");
}

function update_draw_chart(svg, data) {
    const points = data["points"];
    // const data = [
    //     {x_pos:0,y_pos:0,x_dat:0,y_dat:0}, {x_pos:0,y_pos:1,x_dat:0,y_dat:0},
    //     {x_pos:1,y_pos:0,x_dat:0,y_dat:0}, {x_pos:1,y_pos:1,x_dat:0,y_dat:0},
    // ];
    var g = svg.selectAll("g").data(points).enter().append("g");

    g.attr("width", 40).attr("height", 40);

    g.append("rect")
        .attr("x", (d) => d.x_pos * 40)
        .attr("y", (d) => d.y_pos * 40)
        .attr("width", 40).attr("height", 40)
        .attr("stroke", "black")
        .attr("stroke-width", "2px")
        .style("fill", "white");

    g.append("text")
        .text((d) => `${d.x_dat},${d.y_dat}`)
        .attr("x", (d) => d.x_pos * 40)
        .attr("y", (d) => d.y_pos * 40)
        .attr("transform", "translate(20,20)")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .attr("class", "grid-gui-gridcell");
}

function define_display_area(display_area, data) {
    const height_gui_box = 600;
    const width_gui_box = 600;

    display_area.append("h3").text("Display Area");
    var svg = display_area.append("svg")
        .attr("id", "grid-area")
        .attr("width", width_gui_box)
        .attr("height", height_gui_box);
        
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width_gui_box)
        .attr("height", height_gui_box)
        .attr("stroke", "black")
        .attr("stroke-width", "2px")
        .style("fill", "none");

    update_draw_chart(svg, data);
}

function define_side_panel(side_panel) {
    side_panel
        .append("h3").text("Assemblies")
        .append("p").text("Equilbrium Fuel Path");

    side_panel.append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "fuel_path")
        .text("Fuel Path");

    side_panel.append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "rm_fuel_path")
        .text("Remove From Fuel Path");
}

function define_middle_container(middle_container, data) {
    var row = middle_container
        .attr("class", "container")
        .append("div")
            .attr("class", "row");
    var display_area = row.append("div")
        .attr("class", "w-75 p-3");
    define_display_area(display_area, data);

    var side_panel = row.append("div")
        .attr("class", "w-25 p-3")
        .attr("id", "side-panel");
    define_side_panel(side_panel);
}

function define_bottom_panel(bottom_panel) {
    var bottom_box_area = bottom_panel
        .attr("class", "container")
        .attr("id", "bottom-box-area");
    
    bottom_box_area.append("input")
        .attr("type", "number")
        .attr("id", "buttonSize")
        .attr("value", 13);

    const gridGuiModeOptions = ["Specifier", "Shuffle Path", "(i,j)", "(Ring, Position)"];
    var gridGuiModeButton = bottom_box_area.append('select');

    gridGuiModeButton // Add a button
        .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
        .data(gridGuiModeOptions)
        .enter()
        .append('option')
        .text((d) => (d)) // text showed in the menu
        .attr("value", (d) => (d)); // corresponding value returned by the button


    // A function that update the color of the circle. Run from dropdown Button
    // function updateChart(mycolor) {
    //  zeCircle
    //    .transition()
    //    .duration(1000)
    //    .style("fill", mycolor)
    //}

    // When the button is changed, run the updateChart function
    gridGuiModeButton.on("change", function(d) {

        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value");
        // refer to https://www.d3-graph-gallery.com/graph/interactivity_button.html

        // run the updateChart function with this selected option
        // Put the function here
        let comm = new CommAPI("update_graph", (ret)=>{alert("The returned value is " + ret.results)})
        comm.call({n: 3})
        // updateChart(selectedOption)
    });

    // https://stackoverflow.com/questions/15244182/d3-create-buttons-from-an-array-of-string-containing-names
    bottom_box_area.append('button')
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("Apply");

    bottom_box_area.append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("Expand to Full Core");

    bottom_box_area.append('button')
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("Save Grid Blueprints");

    bottom_box_area.append('button')
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("Open Grid Blueprints");

    bottom_box_area.append('button')
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("New Grid Blueprints");

    bottom_box_area.append('button')
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("Help");
}

function main(id, data) {
    const root = d3.select(id);
    root.append("meta").attr("charset", "utf-8");
    root.append("meta").attr("name", "viewport").attr("content", "width=device-width, initial-scale=1");

    const nav_bar = root.append("nav");
    define_nav_bar(nav_bar);
    root.append("div").attr("class", "jumbotron text-center").append("h1").text("Grid Editor");

    const middle_container = root.append("div");
    define_middle_container(middle_container, data);

    const bottom_panel = root.append("div");
    define_bottom_panel(bottom_panel);
}
