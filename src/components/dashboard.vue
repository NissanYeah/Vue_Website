<template>
 <div>
   
 <navbar/>
<AlertMessage/>
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
import AlertMessage from "./AlertMessage";

export default {
  name: "dashboard",
  components: {
    navbar,
    sidebar,
    AlertMessage
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
