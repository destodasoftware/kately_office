<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h1 class="display-4">Produk Bulk</h1>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <button @click="bulk" v-if="products.length > 0" class="btn btn-primary">Simpan Produk</button>
        <button v-if="products.length <= 0" class="btn btn-secondary">Simpan Produk</button>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <div class="card bg-light border-light">
          <div class="card-body">
            <vue-csv-import :headers="true" :tableClass="'table table-borderless'" slot="content" v-model="products" :map-fields="fields"></vue-csv-import>
          </div>
        </div>
      </div>
    </div>
    <div v-if="products.length > 0" slot="content" class="row mb-2">
      <div class="col-md-12">
        <div class="card bg-light border-light">
          <div class="card-body">
            <table class="table table-borderless border-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Artikel</th>
                  <th>Kategori</th>
                  <th>Nama</th>
                  <th>Cost</th>
                  <th>Harga</th>
                  <th>stock</th>
                  <th>Minimum Stok</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr :class="{'bg-danger': error}" @click="productRetrieve" v-for="(p, i) in products" :key="i">
                  <td>
                    {{ i + 1 }}
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.article">
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.category">
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.name">
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.cost">
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.price">
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.stock">
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.minimum_stock">
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.size">
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="p.color">
                  </td>
                  <td>
                    <button @click="productDestroy(p)" class="btn btn-sm btn-light text-muted">Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'
import { VueCsvImport } from 'vue-csv-import'

export default {
  name: 'ProductBulkManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout,
    VueCsvImport
  },
  data () {
    return {
      products: [],
      product: undefined,
      error: false,
      fields: [
        'article',
        'category',
        'name',
        'cost',
        'price',
        'stock',
        'minimum_stock',
        'color',
        'size'
      ]
    }
  },
  methods: {
    productCreate (value) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/products/`
      return this.axios.post(url, value)
        .then((response) => {
          this.product = response.data
        })
        .catch(error => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    productRetrieve (product) {
      this.product = product
    },
    productDestroy (product) {
      this.products.splice(this.products.indexOf(product), 1)
    },
    bulk () {
      let dataBulk = Object.assign([], this.products)
      setTimeout(() => {
        dataBulk.forEach((item) => {
          item.sku = this.skuGen()
          this.productCreate(item)
            .then((response) => {
              this.products.splice(this.products.indexOf(item), 1)
            })
        })
      }, 1000)
    },
    skuGen () {
      let random = Math.floor(Math.random() * 10000)
      let data = new Date()
      return `PRD-${data.getDate()}${data.getMonth()}${data.getFullYear()}${random}`
    },
    onBarcodeScanned (barcode) {
      console.log(barcode)
      // do something...
    },
    // Reset to the last barcode before hitting enter (whatever anything in the input box)
    resetBarcode () {
      let barcode = this.$barcodeScanner.getPreviousCode()
      console.log(barcode)
      // do something...
    }
  },
  created () {
    // Add barcode scan listener and pass the callback function
    this.$barcodeScanner.init(this.onBarcodeScanned)
  },
  destroyed () {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy()
  }
}
</script>

<style>

</style>
