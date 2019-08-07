<template>
  <div class="card">
    <div class="card-body" v-if="propVariants.length > 0">
      <h5 class="card-title">Daftar Variasi Produk</h5>
      <!-- Search -->
      <KatelySearch :propPlaceholder="'Cari Varian'" @search="variantListSearch" />
      <table class="table table-responsive">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Ukuran</th>
            <th>Warna</th>
            <th>Stok</th>
            <th>Stok Minimum</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="cursor: pointer;"
            :class="{'table-info': obj === variant}"
            v-for="obj in propVariants"
            :key="obj.id"
            @click="variantRetrieve(obj)"
          >
            <td>
              {{ obj.name }} <br>
              <small class="text-muted">{{ obj.sku }}</small>
            </td>
            <td>{{ obj.size }}</td>
            <td>{{ obj.color }}</td>
            <td>{{ obj.stock }}</td>
            <td>{{ obj.minimum_stock }}</td>
            <td>{{ obj.price }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <KatelyPagination
        :propPagination="propPagination"
        @paginate="paginate"
      />
    </div>
    <div class="card" v-if="propVariants.length <= 0">
      <div class="card-body">
        Tidak ada data yang ditampilkan! <a @click="reload" href="javascript:void(1)">Muat ulang</a>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyPagination from '@/commons/KatelyPagination'
import KatelySearch from '@/commons/KatelySearch'

/* eslint-disable */
export default {
  name: 'VariantList',
  components: {
    KatelyPagination,
    KatelySearch
  },
  props: {
    propVariants: Array,
    propPagination: Object
  },
  data () {
    return {
      variant: undefined,
      query: {
        name: '',
        page: ''
      }
    }
  },
  methods: {
    variantRetrieve (value) {
      this.variant = value
      this.$emit('variantRetrieve', value)
    },
    variantListSearch (query) {
      this.query.page = undefined
      this.query.name = query
      this.$emit('variantListSearch', this.query)
    },
    reload () {
      this.query.name = ''
      this.query.page = ''
      this.variantListSearch()
    },
    paginate (page) {
      this.query.page = page
      this.$emit('variantListSearch', this.query)
    }
  }
}
</script>
