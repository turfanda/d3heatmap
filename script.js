var d3;
var svg=d3.select("svg");
var margin = 100;
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;




var g = svg.append("g").attr("transform", "translate(" + 50 + "," + 50 + ")");

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",function(err,data){
 if (err) throw err;
  
  var mdata=data.monthlyVariance;
  
var xScale = d3.scaleLinear().domain(mdata[0].Year,mdata[mdata.length-1].Year).range([0, width]);
var yScale = d3.scaleTime().domain(new Date(2012, 0, 1), new Date(2012, 11, 31)).range([height, 0]);
  
  
g.append("g").call(d3.axisLeft(yScale).tickFormat(function(mdata) 
                                                  console.log(mdata);
            return mdata.month;
        }).ticks(d3.timeMonth).tickSize(16,0));
  
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickFormat(function(mdata) {
            return mdata.Year;
        }))

});
  //g.append("rect").attr("x",0).attr("y",0).attr("width",100).attr("height",100).style("fill","black");