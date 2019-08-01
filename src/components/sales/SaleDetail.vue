<template>
  <div v-if="propSale">
    <div v-if="sale" class="card bg-light border-light">
      <div class="card-body">
        <small class="text-muted no-print">Ubah Penjualan</small>
        <div class="form-group row">
          <label class="col-md-3">Nomer Transaksi</label>
          <div class="col-md-9">
            <p v-if="sale.sale_number" class="text-primary">{{ sale.sale_number }}</p>
            <p v-if="!sale.sale_number" class="text-primary">-</p>
          </div>
        </div>
        <div class="form-group row no-print">
          <label class="col-md-3">PIC</label>
          <div class="col-md-9">
            <p>{{ sale.pic }}</p>
          </div>
        </div>
        <div class="form-group row no-print">
          <label class="col-md-3">Total Penjualan</label>
          <div class="col-md-9">
            <p>{{ sale.total }}</p>
          </div>
        </div>
        <div class="form-group row no-print">
          <label class="col-md-3">Status</label>
          <div class="col-md-9">
            <select v-model="sale.status" class="custom-select">
              <option v-for="st in status" :key="st.value" :value="st.value">
                {{ st.text }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleDetail',
  props: {
    propSale: Object
  },
  data () {
    return {
      sale: undefined,
      status: [
        {
          value: 'unfulfilled',
          text: 'Unfulfilled'
        },
        {
          value: 'fulfilled',
          text: 'Fulfilled'
        },
        {
          value: 'finish',
          text: 'Finish'
        }
      ]
    }
  },
  methods: {
    edit () {
      this.sale = Object.assign({}, this.propSale)
    },
    abort () {
      this.sale = undefined
    },
    saleUpdate () {
      const value = Object.assign({}, this.sale)
      this.$emit('saleUpdate', value)
    },
    saleDestroy () {
      const value = Object.assign({}, this.sale)
      this.purchase = undefined
      this.$emit('saleDestroy', value)
    }
  },
  watch: {
    saleDestroy (n, o) {
      this.sale = undefined
    },
    propSale (n, o) {
      this.sale = this.propSale
    }
  }
}
</script>

<style>

</style>
