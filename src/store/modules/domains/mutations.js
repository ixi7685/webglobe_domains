export default {
  setDomains(state, payload) {
    state.domains = payload;
  },
  setDomain(state, payload) {
    state.domain = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
