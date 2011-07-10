// prefix must be the prefix of the variable type eg. "attacker" is the prefix of "attackerx" or "attacker_team"
function draw_heatmap(data, bg, prefix, team_select) {
  var aliens = (team_select == ALIEN_TEAM);
  var marines = (team_select == MARINE_TEAM);
  var both = (team_select == BOTH_TEAM);
  var scale = 1.26;
  var offsetx = 52;
  var offsety = 82;
  $.each(data, function(index, val) {
    if ((val[prefix + "_team"] == 1) && (marines || both)) {
      var c = bg.circle((val[(prefix + "z")]*scale) + offsetx, (val[(prefix + "x")]*scale) + offsety, 2);
      c.attr({fill: "blue"});
    }
    if ((val[prefix + "_team"] == 2) && (aliens || both)) {
      var c = bg.circle((val[(prefix + "z")]*scale) + offsetx, (val[(prefix + "x")]*scale) + offsety, 2);
      c.attr({fill: "green"});
    }

  });
}

function new_heatmap_canvas(height, width, container_element, title, map_name) {
  $(container_element).append("<div class='graph left' style='width: 258px;'> <div class='target'></div><br />" + title + "</div>");
  var canvas_container = $(container_element).children(':last');
  var bg_elem = $(canvas_container).find('.target');
  var bg = Raphael(bg_elem.get(0), height, width);
  var image_file = image_root + map_name + ".png"
    alert(image_file);
  var image = bg.image(image_file, 0, 0, 256, 256);
  return bg;
}


function create_heatmap(query, map_name, data) {
    var a_bg = new_heatmap_canvas(256, 256, "#graphs", query[2], map_name);
    draw_heatmap(data, a_bg, query[0], query[1]);
}
