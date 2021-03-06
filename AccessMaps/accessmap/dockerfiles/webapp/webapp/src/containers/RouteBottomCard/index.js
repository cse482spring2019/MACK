import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Button from "react-md/src/js/Buttons";
import Card, { CardActions, CardText } from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";

import { routeResult as routeResultProps } from "prop-schema";

const RouteBottomCard = props => {
  const {
    actions,
    routeResult,
    viewingDirections,
    viewingRoute,
    viewingRouteInfo,
    viewingAlternate
  } = props;

  if (!viewingRoute) return null;
  if (viewingDirections || viewingRouteInfo || viewingAlternate) return null;
  if (!routeResult) return null;
  if (routeResult.code !== "Ok") return null;

  const route = routeResult.routes[0];

  const distance = route.distance.toFixed(0);
  const duration = (route.duration / 60).toFixed(0);

  return (
    <Card className="route-bottom-card">
      <Toolbar title="Route">
        <CardText>
          {distance === 0 ? "< 1 meter" : `${distance} meters`}
        </CardText>
        <CardText>
          {duration === 0 ? "< 1 minute" : `${duration} minutes`}
        </CardText>
      </Toolbar>
      <CardActions>
        <Button
          className="route-bottom-card--button"
          raised
          primary
          onClick={() => actions.viewRouteInfo(routeResult)}
        >
          Trip info
        </Button>
        <Button
          className="route-bottom-card--button"
          raised
          primary
          onClick={() => actions.viewDirections(routeResult)}
        >
          Directions
        </Button>
        <Button
          className="route-bottom-card--button"
          raised
          primary
          onClick={() => actions.viewAlternateRoute(routeResult)}
        >
          Reroute
        </Button>
      </CardActions>
    </Card>
  );
};

RouteBottomCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  routeResult: routeResultProps,
  viewingDirections: PropTypes.bool,
  viewingRoute: PropTypes.bool,
  viewingRouteInfo: PropTypes.bool,
  viewingAlternate: PropTypes.bool
};

RouteBottomCard.defaultProps = {
  routeResult: null,
  viewingRoute: false,
  viewingRouteInfo: false,
  viewingDirections: false,
  viewingAlternate: false
};

const mapStateToProps = state => ({
  routeResult: state.route.routeResult,
  viewingRouteInfo: state.activities.viewingRouteInfo,
  viewingDirections: state.activities.viewingDirections,
  viewingRoute: state.activities.viewingRoute,
  viewingAlternate: state.activities.viewingAlternate
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteBottomCard);
