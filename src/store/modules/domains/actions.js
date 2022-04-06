import axios from 'axios';

window.axios = axios
axios.defaults.baseURL = 'http://localhost:8080'
axios.interceptors.request.use(function(config){
    config.headers.common = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type":"application/json",
        Accept:"application/json"
    }
    return config;
})

export default {
  async loadDomains(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await axios.get(
      `https://api.staging.webglobe.com/domains?full=true`
    );
    const responseData = await response.data;

    if (!response) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const domains = [];

    for (const key of responseData.all) {
      const domain = {
        id: key.domain_id,
        domain: key.domain
      };
      domains.push(domain);
    }

    context.commit('setDomains', domains);
    context.commit('setFetchTimestamp');
  },
  async loadDomain(context, payload) {
    const response = await axios.get(
      `https://api.staging.webglobe.com/domains/${payload.id}`
    );
    const responseData = await response.data.data;

    if (!response) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const domain = {
      domain_id: responseData.domain_id,
      domain: responseData.domain,
      domain_package: responseData.package,
      registrant: responseData.registrant,
      registrar: responseData.registrar,
      valid: responseData.valid_till,
      period: responseData.period
    };
    

    context.commit('setDomain', domain);
  }
};
