<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody v-if="payments.length > 0">
          <tr
            :class="{'bg-primary text-light': payment.id === id}"
            @click="onSelect(payment)"
            v-for="payment in payments"
            :key="payment.id"
          >
            <td>{{ payment.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentList',
  props: {
    payments: Array
  },
  data () {
    return {
      id: undefined
    }
  },
  methods: {
    onSelect (payment) {
      this.id = payment.id
      this.$emit('onSelect', payment)
    }
  }
}
</script>

<style>

</style>
