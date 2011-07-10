// Defaults / Globals / Defs
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
