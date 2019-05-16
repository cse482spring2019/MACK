import React from "react";
import PropTypes from "prop-types";

import Button from "react-md/src/js/Buttons";
import { CardText } from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";

import { routeResult as routeResultProps } from "prop-schema";

const AlternateRoute = props => {
  const { onClose, routeResult } = props;

  const route = routeResult.routes[0];
  return (
    <React.Fragment>
      <Toolbar
        title="Find an Alternate Route"
        actions={[
          <Button key="close-trip-info-button" icon onClick={onClose}>
            close
          </Button>
        ]}
      />
      <CardText className="route-info--contents">
        <h4>Please mark the location of the obstruction on the route</h4>
      </CardText>
    </React.Fragment>
  );
};

Directions.propTypes = {
  onClose: PropTypes.func,
  routeResult: routeResultProps
};

Directions.defaultProps = {
  onClose: null,
  routeResult: null
};

export default AlternateRoute;
