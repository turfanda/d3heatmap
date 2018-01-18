var d3;
var svg = d3.select("svg");
var margin = 100;
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

var g = svg.append("g").attr("transform", "translate(" + 50 + "," + 50 + ")");

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(err, data) {
  if (err) throw err;

  var mdata = data.monthlyVariance;
  var gridHeight=height/12;
  var gridWidth=width/mdata.length;


  var xScale = d3.scaleTime().domain([new Date(mdata[0].year, 0, 1), new Date(mdata[mdata.length - 1].year, 0, 1)]).range([0, width]);
  var yScale = d3.scaleTime().domain([new Date(2012, 0, 1), new Date(2012, 11, 31)]).range([height, 0]);

  g.append("g").call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b")));
  g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")).ticks(20));
  
  g.selectAll(".rect")
    .data(mdata)
    .enter()
    .append("rect")
    .attr("x",function(d,i){})
    .attr("y",)
    .attr("width",gridWidth)
    .attr("height",gridHeight)
    .style("fill",function(d){});
  



});