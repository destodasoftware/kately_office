<template>
  <div class="row mb-4">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nama Brand</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brand in brands" :key="brand.id" @click="onSelect(brand)">
            <td>{{ brand.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandList',
  props: {
    brands: Array
  },
  methods: {
    onSelect (value) {
      this.$emit('onSelect', value)
    }
  }
}
</script>
