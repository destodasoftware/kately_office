<template>
  <common-layout>
    <common-header>
      <font-awesome-icon icon="folder-open" /> Dashboard
    </common-header>
    <div class="row mb-4">
      <div class="col-md-12">
        <sale-chart />
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/Commons/CommonLayout'
import CommonHeader from '@/Commons/CommonHeader'
import MixinHttp from '@/mixins/MixinHttp'

import SaleChart from '@/Sales/Components/SaleChart'

export default {
  name: 'DasboardMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-header': CommonHeader,
    'sale-chart': SaleChart
  },
  mixins: [
    MixinHttp
  ]
}
</script>

<style>

</style>
