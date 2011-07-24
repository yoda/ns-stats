var Point = function(_x,_y,_z) {
  var x = _x;
  var y = _y;
  var z = _z;

  this.x = x;
  this.y = y;
  this.z = z;
};

MAP_METADATA = [
  {
    'map_name': 'ns2_summit',
    'scale': new Point(414.368, 269.451, 414.368),
    'origin': new Point(36.0886, -42.1639, 59.3301),
  }
];

IMAGE_SIZE = 256;

function metadata_for_map(map_name) {
  var meta_data = {};
  $.each(MAP_METADATA, function(index, val) {
    if (val['map_name'] == map_name) {
      meta_data = val;
    }
  });
  return meta_data;
};

function screenSmallAspect() {
  // Client screen should be 256?
  return 256;
}

function screenScaleAspect() {
  // Server scale?
  return 1280;
}

function percentf(p, v) {
  return (p / 100) * v;
}

function scaledown(value, _av, _mv) {
  var av = _av;
  var mv = _mv
  if (mv != 0 && av >= mv) {
    return value;
  }
  if (mv == 0) {
    mv = av;
  }
  return percentf( (av / mv) * 100, value);
}

function guiScale(size) {
      return scaledown(size, screenSmallAspect(), screenScaleAspect()) * (2 - (screenSmallAspect() / screenScaleAspect()));
}

function kMapRatio(map_metadata) {
  if (map_metadata['scale'].z > map_metadata['scale'].x) {
    return map_metadata['scale'].z / map_metadata['scale'].x;
  } else {
    return map_metadata['scale'].x / map_metadata['scale'].z;
  }
}

// No idea wtf is going on here really.
// 300 in lua but i think the 300 might be based on the 1280 of the screenscaleaspect.
// So closest I've got is making it ~60 which is 256 / ( 1280 / 300)
//SCALE_FACTOR = guiScale(256 / (screenScaleAspect() / 300));
SCALE_FACTOR = 16;

function plotToMap(posX, posZ, map_metadata) {

    var adjustedX = posX - map_metadata['origin'].x;
    var adjustedZ = posZ - map_metadata['origin'].z;
    
    var xFactor = 4;
    var zFactor = xFactor / kMapRatio(map_metadata);


    var plottedX = (adjustedX / (map_metadata['origin'].x / xFactor)) * SCALE_FACTOR;//(map_metadata['scale'].x / (256 - map_metadata['origin'].x) * 10);
    var plottedY = (adjustedZ / (map_metadata['origin'].z / zFactor)) * SCALE_FACTOR;//(map_metadata['scale'].x / (256 - map_metadata['origin'].z) * 10);

    plottedX -= (256 / 2); // Shift origin
    plottedY -= (256 / 2);

    // The world space is oriented differently from the GUI space, adjust for that here.
    return {'y': -plottedX, 'x': -plottedY};
}


// prefix must be the prefix of the variable type eg. "attacker" is the prefix of "attackerx" or "attacker_team"
function draw_heatmap(data, bg, prefix, team_select, map_name) {
  var aliens = (team_select == ALIEN_TEAM);
  var marines = (team_select == MARINE_TEAM);
  var both = (team_select == BOTH_TEAM);
  var map_metadata = metadata_for_map(map_name);
  $.each(data, function(index, val) {

    var map_point = plotToMap(val[(prefix + "x")], val[(prefix + "z")], map_metadata);


    if ((val[prefix + "_team"] == 1) && (marines || both)) {
      var c = bg.circle(map_point['x'], map_point['y'], 2);
      c.attr({fill: "blue"});
    }
    if ((val[prefix + "_team"] == 2) && (aliens || both)) {
      var c = bg.circle(map_point['x'], map_point['y'], 2);
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
  //  alert(image_file);
  var image = bg.image(image_file, 0, 0, 256, 256);
  return bg;
}


function create_heatmap(query, map_name, data, target) {
    var a_bg = new_heatmap_canvas(IMAGE_SIZE, IMAGE_SIZE, target, query[2], map_name);
    draw_heatmap(data, a_bg, query[0], query[1], map_name);
}
