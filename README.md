NS2 Statistics

Requires:
A new web-browser that supports svg etc...

Technologies Used:
d3 javascript visualisation library - http://mbostock.github.com/d3/
jquery - http://jquery.com/
raphaeljs - http://raphaeljs.com/
nginx - http://www.nginx.org/
sinatra - http://www.sinatrarb.com/
thin - http://code.macournoyer.com/thin/

--------
#### Concept:
--------

Use the data from:
- http://unknownworldsstats.appspot.com/statkilldata?version=<version_number>&map=<map_name>
- http://unknownworldsstats.appspot.com/displayendgamestats?version=<version_number>&output=json
To create useful visualisations in respect to game play and game balancing. 

This application implements:

- Plotting of kill and death data from alien and marine teams on various maps.

## Getting Started

To get start, clone / copy the code.

Then run the code in your browser locally and copy paste the json dump from the above url into the text field and hit load data.
    

## Future

Make a lean proxy for the data inorder to do ajax calls and have a pretty interface to go through recent data. Extend the number of statistics generated, some ideas currently: lifespan per unit, kills per unit, deaths per unit, per map, across all maps etc, progression of game through time. Maybe a plugin to add more granularity of logs to allow player stats.

## Legal (TODO)
I use the artifacts that are created by Unknown Worlds Entertainment currently without permission however I am not using them for financial gain and nor do I condone them to be used by anyone else for financial gain.

