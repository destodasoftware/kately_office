<template>
  <div class="card border-light">
    <div
      class="card-body"
      v-if="propShippings.length > 0"
    >
      <KatelySearch
        :propPlaceholder="'Cari pengiriman'"
        @search="shippingListSearch"
      />
      <table class="table table-borderless">
        <thead>
          <tr>
            <th>Regional</th>
            <th>Propinsi</th>
            <th>Kota</th>
            <th>Postal Code</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ship in propShippings"
            :key="ship.id"
            style="cursor: pointer"
            :class="{'table-info': ship === shipping}"
            @click="shippingRetrieve(ship)"
          >
            <td>{{ ship.id }}</td>
            <td>{{ ship.country }}</td>
            <td>{{ ship.province }}</td>
            <td>{{ ship.city }}</td>
            <td>{{ ship.postal_code }}</td>
          </tr>
        </tbody>
      </table>
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div
      class="card"
      v-if="propShippings.length <= 0"
    >
      <div class="card-body">
        Tidak ada data yang ditampilkan
        <a
          @click="reload"
          href="javascript:void(0)"
        >
          Muat Ulang
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'

export default {
  name: 'ShippingList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propShippings: Array,
    propPagination: Object
  },
  data () {
    return {
      shipping: undefined,
      query: {
        country: '',
        city: '',
        page: ''
      }
    }
  },
  methods: {
    shippingRetrieve (value) {
      this.shipping = value
      this.$emit('shippingRetrieve', value)
    },
    shippingListSearch (query) {
      this.query.page = undefined
      this.query.country = query
      this.$emit('shippingListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.shippingListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('shippingListSearch', this.query)
    }
  }
}
</script>

<style>

</style>
