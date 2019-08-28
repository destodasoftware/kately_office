<template>
  <div>
    <common-navigation />
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-2">
          <common-menu/>
        </div>
        <div class="col-md-10">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavigation from '@/Commons/CommonNavigation'
import CommonMenu from '@/Commons/CommonMenu'
export default {
  name: 'CommonLayout',
  components: {
    'common-navigation': CommonNavigation,
    'common-menu': CommonMenu
  }
}
</script>
