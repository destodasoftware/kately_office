<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody v-if="shippings.length > 0">
          <tr
            :class="{'bg-primary text-light': shipping.id === id}"
            @click="onSelect(shipping)"
            v-for="shipping in shippings"
            :key="shipping.id"
          >
            <td>{{ shipping.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShippingList',
  props: {
    shippings: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (shipping) {
      this.id = shipping.id
      this.$emit('onSelect', shipping)
    }
  }
}
</script>

<style>

</style>
