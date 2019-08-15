<template>
  <div v-if="propSale">
    <div v-if="sale" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Detil Penjualan</h5>
        <div class="form-group">
          <label>Nomer Penjualan</label>
          <input v-model="sale.sale_number" type="text" class="form-control bg-light" disabled />
        </div>
        <div class="form-group">
          <label>PIC</label>
          <input v-model="sale.pic" type="text" class="form-control bg-light" disabled />
        </div>
        <div class="form-group no-print">
          <label>Status</label>
          <select v-model="sale.status" disabled class="custom-select">
            <option v-for="st in status" :key="st.value" :value="st.value">
              {{ st.text }}
            </option>
          </select>
        </div>
        <div class="form-group no-print">
          <label>Total </label>
          <div class="text-primary">Rp. {{ sale.total }}</div>
        </div>
        <div v-if="!hideAction" class="form-group no-print">
          <button @click="saleUpdate" class="btn btn-primary">Simpan Perubahan</button>
          <button @click="saleDestroy" class="btn btn-light">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleDetail',
  props: {
    propSale: Object,
    hideAction: Boolean
  },
  data () {
    return {
      sale: undefined,
      status: [
        {
          value: 'open',
          text: 'Baru'
        },
        {
          value: 'archived',
          text: 'Arsip'
        },
        {
          value: 'cancel',
          text: 'Cancel'
        }
      ]
    }
  },
  methods: {
    saleUpdate () {
      const value = Object.assign({}, this.sale)
      this.$emit('saleUpdate', value)
    },
    saleDestroy () {
      const value = Object.assign({}, this.sale)
      this.sale = undefined
      this.$emit('saleDestroy', value)
    }
  },
  created () {
    this.sale = this.propSale
  },
  watch: {
    propSale (n, o) {
      this.sale = n
    }
  }
}
</script>

<style>

</style>
