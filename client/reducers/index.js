import { combineReducers } from 'redux';
import incidents from './incidentReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  incidents,
  ajaxCallsInProgress
});

export default rootReducer;
