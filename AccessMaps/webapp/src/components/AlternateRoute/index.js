import React from "react";
import PropTypes from "prop-types";

import Button from "react-md/src/js/Buttons";
import {
  CardText,
  Card,
  CardActions,
  CardActionsProps
} from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";
import DirectionsCard from "components/DirectionsCard";

import { routeResult as routeResultProps } from "prop-schema";

const AlternateRoute = props => {
  const { onClose, routeResult } = props;

  return (
    <React.Fragment>
      <Toolbar
        title="Confirm"
        colored
        actions={[
          <Button key="directions-close-button" icon onClick={onClose}>
            close
          </Button>
        ]}
      />

      <Card>
        <CardText className="alternate--card">
          Please confirm that this is the correct street.
        </CardText>
      </Card>
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
