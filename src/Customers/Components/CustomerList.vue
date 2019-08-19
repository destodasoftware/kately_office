<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nomer Pelanggan</th>
            <th>Nama Pelanggan</th>
            <th>Nomer Telepon</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody v-if="customers.length > 0">
          <tr
            :class="{'bg-primary text-light': customer.id === id}"
            @click="onSelect(customer)"
            v-for="customer in customers" :key="customer.key">
            <td>{{ customer.customer_number }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.email }}</td>
          </tr>
        </tbody>
        <tbody v-if="customers.length <= 0">
          <tr>
            <td colspan="4">No data</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerList',
  props: {
    customers: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (customer) {
      this.id = customer.id
      this.$emit('onSelect', customer)
    }
  }
}
</script>

<style>

</style>
