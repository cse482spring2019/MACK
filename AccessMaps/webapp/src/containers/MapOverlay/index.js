import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

const MapOverlay = props => {
  const {
    children,
    mediaType,
    viewingDirections,
    viewingRoute,
    viewingRouteInfo,
    viewingAlternate
  } = props;

  return (
    <div
      className={cn("map-overlay", {
        directions:
          mediaType === "mobile" &&
          (viewingDirections || viewingRouteInfo || viewingAlternate),
        routeview:
          mediaType === "mobile" &&
          (viewingRoute &&
            !viewingDirections &&
            !viewingRouteInfo &&
            !viewingAlternate)
      })}
    >
      {children}
    </div>
  );
};

MapOverlay.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  mediaType: PropTypes.oneOf(["mobile", "tablet", "desktop"]),
  viewingDirections: PropTypes.bool,
  viewingRoute: PropTypes.bool,
  viewingRouteInfo: PropTypes.bool,
  viewingAlternate: PropTypes.bool
};

MapOverlay.defaultProps = {
  children: null,
  mediaType: "desktop",
  viewingDirections: false,
  viewingRoute: false,
  viewingRouteInfo: false,
  viewingAlternate: false
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  viewingDirections: state.activities.viewingDirections,
  viewingRoute: state.activities.viewingRoute,
  viewingRouteInfo: state.activities.viewingRouteInfo,
  viewingAlternate: state.activities.viewingAlternate
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapOverlay);
