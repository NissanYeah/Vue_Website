<template>
    <div>
<!-- pagination -->
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{'disabled':!pagination.has_pre}">
      <a class="page-link" @click.prevent="getproduct(pagination.current_page-1)" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li  class="page-item" v-for="page in pagination.total_pages" :class="{'disabled':page===pagination.current_page}" :key="page" >
      <a class="page-link" @click.prevent="getproduct(page)"   href="#">{{page}}</a></li>
    <li class="page-item" :class="{'disabled':!pagination.has_next}">
      <a class="page-link" @click.prevent="getproduct(pagination.current_page+1)" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>

    </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    pageData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    changePage(page) {
      this.$emit("changepage", page);
      //console.log(page);
    }
  }
};
</script>