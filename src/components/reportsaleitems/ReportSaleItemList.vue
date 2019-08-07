<template>
  <div class="mb-4">
    <!-- Filter -->
    <div class="card mb-4">
      <div class="card-body">
        <h4 class="card-title text-success">Filter</h4>
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>Dari Tanggal:</label>
              <input v-model="from_date" type="date" class="form-control" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>Sampai Tanggal:</label>
              <input v-model="to_date" type="date" class="form-control" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>Brand:</label>
              <div v-b-modal.modal-BrandList v-if="brand" class="text-success">{{ brand.name }}</div>
              <div v-b-modal.modal-BrandList v-if="!brand" class="text-muted">Pilih Brand</div>
              <b-modal id="modal-BrandList" size="lg" title="Brand">
                <div class="my-4">
                  <BrandList
                    :propBrands="brands"
                    :propPagination="paginationBrand"
                    @brandRetrieve="brandRetrieve"
                    @brandListSearch="brandListSearch"
                  />
                </div>
              </b-modal>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label>Pelanggan:</label>
              <div v-b-modal.modal-CustomerList v-if="customer" class="text-success">{{ customer.name }}</div>
              <div v-b-modal.modal-CustomerList v-if="!customer" class="text-muted">Pilih Pelanggan</div>
              <b-modal id="modal-CustomerList" size="lg" title="Pelanggan">
                <div class="my-4">
                  <CustomerList
                    :propCustomers="customers"
                    :propPagination="paginationCustomer"
                    @customerRetrieve="customerRetrieve"
                    @customerListSearch="customerListSearch"
                  />
                </div>
              </b-modal>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <button v-if="isActive" class="btn btn-success">Filter</button>
              <button v-if="!isActive" class="btn btn-secondary">Filter</button>
              <button class="btn btn-outline-success">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ./Filter -->
    <!-- List -->
    <div class="card mb-4">
      <div class="card-body" v-if="propReportSaleItems.length > 0">
        <h4 class="card-title text-success">Penjualan</h4>
        <div class="card-text">
          <table class="table">
            <thead>
              <tr>
                <th>Nomer Produk</th>
                <th>Nama Produk</th>
                <th>Nomer Penjualan</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style="cursor: pointer;"
                :class="{'table-info': b === reportSaleItem}"
                v-for="b in propReportSaleItems"
                :key="b.id"
                @click="reportRetrieve(b)"
              >
                <td>{{ b.product_code }}</td>
                <td>
                  {{ b.product_name }} <br v-if="b.product_root" />
                  <small v-if="b.product_root" class="text-muted">
                    {{ b.product_root }}, stok saat ini {{ b.current_stock }} item
                  </small>
                </td>
                <td>{{ b.sale_number }}</td>
                <td>{{ b.quantity }}</td>
                <td>{{ b.price }}</td>
                <td>{{ b.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <KatelyPagination :propPagination="propPagination" @paginate="paginate" />
      </div>
      <div class="card" v-if="propReportSaleItems.length <= 0">
        <div class="card-body">
          Tidak ada data yang ditampilkan!
          <a @click="reload" href="javascript:void(1)">Muat ulang</a>
        </div>
      </div>
    </div>
    <!-- ./List -->
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'
import MixinHttp from '@/mixins/MixinHttp'
import BrandList from '@/components/brands/BrandList'
import CustomerList from '@/components/customers/CustomerList'

export default {
  name: 'ReportSaleItemList',
  components: {
    KatelyPagination,
    KatelySearch,
    BrandList,
    CustomerList
  },
  mixins: [
    MixinHttp
  ],
  props: {
    propReportSaleItems: Array,
    propPagination: Object
  },
  data () {
    return {
      reportSaleItem: undefined,
      brand: undefined,
      brands: undefined,
      paginationBrand: {
        count: 0,
        next: undefined,
        previous: undefined
      },
      customer: undefined,
      customers: [],
      paginationCustomer: {
        count: 0,
        next: undefined,
        previous: undefined
      },
      from_date: '',
      to_date: '',
      query: {
        brand: '',
        customer: '',
        from_date: '',
        to_date: '',
        page: ''
      }
    }
  },
  methods: {
    brandRetrieve (value) {
      this.brand = value
    },
    brandList () {
      this.list('brands')
        .then((response) => {
          this.brands = response.data.results
          this.paginationBrand.next = response.data.next
          this.paginationBrand.previous = response.data.previous
          this.paginationBrand.count = response.data.count
        })
    },
    brandListSearch (query) {
      this.list('brands', query)
        .then((response) => {
          this.brands = response.data.results
          this.paginationBrand.next = response.data.next
          this.paginationBrand.previous = response.data.previous
          this.paginationBrand.count = response.data.count
        })
    },
    customerRetrieve (value) {
      this.customer = value
    },
    customerList () {
      this.list('customers')
        .then((response) => {
          this.customers = response.data.results
          this.paginationCustomer.next = response.data.next
          this.paginationCustomer.previous = response.data.previous
          this.paginationCustomer.count = response.data.count
        })
    },
    customerListSearch (query) {
      this.list('customers', query)
        .then((response) => {
          this.custmers = response.data.results
          this.paginationCustomer.next = response.data.next
          this.paginationCustomer.previous = response.data.previous
          this.paginationCustomer.count = response.data.count
        })
    },
    reportSaleItemRetrieve (value) {
      this.reportSaleItem = value
      this.$emit('reportSaleItemRetrieve', value)
    },
    reportSaleItemListSearch (query) {
      this.query.page = undefined
      this.query.brand = undefined
      this.query.customer = undefined
      this.query.from_date = undefined
      this.query.to_date = undefined
      this.$emit('reportSaleItemListSearch', this.query)
    },
    paginate (page) {
      this.query.page = page
      this.$emit('reportSaleItemListSearch', this.query)
    },
    filter () {
      if (this.brand) {
        this.query.brand = this.brand.id
      }
      if (this.customer) {
        this.query.customer = this.customer.id
      }
      this.query.from_date = this.from_date
      this.query.to_date = this.to_date
      this.$emit('reportSaleItemListSearch', this.query)
    },
    reload () {
      this.query.page = undefined
      this.query.brand = undefined
      this.query.customer = undefined
      this.query.from_date = undefined
      this.query.to_date = undefined
      this.reportSaleItemListSearch()
    }
  },
  mounted () {
    this.brandList()
    this.customerList()
  },
  computed: {
    isActive () {
      return this.from_date && this.to_date
    }
  }
}
</script>
