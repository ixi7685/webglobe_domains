import { createStore } from 'vuex';

import domainsModule from './modules/domains/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    domains: domainsModule,
    auth: authModule
  }
});

export default store;