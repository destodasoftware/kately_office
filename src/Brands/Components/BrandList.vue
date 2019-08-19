<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nama Brand</th>
          </tr>
        </thead>
        <tbody v-if="brands.length > 0">
          <tr
            :class="{'bg-primary text-light': brand.id === id}"
            v-for="brand in brands"
            :key="brand.id"
            @click="onSelect(brand)"
          >
            <td>{{ brand.name }}</td>
          </tr>
        </tbody>
        <tbody v-if="brands.length <= 0">
          <tr>
            <td>No data</td>
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
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (value) {
      this.id = value.id
      this.$emit('onSelect', value)
    }
  }
}
</script>
