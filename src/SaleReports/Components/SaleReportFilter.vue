<template>
<div>
  <div class="row mb-2">
    <div class="col-md-4">
      <div class="form-group">
        <label>Dari Tanggal</label>
        <input v-model="query.start_date" type="date" class="form-control bg-light" />
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label>Sampai Tanggal</label>
        <input v-model="query.end_date" type="date" class="form-control bg-light" />
      </div>
    </div>
    <div class="col-md-4">
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
  </div>
  <div class="row mb-2">
    <div class="col-md-12">
      <div class="form-group">
        <button @click="onFilter" class="btn btn-primary">Filter Laporan</button>
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MixinHttp from '@/mixins/MixinHttp'

import BrandService from '@/Brands/BrandService'

export default {
  name: 'SaleReportFilter',
  mixins: [
    BrandService,
    MixinHttp
  ],
  data () {
    return {
      query: {
        start_date: '',
        end_date: '',
        brand: '',
        is_paid: false,
        page: ''
      }
    }
  },
  methods: {
    onFilter () {
      this.$emit('onFilter', this.query)
    }
  }
}
</script>
