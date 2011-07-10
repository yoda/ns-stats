
function findKeyValuePairByKey(kvps, key_name, key_value) {
  var target_index = -1;
  $.each(kvps, function(index, val) {
    if (val[key_name] == key_value)
  {
    target_index = index;
    return false;
  }
  });
  return target_index;
}

// Make a list of unique object names
function collectObjectNamesByTeam(team, data, field_prefix, field_suffix) {
  var unique_object_names = [];
  var field_name = "" + field_prefix + field_suffix;
  $.each(data, function(index, val) {
    if (val[field_prefix + "_team"] == team)
  {

    var existing_index = findKeyValuePairByKey(unique_object_names, "name", val[field_name]);
    if (existing_index >= 0)
  {
    unique_object_names[existing_index]["value"] = unique_object_names[existing_index]["value"] + 1;
  } else {
    unique_object_names.push({"value": 1, "name": val[field_name]});
  }
  }
  });
  return unique_object_names;
}

function compare_kv(a, b) {
  if (a["value"] > b["value"]) 
    return -1;
  if (a["value"] < b["value"])
    return 1;
  // a must be equal to b
  return 0;
}


function plot_graph(data_json, query) {
    var results = collectObjectNamesByTeam(query[0], data_json, query[1], query[2]);

    results.sort(compare_kv);
    var temp = "";

    temp += "[";
    $.each(results, function(i_x, da) {
      temp += "[" + da["name"] + ", " + da["value"] + "], "
    });
    temp += "]";

    alert(temp);





    var data = results;

    var title_height = 30;
    var chart_width = 600;
    var x_offset = 100;
    var bar_width = 20;
    var y_offset = title_height + bar_width;
    var max_y = (bar_width * (data.length));
    var data_length = data.length;

    var chart = d3.select("#graphs")
      .append("svg:svg")
      .attr("class", "chart")
      .attr("width", chart_width)
      .attr("height", max_y + title_height + y_offset)
      .append("svg:g")
      .attr("transform", "translate(" + x_offset + ", " + y_offset + ")");

    var x = d3.scale.linear()
      .domain([d3.min(data, function(d) { return d["value"]; }), d3.max(data, function(d) {return d["value"];})])
      .range([0, (chart_width - x_offset - bar_width)]);

    var y = d3.scale.ordinal()
      .domain(data)
      .rangeRoundBands([0, max_y]);

    chart.selectAll("rect")
      .data(data)
      .enter().append("svg:rect")
      .attr("y",  function(d) { return y(d["name"]) })
      .attr("width", function(d) {return x(d["value"]);})
      .attr("fill", team_color(query[0]))
      .attr("height", y.rangeBand());

    chart.selectAll("rect")
      .data(data)
      .enter().append("svg:text")
      .attr("x",x)
      .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
      .attr("dx", -3) // padding-right
      .attr("dy", ".35em") // vertical-align: middle
      .attr("class", "totals")
      .attr("text-anchor", "end") // text-align: right
      .text(String);

    chart.selectAll("rect")
      .data(data)
      .enter().append("svg:text")
      .attr("x",0)
      .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
      .attr("dx", -3) // padding-right
      .attr("dy", ".35em") // vertical-align: middle
      .attr("text-anchor", "end") // text-align: right
      .text(function(d, i) {return data[(i - data_length)]["name"];});		//.text(function(d,i) { return data[(i - (data.length / 2))]["name"]});



    chart.selectAll("line")
      .data(x.ticks(10))
      .enter().append("svg:line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", max_y)
      .attr("stroke", "#ccc");

    chart.selectAll("text.rule")
      .data(x.ticks(10))
      .enter().append("svg:text")
      .attr("class", "rule")
      .attr("x", x)
      .attr("y", 0)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(String);


    chart.append("svg:line")
      .attr("y1", 0)
      .attr("y2", max_y)
      .attr("stroke", "#000");

    chart.append("svg:text")
      .attr("x", (chart_width / 2) - x_offset)
      .attr("y", -(title_height))
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .text(query[3]);

}
