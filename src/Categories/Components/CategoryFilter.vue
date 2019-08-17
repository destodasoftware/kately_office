<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama Kategori</label>
        <input
          type="text"
          class="form-control"
          v-model="query.name"
          @keypress.enter="onFilter"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryFilter',
  data () {
    return {
      query: {
        name: ''
      }
    }
  },
  methods: {
    onFilter () {
      this.$emit('onFilter', this.query)
    }
  }
}
</script>

<style>

</style>
