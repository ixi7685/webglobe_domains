<template>
  <div>
    <section>
      <base-card>
        <div v-if="!selectedDomain"><base-spinner></base-spinner></div>
        <div v-else>
          <header>
            <h1>Domain info</h1>
          </header>
          <h3>Domain id : {{ selectedDomain.domain_id }}</h3>
          <h3>Domain : {{ selectedDomain.domain }}</h3>
          <h3>Registrar : {{ selectedDomain.registrar }}</h3>
          <h3>Registrant : {{ selectedDomain.registrant }}</h3>
          <h3>Package : {{ selectedDomain.domain_package }}</h3>
          <h3>Period : {{ selectedDomain.period }} months</h3>
          <h3>Valid untill: {{ selectedDomain.valid }}</h3>
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedDomain: null,
      isLoading: ''
    };
  },
  methods: {
    async loadDomain() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('domains/loadDomain', {
          id: this.id
        });
        this.selectedDomain = this.$store.getters['domains/domain'];
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadDomain();
  }
};
</script>
