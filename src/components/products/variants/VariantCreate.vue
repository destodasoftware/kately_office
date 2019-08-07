<template>
  <div>
    <b-modal
      id="modal-VariantCreate"
      header-bg-variant="primary"
      header-text-variant="light"
      title="Varian Baru"
    >
      <div class="form-row">
        <div class="form-group col">
          <label>Warna</label>
          <input v-model="variant.color" type="text" class="form-control bg-light" />
        </div>
        <div class="form-group col">
          <label>Ukuran</label>
          <input v-model="variant.size" type="text" class="form-control bg-light" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label>Harga</label>
          <input v-model="variant.price" type="text" class="form-control bg-light" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Stok</label>
          <input v-model="variant.stock" type="text" class="form-control bg-light" />
        </div>
        <div class="form-group col">
          <label>Stok Minimum</label>
          <input v-model="variant.minimum_stock" type="text" class="form-control bg-light" />
        </div>
      </div>
      <template slot="modal-footer">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button variant="primary" @click="variantCreate">
          Simpan
        </b-button>
    </template>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'VariantCreate',
  data () {
    return {
      variant: {
        article: undefined,
        category: undefined,
        root: undefined,
        sku: undefined,
        name: '',
        cost: 0,
        price: 0,
        stock: 1,
        minimum_stock: 1,
        color: undefined,
        size: undefined
      }
    }
  },
  methods: {
    variantCreate () {
      const value = Object.assign({}, this.variant)
      value.sku = this.skuGen()
      this.$emit('variantCreate', value)
    },
    skuGen () {
      let random = Math.floor(Math.random() * 1000)
      let data = new Date()
      return `PRD-${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
    }
  }
}
</script>

<style>

</style>
