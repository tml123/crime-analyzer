import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function incidentReducer(state = initialState.incidents, action) {
  switch(action.type) {
    case types.LOAD_INCIDENTS_SUCCESS:
      return action.incidents;
    default:
      return state;
  }
}
