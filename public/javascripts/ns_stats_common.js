$(function() {
   NSStats.App.boot();
});

var NSStats = (function (NSStats) {
   NSStats.Events = new function() {
       this.configEventRouter = function() {
           $(document).bind('nss.events.load_data', function(e) {
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
    };

    this.configLoadData = function() {
        var load_data_button = $('#select_list').find('#load_data');
        $(load_data_button).bind('click', function() {
            var map_name_selector = $('#select_list').find('#map_name');
            var build_number_selector = $('#select_list').find('#build_number');
            var url = '/' + build_number_selector.val() + '/' + map_name_selector.val() + '/';
            $.ajax({
                url: url,
                dataType: 'json',
                data: '',
                success: ''
            })

        });
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

GRAPH_QUERIES = [[ALIEN_TEAM, "target", "_type", "Number of Kharaa Deaths"], [MARINE_TEAM, "target", "_type", "Number of TSA Deaths"], [MARINE_TEAM, "attacker", "_type", "Kills by TSA Type"], [ALIEN_TEAM, "attacker", "_type", "Kills by Kharaa Type"], [MARINE_TEAM, "attacker", "_weapon", "TSA Kills by Weapon Type"], [ALIEN_TEAM, "attacker", "_weapon", "Kharaa Kills by Weapon Type"]];

HEAT_MAP_QUERIES = [["attacker", 1, "Marine kills."],["attacker", 2, "Alien kills."],["attacker", 3, "Marine and Alien kills."],["target", 1, "Marine deaths."],["target", 2, "Alien deaths."],["target", 3, "Marine and Alien deaths."]];
