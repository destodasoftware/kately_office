<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">Filter Laporan Penjualan</h5>
      <div class="row mb-2">
        <div class="col-md-3">
          <div class="form-group">
            <label>Dari Tanggal</label>
            <input v-model="query.from_date" type="date" class="form-control bg-light" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label>Sampai Tanggal</label>
            <input v-model="query.to_date" type="date" class="form-control bg-light" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label>Status Pembayaran</label>
            <div class="form-check">
              <input v-model="query.is_paid" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Is Paid?
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label>Brand</label>
            <div v-b-modal.modal-BrandList v-if="!brand" class="text-muted">No Brand</div>
            <div v-b-modal.modal-BrandList v-if="brand" class="text-primary">{{ brand.name }}</div>
            <b-modal id="modal-BrandList" title="Pilih Brand">
              <BrandList
                :propBrands="brands"
                :propPagination="paginationBrand"
                @brandRetrieve="selectedBrand"
                @brandListSearch="brandListSearch"
              />
            </b-modal>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button @click="saleReportFilter" class="btn btn-primary">Filter Laporan</button>
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'
import BrandList from '@/components/brands/BrandList'

export default {
  name: 'SaleReportFilter',
  mixins: [
    MixinHttp
  ],
  data () {
    return {
      brands: [],
      brand: undefined,
      paginationBrand: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      query: {
        from_date: '',
        to_date: '',
        is_paid: true,
        brand: ''
      }
    }
  },
  methods: {
    brandRetrieve (value) {
      this.brand = value
    },
    brandList () {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url)
        .then((response) => {
          this.brands = response.data.results
          this.paginationBrand.next = response.data.next
          this.paginationBrand.previous = response.data.previous
          this.paginationBrand.count = response.data.count
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    brandListSearch (query) {
      this.httpInit()
      const url = `${process.env.ROOT_API}/office/brands/`
      return this.axios.get(url, {params: query})
        .then((response) => {
          this.brands = response.data.results
          this.paginationBrand.next = response.data.next
          this.paginationBrand.previous = response.data.previous
          this.paginationBrand.count = response.data.count
        })
        .catch((error) => {
          this.$bvToast.toast(error.message, error.config.option)
        })
    },
    saleReportFilter () {
      this.$emit('saleReportFilter', this.query)
    }
  },
  mounted () {
    this.brandList()
  }
}
</script>

<style>

</style>
