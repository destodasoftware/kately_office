<template>
  <div>
    <KatelyNavigation />
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-12">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KatelyNavigation from '@/commons/KatelyNavigation'

export default {
  name: 'KatelyBaseLayout',
  components: {
    KatelyNavigation
  }
}
</script>

<style>

</style>
