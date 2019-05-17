import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Card from "react-md/src/js/Cards";

import Directions from "components/Directions";
import RouteInfo from "components/RouteInfo";
import AlternateRoute from "components/AlternateRoute";

import { routeResult as routeResultProps } from "prop-schema";

const RouteBottomSheet = props => {
  const {
    actions,
    mediaType,
    routeResult,
    viewingDirections,
    viewingRouteInfo,
    viewingAlternate
  } = props;

  if (!viewingDirections && !viewingRouteInfo && !viewingAlternate) return null;
  if (mediaType !== "mobile") return null;

  return (
    <div className="route-bottom-sheet">
      <Card>
        <Directions
          onClose={() => actions.closeDirections(routeResult)}
          routeResult={routeResult}
        />

        <RouteInfo
          onClose={() => actions.closeDirections(routeResult)}
          routeResult={routeResult}
        />

        <AlternateRoute
          onClose={() => actions.closeDirections(routeResult)}
          routeResult={routeResult}
        />

        {/* {(() => {
          if (viewingDirections) {
            <Directions
              onClose={() => actions.closeDirections(routeResult)}
              routeResult={routeResult}
            />;
          } else if (viewingRouteInfo) {
            <RouteInfo
              onClose={() => actions.closeRouteInfo(routeResult)}
              routeResult={routeResult}
            />;
          } else if (viewingAlternate) {
            <AlternateRoute
              onClose={() => actions.closeAlternateRoute(routeResult)}
              routeResult={routeResult}
            />;
          }
        })()} */}
      </Card>
    </div>
  );
};

RouteBottomSheet.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.string,
  routeResult: routeResultProps,
  viewingDirections: PropTypes.bool,
  viewingRouteInfo: PropTypes.bool,
  viewingAlternate: PropTypes.bool
};

RouteBottomSheet.defaultProps = {
  mediaType: "desktop",
  routeResult: null,
  viewingDirections: false,
  viewingRouteInfo: false,
  viewingAlternate: false
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  routeResult: state.route.routeResult,
  viewingDirections: state.activities.viewingDirections,
  viewingRouteInfo: state.activities.viewingRouteInfo,
  viewingAlternate: state.activities.viewingAlternate
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteBottomSheet);
