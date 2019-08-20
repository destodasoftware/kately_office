<template>
  <div class="row">
    <div class="col-md-12">
      <slot></slot>
      <div class="form-group">
        <label>SKU</label>
        <input
          type="text"
          class="form-control"
          v-model="query.sku"
          @keypress.enter="onFilter"
        >
      </div>
      <div class="form-group">
        <label>Nama</label>
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
  name: 'ProductFilter',
  data () {
    return {
      query: {
        name: '',
        sku: ''
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
