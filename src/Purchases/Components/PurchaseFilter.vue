<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nomer Pembelian</label>
        <input
          type="text"
          class="form-control"
          v-model="query.purchase_number"
          @keypress.enter="onFilter"
        >
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseFilter',
  data () {
    return {
      query: {
        purchase_number: ''
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
