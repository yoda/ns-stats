$(function() {
   NSStats.App.boot();
});

var NSStats = (function (NSStats) {
   NSStats.Events = new function() {
       this.configEventRouter = function() {
           $(document).bind('nss.events.load_data_request', function() {
              // Hookup the onchange events and on click to go get data
           });
           $(document).bind('nss.events.load_data_failure', function() {
              // Hookup the onchange events and on click to go get data
           });
           $(document).bind('nss.events.load_data_success', function() {
              // Hookup the onchange events and on click to go get data
           });
       };
   };
   return NSStats
}(NSStats || {}));

var NSStats = (function (NSStats) {
    NSStats.App = new function() {
        this.boot = function() {
            NSStats.Events.configEventRouter();

            NSStats.App.configLoadData();
        };

        this.configLoadData = function() {
            var load_data_button = $('#select_list').find('#load_data');
            $(load_data_button).bind('click', function() {
                var map_name_selector = $('#select_list').find('#map_name');
                var build_number_selector = $('#select_list').find('#build_number');
                var url = 'statkilldata/' + build_number_selector.val() + '/' + map_name_selector.val();
                $(document).trigger('nss.events.load_data_request');
                $.ajax({
                    url: url,
                    dataType: 'json',
                    data: '',
                    success: function(statkill_data, textStatus, jqXHR) {
                        if(textStatus == "success") {
                            $(document).trigger('nss.events.load_data_success');
                            do_statkill_data_report(statkill_data, '#statkill_graphs');
                        } else {
                            $(document).trigger('nss.events.load_data_failure');
                        }
                    }
                })

            });


            var load_data_button2 = $('#select_list').find('#load_data');
            $(load_data_button).bind('click', function() {
                var build_number_selector = $('#select_list').find('#build_number');
                var url = 'statendgame/' + build_number_selector.val();
                $(document).trigger('nss.events.load_data_request');
                $.ajax({
                    url: url,
                    dataType: 'json',
                    data: '',
                    success: function(statendgame_data, textStatus, jqXHR) {
                        if(textStatus == "success") {
                            $(document).trigger('nss.events.load_data_success');
                            do_endgame_data_report(statendgame_data, '#statendgame_graphs');
                        } else {
                            $(document).trigger('nss.events.load_data_failure');
                        }
                    }
                })

            });


        };
    };
    return NSStats
}(NSStats || {}));

// Defaults / Global / Defs
//
MARINE_TEAM = 1;
MARINE_COLOR = "#025D8C";

ALIEN_TEAM = 2;
ALIEN_COLOR = "#028C5D";

BOTH_TEAM = 3;
DEFAULT_COLOR = "#CCCCCC";

VALID_BUILD_NUMBERS = [178, 179, 180, 181, 182];
VALID_MAP_NAMES = ['ns2_summit', 'ns2_rockdown', 'ns2_junction', 'ns2_tram' ];

image_root = "images/";

function team_color(team) {
  switch(team) {
    case MARINE_TEAM: {
      return MARINE_COLOR;
    }
    case (ALIEN_TEAM): {
      return ALIEN_COLOR;
    }
    default: {
      return DEFAULT_COLOR;
    }
  }
}

GRAPH_QUERIES = [[ALIEN_TEAM, "target", "_type", "Number of Kharaa Deaths", "target_team"], [MARINE_TEAM, "target", "_type", "Number of TSA Deaths", "target_team"], [MARINE_TEAM, "attacker", "_type", "Kills by TSA Type", "attacker_team"], [ALIEN_TEAM, "attacker", "_type", "Kills by Kharaa Type", "attacker_team"], [MARINE_TEAM, "attacker", "_weapon", "TSA Kills by Weapon Type", "attacker_team"], [ALIEN_TEAM, "attacker", "_weapon", "Kharaa Kills by Weapon Type", "attacker_team"]];

HEAT_MAP_QUERIES = [["attacker", MARINE_TEAM, "Marine kills."],["attacker", ALIEN_TEAM, "Alien kills."],["attacker", BOTH_TEAM, "Marine and Alien kills."],["target", MARINE_TEAM, "Marine deaths."],["target", ALIEN_TEAM, "Alien deaths."],["target", BOTH_TEAM, "Marine and Alien deaths."]];

STAT_ENDGAME_QUERIES = [[ALIEN_TEAM, "", "map", "Alien wins by map", "winner"], [MARINE_TEAM, "", "map", "Marine wins by map", "winner"]];
//PIE_CHART_QUERIES = [[],];

function do_statkill_data_report(statkill_data, target) {
    // Clear the target first.
    $(target).empty();


    var map_name = statkill_data[0]["map"];

    var i = 0;

//    for(i = 0; i < PIE_CHART_QUERIES.length; i += 1) {
//      create_piechart(PIE_CHART_QUERIES[i], map_name, statendgame_data);
//    }

    for(i = 0; i < HEAT_MAP_QUERIES.length; i += 1) {
        create_heatmap(HEAT_MAP_QUERIES[i], map_name, statkill_data, target);
    }

    for(i = 0; i < GRAPH_QUERIES.length; i += 1) {
        create_graph(GRAPH_QUERIES[i], statkill_data, target);
    }



}
function do_endgame_data_report(statendgame_data, target) {
    // Clear the target first.
    $(target).empty();

    var i = 0;

    for(i = 0; i < STAT_ENDGAME_QUERIES.length; i += 1) {
        create_graph(STAT_ENDGAME_QUERIES[i], statendgame_data, target);
    }
}
