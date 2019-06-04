import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MapMarker from "components/MapMarker";
import { pointFeatureNoProps } from "prop-schema";
import pointFeature from "utils/point-feature";

const Waypoints = props => {
  const { destination, origin, poi, selectedFeature, obstacle } = props;

  let originComponent = null;
  if (origin) {
    originComponent = (
      <MapMarker coordinates={origin.geometry.coordinates} label="A" />
    );
  }

  let destinationComponent = null;
  if (destination) {
    destinationComponent = (
      <MapMarker coordinates={destination.geometry.coordinates} label="B" />
    );
  }

  let obstacleComponent = null;
  if (obstacle) {
    obstacleComponent = (
      <MapMarker coordinates={obstacle.geometry.coordinates} label="!" />
    );
  }

  let poiComponent = null;
  if (selectedFeature) {
    poiComponent = (
      <MapMarker coordinates={selectedFeature.location} label="!" />
    );
  } else if (poi) {
    poiComponent = <MapMarker coordinates={poi.geometry.coordinates} />;
  }

  return (
    <React.Fragment>
      {originComponent}
      {destinationComponent}
      {poiComponent}
      {obstacleComponent}
    </React.Fragment>
  );
};

Waypoints.propTypes = {
  destination: pointFeatureNoProps,
  origin: pointFeatureNoProps,
  poi: pointFeatureNoProps,
  obstacle: pointFeatureNoProps,
  selectedFeature: PropTypes.shape({
    layer: PropTypes.string,
    layerName: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.number),
    properties: PropTypes.object
  })
};

Waypoints.defaultProps = {
  destination: null,
  origin: null,
  poi: null,
  obstacle: null,
  selectedFeature: null
};

const mapStateToProps = state => {
  const { map, waypoints } = state;

  const selectedWaypoints = {};
  Object.entries(waypoints).forEach(([key, value]) => {
    if (value) {
      selectedWaypoints[key] = pointFeature(value.lon, value.lat, value.name);
    } else {
      selectedWaypoints[key] = null;
    }
  });

  const { poi, origin, destination, obstacle } = selectedWaypoints;

  return {
    destination,
    origin,
    poi,
    obstacle,
    selectedFeature: map.selectedFeature
  };
};

export default connect(mapStateToProps)(Waypoints);
