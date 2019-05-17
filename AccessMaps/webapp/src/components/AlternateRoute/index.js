import React from "react";
import PropTypes from "prop-types";

import Button from "react-md/src/js/Buttons";
import { CardText } from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";
import { routeResult as routeResultProps } from "prop-schema";
import DirectionsCard from "components/DirectionsCard";

const AlternateRoute = props => {
  const { onClose, routeResult } = props;

  return (
    <React.Fragment>
      <Toolbar
        title="Alternate Route"
        actions={[
          <Button key="directions-close-button" icon onClick={onClose}>
            close
          </Button>
        ]}
      />
      <CardText>
        <h2>Please mark the location of the obstruction on the route</h2>
      </CardText>
    </React.Fragment>
  );
};

AlternateRoute.propTypes = {
  onClose: PropTypes.func,
  routeResult: routeResultProps
};

AlternateRoute.defaultProps = {
  onClose: null,
  routeResult: null
};

export default AlternateRoute;
