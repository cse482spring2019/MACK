import { combineReducers } from "redux";

import {
  EXIT_TRIP_PLANNING,
  CLOSE_MAP_INFO,
  CLOSE_DIRECTIONS,
  CLOSE_REGION_SELECTIONS,
  CLOSE_SIGNUP_PROMPT,
  CLEAR_SELECTED_FEATURES,
  CONFIRM_OBSTACLE_LOCATION,
  HIDE_DRAWER,
  OPEN_REGION_SELECTIONS,
  OPEN_SIGNUP_PROMPT,
  RECEIVE_ROUTE,
  SELECT_PROFILE,
  SELECT_REGION,
  SHOW_DRAWER,
  TOGGLE_SETTING_PROFILE,
  VIEW_DIRECTIONS,
  VIEW_MAP_INFO,
  VIEW_ROUTE_INFO,
  VIEW_ALTERNATE_ROUTE
} from "actions";

import { defaultActivities as defaults } from "reducers/defaults";

const handleConfirmingObstacleLocation = (
  state = defaults.confirmingObstacleLocation,
  action
) => {
  switch (action.type) {
    case CONFIRM_OBSTACLE_LOCATION:
      return true;
    case CLEAR_SELECTED_FEATURES:
      return false;
    case CLOSE_DIRECTIONS:
      return false;
    default:
      return state;
  }
};

const handleDrawerVisible = (state = defaults.drawerVisible, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return true;
    case HIDE_DRAWER:
      return false;
    default:
      return state;
  }
};

const handlePromptingSignup = (state = defaults.promptingSignup, action) => {
  switch (action.type) {
    case OPEN_SIGNUP_PROMPT:
      return true;
    case CLOSE_SIGNUP_PROMPT:
      return false;
    default:
      return state;
  }
};

const handleSelectingRegion = (state = defaults.selectingRegion, action) => {
  switch (action.type) {
    case OPEN_REGION_SELECTIONS:
      return true;
    case CLOSE_REGION_SELECTIONS:
      return false;
    case SELECT_REGION:
      return false;
    default:
      return state;
  }
};

const handleSettingProfile = (state = defaults.settingProfile, action) => {
  switch (action.type) {
    case SELECT_PROFILE:
      return action.payload === "custom";
    case TOGGLE_SETTING_PROFILE:
      return !action.payload;
    default:
      return state;
  }
};

const handleViewingDirections = (
  state = defaults.viewingDirections,
  action
) => {
  switch (action.type) {
    case VIEW_DIRECTIONS:
      return true;
    case CLOSE_DIRECTIONS:
      return false;
    default:
      return state;
  }
};

const handleViewingMapInfo = (state = defaults.viewingMapInfo, action) => {
  switch (action.type) {
    case VIEW_MAP_INFO:
      return true;
    case CLOSE_MAP_INFO:
      return false;
    default:
      return state;
  }
};

const handleViewingRoute = (state = defaults.viewingRoute, action) => {
  switch (action.type) {
    case RECEIVE_ROUTE:
      return true;
    case EXIT_TRIP_PLANNING:
      // Was planning a trip, so toggling out of route view
      return false;
    default:
      return state;
  }
};

const handleViewingRouteInfo = (state = defaults.viewingRouteInfo, action) => {
  switch (action.type) {
    case VIEW_ROUTE_INFO:
      return true;
    case CLOSE_DIRECTIONS:
      return false;
    default:
      return state;
  }
};

const handleViewingAlternate = (state = defaults.viewingAlternate, action) => {
  switch (action.type) {
    case VIEW_ALTERNATE_ROUTE:
      return true;
    case CLOSE_DIRECTIONS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  confirmingObstacleLocation: handleConfirmingObstacleLocation,
  drawerVisible: handleDrawerVisible,
  promptingSignup: handlePromptingSignup,
  selectingRegion: handleSelectingRegion,
  settingProfile: handleSettingProfile,
  viewingDirections: handleViewingDirections,
  viewingMapInfo: handleViewingMapInfo,
  viewingRoute: handleViewingRoute,
  viewingRouteInfo: handleViewingRouteInfo,
  viewingAlternate: handleViewingAlternate
});
