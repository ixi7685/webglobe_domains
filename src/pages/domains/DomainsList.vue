<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadDomains(true)"
            >Refresh</base-button
          >
          <div>
            <input
              required
              type="text"
              placeholder="Search domain"
              class="input_box"
              style="width: 300px"
              v-model="search"
            />
          </div>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>

        <ul v-else-if="filteredDomains">
          <domain-item
            v-for="domain in filteredDomains"
            :key="domain.id"
            :id="domain.id"
            :domain="domain.domain"
          ></domain-item>
        </ul>
        <h3 v-else>No domains found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import DomainItem from '../../components/domains/DomainItem';

export default {
  components: { DomainItem },
  data() {
    return {
      isLoading: false,
      error: null,
      search: ''
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    domains() {
      return this.$store.getters['domains/domains'];
    },
    filteredDomains() {
      console.log(this.domains);
      return this.domains.filter(domain => {
        let byName =
          domain.domain.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        return byName;
      });
    }
  },
  created() {
    this.loadDomains();
  },
  methods: {
    async loadDomains(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('domains/loadDomains', {
          forceRefresh: refresh
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.input_box {
  outline: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: white;
  border: 1px solid #3a0061;
  color: #3a0061;
  cursor: pointer;
  border-radius: 30px;
}

::-webkit-input-placeholder {
  /* Edge */
  color: #3a0061;
}
</style>
