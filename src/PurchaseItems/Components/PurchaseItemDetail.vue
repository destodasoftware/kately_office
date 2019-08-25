<template>
  <div v-if="purchaseItem" class="row">
    <div v-if="myPurchaseItem" class="col-md-12">
      <div v-if="!isEdit" @click="onEdit">
        <div class="form-group">
          <label>SKU</label>
          <div class="text-primary">
            {{ myPurchaseItem.product_sku }}
          </div>
        </div>
        <div class="form-group">
          <label>Produk</label>
          <div class="text-primary">
            {{ myPurchaseItem.product_name }}
          </div>
        </div>
        <div class="form-group">
          <label>Stok</label>
          <div class="text-primary">
            {{ myPurchaseItem.quantity }}
          </div>
        </div>
      </div>
      <div v-if="isEdit">
        <div class="form-group">
          <label>SKU</label>
          <div class="text-primary">
            {{ myPurchaseItem.product_sku }}
          </div>
        </div>
        <div class="form-group">
          <label>Produk</label>
          <div class="text-primary">
            {{ myPurchaseItem.product_name }}
          </div>
        </div>
        <div class="form-group">
          <label>Stok</label>
          <input
            type="text"
            class="form-control"
            v-model="myPurchaseItem.quantity"
          >
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
  name: 'PurchaseItemDetail',
  props: {
    purchaseItem: Object
  },
  data () {
    return {
      myPurchaseItem: undefined,
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
      this.$emit('onUpdate', this.myPurchaseItem)
    }
  },
  watch: {
    purchaseItem (n, o) {
      this.myPurchaseItem = n
    }
  },
  mounted () {
    this.myPurchaseItem = this.purchaseItem
  }
}
</script>

<style>

</style>
