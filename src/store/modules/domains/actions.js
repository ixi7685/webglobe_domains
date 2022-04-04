import axios from 'axios';

export default {
  async loadDomains(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await axios.get(
      `https://private-anon-a7281b5df3-zkp.apiary-mock.com/domains?full=true`
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

    console.log(domains);
    context.commit('setDomains', domains);
    context.commit('setFetchTimestamp');
  },
  async loadDomain(context, payload) {
    const response = await axios.get(
      `https://private-anon-cf8badc0b3-zkp.apiary-mock.com/domains/${payload.id}`
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
