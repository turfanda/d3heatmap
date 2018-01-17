var d3;
var svg=d3.select("svg");
var margin = 100;
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;


var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + 50 + "," + 50 + ")");

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",function(err,data){
 if (err) throw err;
  xScale

});
  //g.append("rect").attr("x",0).attr("y",0).attr("width",100).attr("height",100).style("fill","black");