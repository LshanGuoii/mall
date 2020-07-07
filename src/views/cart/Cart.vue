<template>
<div class="cart">
	<nav-bar class="nav-bar">
		<div slot="center">购物车({{length}})</div>
	</nav-bar>
	<cart-list ></cart-list>
	<cart-bottom-bar></cart-bottom-bar>
</div>
	
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import { mapGetters } from 'vuex'
	import CartList from './childComps/CartList'
 	 import CartBottomBar from './childComps/CartBottomBar'
	export default{
		name:"Cart",
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			...mapGetters({
				length:'cartLength', 
				list:'cartList'
			})
		}
	}
</script>

<style  scoped>
	
	.nav-bar{
		background-color:var(--color-tint);
    	font-weight: 700;
    	color: #fff;
	}
	 /* .cart-list {

    top: 44px;
    bottom: 89px;
    width: 100%;
	position: absolute;
	
  }   */
  
</style>>

