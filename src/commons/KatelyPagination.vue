<template>
  <!-- Pagination -->
  <nav v-if="propPagination" aria-label="..." class="mt-2 no-print">
    <ul class="pagination">
      <li v-if="propPagination.previous" class="page-item">
        <a
          @click="paginate(propPagination.previous)"
          class="page-link"
          href="javascript:void(0)"
          tabindex="-1"
        >
          Previous
        </a>
      </li>
      <li v-if="!propPagination.previous" class="page-item disabled">
        <a
          class="page-link"
          href="javascript:void(0)"
          tabindex="-1"
          aria-disabled="true"
        >
          Previous
        </a>
      </li>
      <li v-if="propPagination.next" class="page-item">
        <a
          @click="paginate(propPagination.next)"
          class="page-link"
          href="javascript:void(0)"
          tabindex="-1"
        >
          Next
        </a>
      </li>
      <li v-if="!propPagination.next" class="page-item disabled">
        <a
          class="page-link"
          href="javascript:void(0)"
          tabindex="-1"
          aria-disabled="true"
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'KatelyPagination',
  props: {
    propPagination: Object
  },
  methods: {
    paginate (page) {
      let parsedUrl = new URL(page)
      const pageNumber = parsedUrl.searchParams.get('page')
      this.$emit('paginate', pageNumber)
    }
  }
}
</script>

<style>

</style>
