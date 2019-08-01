<template>
  <div id="app">
    <router-view/>
    <div class="container" id="print-only">
      <div class="card bg-light col-md-12">
        Kately is Free Software and distributed under the terms of the
        <a href="https://github.com/destodasoftware/kately_api/blob/master/LICENSE">MIT License</a>. <br>
        <small>Copyright © 2019 The Destoda Software.</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#print-only {
  display: none !important;
}
@media print {
  #print-only {
    display: block !important;
    margin-top: 40px;
    background: paleturquoise;
  }
  .no-print, .no-print * {
    display: none !important;
    font-weight: bold;
  };
  table {
    border: dotted 1px gray !important;
  }
  .card {
    border: dotted 1px #000 !important;
    padding: 1px !important;
    font-family: 'Courier New', Courier, monospace !important;
  }
  #app {
    margin: 0;
    color: #000;
    background-color: #fff;
  };
}
</style>
