<template>
  <div class="form-group">
    <input
      type="text"
      v-model="query"
      @keyup.13="search"
      class="form-control"
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
