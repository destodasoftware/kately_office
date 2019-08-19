<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama Brand</label>
        <input @keypress.enter="onFilter" type="text" class="form-control" v-model="query.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandFilter',
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
