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
};

