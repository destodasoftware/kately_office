<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nomer Penjualan</label>
        <input type="text" class="form-control" v-model="query.sale_number" @keypress.enter="onFilter" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleItemFilter',
  data () {
    return {
      query: {
        sale_number: ''
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
