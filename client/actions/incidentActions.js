import IncidentsApi from '../api/IncidentsApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadIncidentsSuccess(incidents) {
  return {type: types.LOAD_INCIDENTS_SUCCESS, incidents};
}

export function loadIncidents(params) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return IncidentsApi.getIncidents(params).then(incidents => {
      dispatch(loadIncidentsSuccess(incidents));
    }).catch(error => {
      throw(error);
    });
  };
}
