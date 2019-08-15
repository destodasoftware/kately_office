<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Kode Pelanggan</label>
        <input
          type="text"
          class="form-control"
          v-model="query.customer_number"
          @keypress.enter="onFilter"
        >
      </div>
      <div class="form-group">
        <label>Nama Pelanggan</label>
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
  name: 'CustomerFilter',
  data () {
    return {
      query: {
        customer_number: '',
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
