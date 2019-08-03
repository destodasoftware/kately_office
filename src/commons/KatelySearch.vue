<template>
  <div class="form-group no-print">
    <input
      type="text"
      v-model="query"
      @keyup.13="search"
      class="form-control bg-light border-light"
      :placeholder="propPlaceholder"
    />
  </div>
</template>

<script>
export default {
  name: 'KatelySearch',
  props: {
    propPlaceholder: String
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    search () {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style>

</style>
