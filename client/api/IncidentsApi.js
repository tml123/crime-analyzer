import axios from 'axios';

class IncidentsApi {
  static getIncidents(params) {
    return axios.get('/api/incidents',
                      {params}
                    );
  }
}

export default IncidentsApi;
