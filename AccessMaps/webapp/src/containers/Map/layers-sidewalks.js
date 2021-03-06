import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Layer } from "react-mapbox-gl";

import { getCurrentProfile } from "selectors";

import { uphillColorMap, downhillColorMap } from "colors";

// TODO: put the code for this icon in its own module
/* eslint-disable import/no-webpack-loader-syntax */
import directionArrowURL from "!file-loader!images/direction-arrow.png";
import directionArrowWhiteURL from "!file-loader!images/direction-arrow-white.png";
/* eslint-enable import/no-webpack-loader-syntax */

const directionArrow = new Image();
directionArrow.src = directionArrowURL;
directionArrow.height = 48;
directionArrow.width = 24;

const directionArrowWhite = new Image();
directionArrowWhite.src = directionArrowWhiteURL;
directionArrowWhite.height = 48;
directionArrowWhite.width = 24;

const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [WIDTH_INACCESSIBLE * 4, WIDTH_INACCESSIBLE * 1.5];

const Sidewalks = props => {
  const {
    uphillMax,
    downhillMax,
    speed,
    inclineUphill,
    blacklistedIds
  } = props;

  // Pick an odd number so that equal amount on each side of 0
  const nSamples = 15;
  // Scaled from -1 to 1
  const nSide = parseInt(nSamples / 2);
  // TODO: center at ideal incline instead of 0?
  const range = [...Array(nSamples).keys()].map(d => (d - nSide) / nSide);

  let inclineSamples;
  let colorMap;
  if (inclineUphill) {
    // Scaled 0 -> uphillMax
    inclineSamples = range.map(d => d * uphillMax);
    colorMap = uphillColorMap(uphillMax, downhillMax, speed);
  } else {
    // Scaled 0 -> downhillMax
    inclineSamples = range.map(d => d * -downhillMax);
    colorMap = downhillColorMap(uphillMax, downhillMax, speed);
  }

  const inclineStops = [];
  inclineSamples.map(d => {
    const color = colorMap(d);
    inclineStops.push(d);
    inclineStops.push(color.hex());
  });

  // Set bounds for when elevations become 'too steep' on display.
  const boundMax = inclineUphill ? uphillMax : -downhillMax;
  const boundMin = inclineUphill ? -uphillMax : downhillMax;

  // Expressions
  const widthExpression = [
    "interpolate",
    ["linear"],
    ["zoom"],
    10,
    0.1,
    16,
    5,
    20,
    24
  ];

  const isSidewalkExpression = ["==", ["get", "footway"], "sidewalk"];

  const accessibleExpression = [
    "case",
    [">", ["to-number", ["get", "incline"]], boundMax],
    false,
    ["<", ["to-number", ["get", "incline"]], boundMin],
    false,
    //["==", ["get", "id"], blacklistedIds],
    //false,
    true
  ];

  //  const inBlacklistedExpression = [false];

  const accessibleSidewalkExpression = [
    "all",
    isSidewalkExpression,
    accessibleExpression
    //["!", inBlacklistedExpression]
  ];

  const inaccessibleSidewalkExpression = [
    "all",
    isSidewalkExpression,
    ["!", accessibleExpression]
    //  inBlacklistedExpression
  ];

  return (
    <React.Fragment>
      <Layer
        id="sidewalk-click"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        filter={accessibleSidewalkExpression}
        paint={{
          "line-width": widthExpression,
          "line-opacity": 0
        }}
        before="bridge-street"
      />
      <Layer
        id="sidewalk-outline"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        layout={{ "line-cap": "round" }}
        filter={accessibleSidewalkExpression}
        paint={{
          "line-color": "#000",
          "line-width": {
            stops: [[14, 0.0], [20, 1]]
          },
          "line-opacity": {
            stops: [[13.5, 0.0], [16, 1]]
          },
          "line-gap-width": widthExpression
        }}
        before="bridge-street"
      />
      <Layer
        id="sidewalk-inaccessible"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        filter={inaccessibleSidewalkExpression}
        paint={{
          "line-color": "#ff0000",
          "line-dasharray": {
            stops: [
              [12, [DASH_INACCESSIBLE[0] * 2, DASH_INACCESSIBLE[1] * 4]],
              [14, [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 2]],
              [16, [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 1.5]]
            ]
          },
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            WIDTH_INACCESSIBLE / 4,
            16,
            WIDTH_INACCESSIBLE,
            20,
            WIDTH_INACCESSIBLE * 4
          ]
        }}
        before="bridge-street"
      />
      <Layer
        id="sidewalk"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        layout={{ "line-cap": "round" }}
        filter={accessibleSidewalkExpression}
        paint={{
          "line-color": [
            "case",
            [">", ["to-number", ["get", "incline"]], boundMax],
            "#ff0000",
            ["<", ["to-number", ["get", "incline"]], boundMin],
            "#ff0000",
            [
              "interpolate",
              ["linear"],
              ["to-number", ["get", "incline"]],
              ...inclineStops
            ]
          ],
          "line-width": widthExpression
        }}
        before="bridge-street"
      />
      <Layer
        id="sidewalk-downhill-arrow"
        type="symbol"
        sourceId="pedestrian"
        sourceLayer="transportation"
        minZoom={16}
        images={[
          ["direction-arrow", directionArrow],
          ["direction-arrow-white", directionArrowWhite]
        ]}
        filter={accessibleSidewalkExpression}
        layout={{
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "icon-image": [
            "case",
            [
              ">",
              [
                "case",
                ["<", ["to-number", ["get", "incline"]], 0],
                ["*", -1, ["to-number", ["get", "incline"]]],
                ["to-number", ["get", "incline"]]
              ],
              Math.abs((inclineStops[0] + inclineStops[2]) / 2)
            ],
            "direction-arrow-white",
            "direction-arrow"
          ],
          "icon-rotate": [
            "case",
            [">=", ["to-number", ["get", "incline"]], 0],
            270,
            90
          ],
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            16,
            0.1,
            18,
            0.3,
            20,
            0.4
          ],
          "symbol-placement": "line",
          "icon-padding": 0,
          "symbol-spacing": [
            "interpolate",
            ["linear"],
            ["zoom"],
            16,
            50,
            20,
            200
          ]
        }}
        paint={{
          "icon-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            16,
            0.0,
            16.25,
            0.9
          ]
        }}
        before="bridge-street"
      />
    </React.Fragment>
  );
};

Sidewalks.propTypes = {
  uphillMax: PropTypes.number.isRequired,
  downhillMax: PropTypes.number.isRequired,
  inclineUphill: PropTypes.bool,
  speed: PropTypes.number.isRequired,
  blacklistedIds: PropTypes.array
};

Sidewalks.defaultProps = {
  inclineUphill: true,
  blacklistedIds: null
};

const mapStateToProps = state => {
  const { map } = state;

  const currentProfile = getCurrentProfile(state);

  return {
    uphillMax: currentProfile.uphillMax,
    downhillMax: currentProfile.downhillMax,
    speed: currentProfile.speed,
    inclineUphill: map.inclineUphill,
    blacklistedIds: state.route.blacklistedIds
  };
};

export default connect(mapStateToProps)(Sidewalks);
