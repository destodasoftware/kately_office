<template>
  <div>
    <common-navigation />
    <div class="container">
      <div class="row mt-3">
        <div class="col-md-12">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavigation from '@/Commons/CommonNavigation'

export default {
  name: 'CommonLayout',
  components: {
    'common-navigation': CommonNavigation
  }
}
</script>
