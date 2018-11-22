<template>
<div>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
           

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>後台</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
             
                
                 <router-link to="/admin/product"  class="nav-link">  <i class="fas fa-boxes"></i>
                 <span data-feather="file-text">產品頁面 </span></router-link>
              </li>
            </ul>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fas fa-ticket-alt"></i>
                  <span data-feather="file-text"></span>
                 優惠卷
                </a>
              </li>
            </ul>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fas fa-list-ol"></i>
                  <span data-feather="file-text"></span>
                 訂單列表
                </a>
              </li>
            </ul>
            <!--  -->
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>前台</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                 <router-link to="/store"  class="nav-link">   <i class="fas fa-shopping-cart"></i>
                  <span data-feather="file-text"></span>
                 購物頁面</i></router-link>
              </li>
            </ul>



          </div>
        </nav>
</div>

</template>