<template>
 <div>
   
 <navbar/>

    <div class="container-fluid">
      <div class="row">
         <sidebar/>
         <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
       <router-view/>
       </main>
      </div>
    </div>
    
 
</div>

</template>

<script>
import navbar from "./navbar";
import sidebar from "./sidebar";

export default {
  name: "dashboard",
  components: {
    navbar,
    sidebar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
