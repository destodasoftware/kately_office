<template>
  <div v-if="saleItem" class="row">
    <div v-if="mySaleItem" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>Nama Produk</label>
          <div class="text-primary">
            {{ mySaleItem.product_name }}
          </div>
        </div>
        <div class="form-group">
          <label>Harga</label>
          <div class="text-primary">
            {{ mySaleItem.price }}
          </div>
        </div>
        <div class="form-group">
          <label>Jumlah</label>
          <div class="text-primary">
            {{ mySaleItem.quantity }}
          </div>
        </div>
        <div class="form-group">
          <label>Diskon</label>
          <div class="text-primary">
            {{ mySaleItem.discount }}
          </div>
        </div>
      </div>
      <div v-if="isEdit">
        <div class="form-group">
          <label>Nama Produk</label>
          <div class="text-primary">
            {{ mySaleItem.product_name }}
          </div>
        </div>
        <div class="form-group">
          <label>Harga</label>
          <input
            type="text"
            class="form-control"
            v-model="mySaleItem.price"
          />
        </div>
        <div class="form-group">
          <label>Jumlah</label>
          <input
            type="text"
            class="form-control"
            v-model="mySaleItem.quantity"
          />
        </div>
        <div class="form-group">
          <label>Diskon</label>
          <input
            type="text"
            class="form-control"
            v-model="mySaleItem.discount"
          />
        </div>
        <div class="form-group">
          <label>Jenis Diskon</label>
          <select
            class="form-control"
            v-model="mySaleItem.is_percent"
          >
            <option :value="true">Dalam Persen (%)</option>
            <option :value="false">Dalam Nominal (Rp)</option>
          </select>
        </div>
        <div class="form-group">
          <button
            @click="onUpdate"
            class="btn btn-primary"
          >
            Simpan
          </button>
          <button
            class="btn btn-link text-muted"
            @click="onCancel"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleItemDetail',
  props: {
    saleItem: Object
  },
  data () {
    return {
      mySaleItem: undefined,
      isEdit: false
    }
  },
  methods: {
    onEdit () {
      this.isEdit = true
    },
    onCancel () {
      this.isEdit = false
    },
    onUpdate () {
      this.onCancel()
      this.$emit('onUpdate', this.mySaleItem)
    }
  },
  watch: {
    saleItem (n, o) {
      this.mySaleItem = n
    }
  },
  mounted () {
    this.mySaleItem = this.saleItem
  }
}
</script>

<style>

</style>
