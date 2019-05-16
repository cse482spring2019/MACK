import React from "react";
import PropTypes from "prop-types";

import Button from "react-md/src/js/Buttons";
import { CardText } from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";

const AlternateRoute = props => {
  const { onClose, routeResult } = props;
  return (
    <React.Fragment>
      <Toolbar
        title="Find an Alternate Route"
        actions={[
          <Button key="close-alternatte-route-button" icon onClick={onClose}>
            close
          </Button>
        ]}
      />
      <CardText className="alternate-route--contents">
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

export default RouteInfo;
