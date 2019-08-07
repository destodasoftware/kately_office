<template>
  <div v-if="propVariant" class="mb-4">
    <div v-if="variant" class="card">
      <div class="card-body">
        <h5 class="card-title">Detail Varian</h5>
        <div class="form-row">
          <div class="form-group col-md-7">
            <label>Nomer SKU</label>
            <input
              v-model="variant.sku"
              disabled
              type="text"
              class="form-control bg-light"
            >
            <small class="text-secondary">
              <i>* Nomer SKU digenerate dari sistem.</i>
            </small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Harga</label>
            <input
              v-model="variant.price"
              type="text"
              class="form-control bg-light"
            >
          </div>
          <div class="form-group col-md-6">
            <label>Stok</label>
            <input
              v-model="variant.stock"
              type="text"
              class="form-control bg-light"
            >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Ukuran</label>
            <input
              v-model="variant.size"
              type="text"
              class="form-control bg-light"
            >
          </div>
          <div class="form-group col-md-6">
            <label>Warna</label>
            <input
              v-model="variant.color"
              type="text"
              class="form-control bg-light"
            >
          </div>
        </div>
        <button @click="variantUpdate" class="btn btn-primary">
          Simpan Perubahan
        </button>
        <button @click="variantDestroy" class="btn btn-light">
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VariantDetail',
  props: {
    propVariant: Object
  },
  data () {
    return {
      variant: undefined
    }
  },
  methods: {
    variantCancel () {
      this.variant = undefined
      this.$emit('variantCancel', this.variant)
    },
    variantUpdate () {
      const value = Object.assign({}, this.variant)
      this.variant = undefined
      this.$emit('variantUpdate', value)
    },
    variantDestroy () {
      const value = Object.assign({}, this.variant)
      this.variant = undefined
      this.$emit('variantDestroy', value)
    }
  },
  mounted () {
    this.variant = this.propVariant
  },
  watch: {
    propVariant (n, o) {
      this.variant = n
    }
  }
}
</script>

<style>

</style>
