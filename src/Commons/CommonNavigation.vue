<template>
  <div class="">
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <b-navbar-brand class="text-white" :to="{name: 'DashboardMainManager'}">
        <common-interceptor />
          Kately
          <span class="badge badge-pill badge-light text-primary">
            Sistem Ritel
          </span>
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto" >
        <b-nav-item :to="{name: 'AboutMainManager'}" right>Copyright & Credits</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import CommonInterceptor from '@/Commons/CommonInterceptor'

export default {
  components: {
    'common-interceptor': CommonInterceptor
  }
}
</script>

<style>

</style>
