var d3;
var svg = d3.select("svg");
var margin = 100;
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

var colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var g = svg.append("g").attr("transform", "translate(" + 50 + "," + 5 + ")");

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(err, data) {
    if (err) {throw err;}

    var baseTemp = data.baseTemperature;
    var mdata = data.monthlyVariance;
    var firstyear = parseInt(mdata[0].year);
    var gridHeight = height / 12;
    var gridWidth = width / (mdata.length / 12);

    var xScale = d3.scaleTime().domain([new Date(mdata[0].year, 0, 1), new Date(mdata[mdata.length - 1].year, 0, 1)]).range([0, width]);
    var yScale = d3.scaleTime().domain([new Date(2012, 0, 1), new Date(2012, 11, 31)]).range([0, height]);

    g.append("g").call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b"))).append("text")
        .attr("x", -200)
        .attr("y", -35)
        .style("text-anchor", "End")
        .style("fill", "Black")
        .style("font-size", "16px")
        .attr("transform", "rotate(-90)")
        .text("Months");
  
    g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")).ticks(20)).append("text")
        .attr("x", 400)
        .attr("y", 40)
        .style("text-anchor", "End")
        .style("fill", "Black")
        .style("font-size", "16px")
        .text("Years");
  
    var varianceData = mdata.map(function(obj) {
    return obj.variance;
    });
  
    var map = svg.selectAll(".map")
    .data(colors)
    .enter()
    .append("g").attr("class","mapg").append("rect")
    .attr("x",function(d,i){return (width+80)/2+i*30})
    .attr("y",height+50).attr("width",30).attr("height",20).style("fill",function(d){return d;})
    
    d3.selectAll(".mapg")
      .append("text")
      .attr("x",function(d,i){return (width+90)/2+i*30})
      .attr("y",height+90)
      .style("fill","black")
      .text("asd");
  
  
column("d3.scaleQuantile", quantile);
  
    var lowVariance = d3.min(varianceData);
    var highVariance = d3.max(varianceData);
  
    var colorScale = d3.scaleQuantile()
    .domain([lowVariance + baseTemp, highVariance + baseTemp])
    .range(colors);

  console.log(colorScale("#5e4fa2"));
  
    var div = d3.select("body").append("div").attr("class", "infoBox");

    var heatmap = g.selectAll(".rect")
    .data(mdata)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
            return (parseInt(d.year) - firstyear) * gridWidth;
        })
    .attr("y", function(d) {
            return (parseInt(d.month) - 1) * gridHeight;
        })
    .attr("width", gridWidth)
    .attr("height", gridHeight)
    .attr("rx", 0)
    .attr("ry", 0)
    .style("fill", function(d) {
      return colorScale(d.variance + baseTemp);
    })
    .on("mouseover", function(d) {
            div.transition()
                .duration(100)
                .style("opacity", 0.9);
            div.html("<span class='insideInfo'>" + d.year+"-"+ monthNames[d.month - 1] +"</span><br><span class='insideInfo'>"+ (Math.floor((d.variance + baseTemp) * 1000) / 1000)+"&#8451</span><br><span class='insideInfo'>"+d.variance+"&#8451</span>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
        })
    .on("mouseout", function() {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        });
  

});