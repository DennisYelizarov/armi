function defineNavBar(navBar) {
    navBar.attr("class", "navbar navbar-expand-sm bg-dark navbar-dark");

    navBar.append("a")
        .attr("class", "navbar-brand")
        .attr("href", "#")
        .text("Grid Editor");
}

function updateDrawChart(svg, data) {
    const points = data["points"];
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

function defineDisplayArea(displayArea, data) {
    const widthGuiBox = 700;
    const heightGuiBox = 700;

    var svg = displayArea.append("svg")
        .attr("id", "grid-area")
        .attr("width", widthGuiBox)
        .attr("height", heightGuiBox);
        
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", widthGuiBox)
        .attr("height", heightGuiBox)
        .style("fill", "none");

    updateDrawChart(svg, data);
}

function defineSidePanel(sidePanel) {
    sidePanel
        .append("h3").text("Assemblies")
        .append("p").text("Equilibrium Fuel Path");

    sidePanel.append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "fuel_path")
        .text("Fuel Path");

    sidePanel.append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "rm_fuel_path")
        .text("Remove From Fuel Path");
}

function defineMiddleContainer(middleContainer, data) {
    var row = middleContainer
        .attr("class", "container")
        .append("div")
            .attr("class", "row");
    var displayArea = row.append("div")
        .attr("class", "w-75 p-3");
    defineDisplayArea(displayArea, data);

    var sidePanel = row.append("div")
        .attr("class", "w-25 p-3")
        .attr("id", "side-panel");
    defineSidePanel(sidePanel);
}

function defineBottomPanel(bottomPanel) {
    var bottomBoxArea = bottomPanel
        .attr("id", "bottom-box-area");

    bottomBoxArea.append("div")
        .style("width", "100%")
        .text("Num. Rings");

    bottomBoxArea.append("div").append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .text("Expand to Full Core");

    bottomBoxArea.append("div").append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .text("Save Grid Blueprints")
        .on("click", () => {
            const a = document.createElement('a');
            const file = new Blob(["Dummy Blueprint YAML file contents"], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);
            a.download = "my-blueprint.yaml";
            a.click();
            URL.revokeObjectURL(a.href);
        });

    bottomBoxArea.append("div").append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("Help");

    bottomBoxArea.append("div").append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("Save Image...");

    bottomBoxArea.append("div").append("input")
        .attr("type", "number")
        .attr("id", "numRings")
        .style("height", "90%")
        .attr("min", 1)
        .attr("max", 20)
        .attr("value", 5)
        .attr("title", "Select how many rings of the grid to display");

    const modeOptions = ["Specifier", "Shuffle Path", "(i,j)", "(Ring, Position)"];
    var modeSelector = bottomBoxArea.append("div").append("select")
        .style("width", "100%")
        .style("height", "90%")
        .style("text-align", "center");

    modeSelector // Add a button
        .selectAll("myOptions") // Next 4 lines add 6 options = 6 colors
        .data(modeOptions)
        .enter()
        .append("option")
        .text((d) => (d)) // text showed in the menu
        .attr("value", (d) => (d)) // corresponding value returned by the button
        .on("change", () => {
            // recover the option that has been chosen
            const selectedOption = modeSelector.property("value");
            // refer to https://www.d3-graph-gallery.com/graph/interactivity_button.html

            // run the updateChart function with this selected option
            // Put the function here
            let comm = new CommAPI("update_graph", (ret)=>{alert("The returned value is " + ret.results["n"])});
            comm.call({n: selectedOption});
            // updateChart(selectedOption)
        });

    bottomBoxArea.append("div").append("label")
        .attr("for", "open_blueprint_btn")
        .attr("class", "btn-btn")
        .style("width", "100%")
        .style("text-align", "center")
        .text("Open Grid Blueprints")
        .append("input")
        .attr("id", "open_blueprint_btn")
        .attr("type", "file")
        .attr("class", "invisible");

    bottomBoxArea.append("div");
    bottomBoxArea.append("div");

    bottomBoxArea.append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("Apply");

    bottomBoxArea.append("div");

    bottomBoxArea.append("button")
        .attr("type", "button")
        .attr("class", "btn-btn")
        .attr("id", "apply_button")
        .text("New Grid Blueprints");
}

function main(id, data) {
    const root = d3.select(id);
    root.attr("class", "gray-background");

    const navBar = root.append("nav");
    defineNavBar(navBar);

    const middleContainer = root.append("div");
    defineMiddleContainer(middleContainer, data);

    const bottomPanel = root.append("div");
    defineBottomPanel(bottomPanel);
}
