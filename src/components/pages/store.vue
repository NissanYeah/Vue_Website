<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" @click.prevent="getProduct(item.id)" class="btn btn-outline-secondary btn-sm">
              <i v-if="status.loadingItem===item.id" class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click.prevent="addCart(item.id,1)">
              <i v-if="status.loadingItem===item.id" class="fas fa-spinner fa-spin" ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 單一商品 -->
     <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" >{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{product.content}}</p>
              <footer class="blockquote-footer text-right"></footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price" >{{product.origin_price}}元</div>
              <del class="h6" v-if="product.price">原價 {{product.origin_price}}  元</del>
              <div class="h4" v-if="product.price">現在只要 {{product.price}}  元</div>
            </div>
            <select name="" class="form-control mt-3"  v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num" >
                  選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong> {{product.num * product.price}} </strong> 元
            </div>
            <button type="button" class="btn btn-primary" @click.prevent="addCart(product.id,product.num)"
              >
              <i class="fas fa-spinner fa-spin" v-if="status.cart_loadingItem" ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- mycart -->

   <table class="table">
    <thead>
    <th></th>
    <th>品名</th>
    <th>數量</th>
    <th>單價</th>
  </thead>
  <tbody>
    <tr v-for="item in cart.carts" :key="item.id">
      <td class="align-middle">
        <button type="button" class="btn btn-outline-danger btn-sm" @click="removeItem(item.id)">
          <i class="far fa-trash-alt"></i>
        </button>
      </td>
      <td class="align-middle">
        {{ item.product.title }}
        <div class="text-success" v-if="item.coupon">
          已套用優惠券
        </div>
      </td>
      <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
      <td class="align-middle text-right">{{ item.final_total }}</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3" class="text-right">總計</td>
      <td class="text-right">{{ cart.total }}</td>
    </tr>
    <tr>
      <td colspan="3" class="text-right text-success">折扣價</td>
      <td class="text-right text-success">{{ cart.final_total }}</td>
    </tr>
  </tfoot>
</table>
<div class="input-group mb-3 input-group-sm">
  <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
      套用優惠碼
    </button>
  </div>
</div>
<!--表單-->
<div class="my-5 row justify-content-center">
  <form class="form-group" @submit.prevent="createOrder">
    <div>
       <label for="useremail">Email</label>
        <input v-validate="'required|email'" name="email" type="text" class="form-control"     :class="{'is-invalid': errors.has('email')}" v-model="form.user.email" placeholder="請輸入 Email" required>
        <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
   
    </div>

  
    <div class="form-group">
      <label for="username">收件人姓名</label>
      <input v-validate="'alpha'" type="text" name="username" class="form-control"  :class="{'is-invalid': errors.has('username')}" v-model="form.user.name" placeholder="輸入姓名">       
      <span class="text-danger">{{ errors.first('username') }}</span>
    </div>
  
    <div class="form-group">
      <label for="usertel">收件人電話</label>
      
      <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
    </div>
  
    <div class="form-group">
      <label for="useraddress">收件人地址</label>
      <input type="address" class="form-control"  :class="{'is-invalid': errors.has('address')}" name="address" id="useraddress" v-model="form.user.address"
        placeholder="請輸入地址">
      <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
    </div>
  
    <div class="form-group">
      <label for="useraddress">留言</label>
      <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-danger" >送出訂單</button>
    </div>
  </form>
</div>

</div> 


</template>
 <script>
import { ValidationProvider } from "vee-validate";

import $ from "jquery";
export default {
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingItem: "",
        cart_loadingItem: false
      },
      cart: {},
      coupon_code: "",
      form: { user: { name: "", email: "", tel: "", address: "" }, message: "" }
      //購物車的商品
    };
  },
  components: {
    ValidationProvider
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      vm.status.loadingItem = id;
      $("#productModal").modal("show");
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.product = response.data.product;
        vm.isLoading = false;
        vm.status.loadingItem = "";
      });
    },
    addCart(product_id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.status.cart_loadingItem = true;
      const cart = {
        product_id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        vm.isLoading = false;
        vm.status.cart_loadingItem = false;
        $("#productModal").modal("hide");
        vm.getCart();
      });
    },
    getCart() {
      // 取得購物車商品放到清單
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(url).then(response => {
        vm.cart = response.data.data;
      });
    },
    removeItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then(response => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      // vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        vm.getCart();
        // vm.isLoading = false;
        console.log("成功增加優惠卷");
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(url, { data: order }).then(response => {
            console.log("訂單已建立", response);
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>