<template>
  <div class="card">
    <div class="card-body" v-if="propSaleReports.length > 0">
      <h5 class="card-title">Daftar Laporan Penjualan</h5>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Nomer Penjualan</th>
            <th>Pembayaran</th>
            <th>Pelanggan</th>
            <th>Item Pembelian</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="b in propSaleReports"
            :key="b.id"
            @click="saleReportRetrieve(b)"
          >
            <td>
              {{ b.sale_number }} <br>
              <small class="text-muted">{{ b.sale_date }} / {{ b.brand_name }}</small>
            </td>
            <td>
              <div v-if="b.payment">
                <span v-if="b.payment.is_paid">Paid</span>
                <span v-if="!b.payment.is_paid">Unpaid</span>
              </div>
              <div v-if="!b.payment">No Payment</div>
            </td>
            <td>
              <span v-if="b.customer">
                {{ b.customer.name }}
              </span>
              <span v-if="!b.customer">
                -
              </span>
            </td>
            <td>
              <table v-if="b.saleitem_set.length > 0" class="table table-sm table-borderless">
                <thead>
                  <tr class="text-muted bg-light">
                    <th>Nama Item</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                    <th>Diskon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in b.saleitem_set" :key="item.id">
                    <td>{{ item.product_name }}</td>
                    <td>Rp. {{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>Rp. {{ item.total }}</td>
                    <td>
                      <span v-if="!item.is_percent">Rp. </span>
                      {{ item.discount }}
                      <span v-if="item.is_percent">%</span>
                    </td>
                  </tr>
                  <tr v-if="b.shipping" class="bg-light">
                    <td colspan="3"></td>
                    <th>Delivery Cost</th>
                    <td>Rp. {{ b.shipping.cost }}</td>
                  </tr>
                  <tr class="bg-light">
                    <td colspan="3"></td>
                    <th>Grand Total</th>
                    <td>Rp. {{ b.total }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div class="card" v-if="propSaleReports.length <= 0">
      <div class="card-body">
        Tidak ada data yang ditampilkan! <a @click="reload" href="javascript:void(1)">Muat ulang</a>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'

/* eslint-disable */
export default {
  name: 'SaleReport',
  components: {
    KatelyPagination
  },
  props: {
    propSaleReports: Array,
    propPagination: Object
  },
  data () {
    return {
      saleReport: undefined,
      query: {
        page: ''
      }
    }
  },
  methods: {
    saleReportRetrieve (value) {
      this.saleReport = value
      this.$emit('saleReportRetrieve', value)
    },
    saleReportListSearch (query) {
      this.query.page = undefined
      this.$emit('saleReportListSearch', this.query)
    },
    reload () {
      this.query.page = ''
      this.saleReportListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('saleReportListSearch', this.query)
    }
  }
}
</script>
