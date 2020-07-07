<template>
	<div id="home" class="wrapper">
		<nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
			<tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"
			 ref="tabControl1" v-show="isTabFixed" ></tab-control>
		<scroll class="content" 
		ref="scroll" 
		:probe-type="3"
		@scroll="contentScroll"
		 :pull-up-load ="true"
		 @pullingUp="loadMore"
		 >
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick"
			 ref="tabControl2"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
			
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	
	</div>
	
</template>

<script>
	//子组件导入
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
    import GoodsListItem from 'components/content/goods/GoodsListItem.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	
	
	//公共组件导入
	import NavBar from 'components/common/navbar/NavBar.vue'
	import TabControl from 'components/content/tabControl/TabControl.vue'
    import Scroll from 'components/common/scroll/Scroll'
	
	import{getHomeMulitidata,getHomeGoods} from 'network/home.js'
	
	export default{
		name:"Home",
		components:{
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			GoodsListItem,
			Scroll,
			BackTop
		},
		data(){
			return{
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0, list:[]},
					'new':{page:0, list:[]},
					'sell':{page:0, list:[]},
				},
				currentType:'pop',
				isShowBackTop:false,
				tabOffsetTop:0,
				isTabFixed:false,
				saveY:0
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		created(){
			this.getHomeMulitidata()
			this.getHomeGoods('pop')      
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
		},
		activated() {			  
			this.$refs.scroll.scrollTo(0,this.saveY,300)
			this.$refs.scroll.refresh()
 		 },
 		 deactivated() {
		  this.saveY= this.$refs.scroll.getScrollY()
  		},
		mounted(){
			const refresh= this.debounce(this.$refs.scroll.refresh)
			this.$bus.$on('itemImageLoad',()=>{
				refresh()
			})
			
		},
		methods:{
			
			//防抖函数
			debounce(func,delay){
				let timer=null
				return function(...args){
					if(timer) clearTimeout(timer)
					timer=setTimeout(()=>{
						func.apply(this,args)
					},delay)
				}						
			},			
			//时间监听及相关
			tabClick(index){ 
				switch(index){
					case 0 :
					this.currentType ='pop'
					break
					case 1 :
					this.currentType ='new'
					break
					case 2 :
					this.currentType ='sell'
					break
				}
				this.$refs.tabControl1.currentIndex=index;
				this.$refs.tabControl2.currentIndex=index;
			},
			
			//网络请求相关
			getHomeMulitidata(){
				getHomeMulitidata().then(res=>{
					this.banners=res.data.banner.list;
					this.recommends=res.data.recommend.list;
				})
			},
			getHomeGoods(type){ 
				const page= this.goods[type].page+1;
				 getHomeGoods(type,page).then(res=>{
					// console.log(res);
					 this.goods[type].list.push(...res.data.list)
					 this.goods[type].page+=1
					 
					 this.$refs.scroll.finishPullUp()
				 })
			},
			backClick(){
				this.$refs.scroll.scrollTo(0,0)
			},
			contentScroll(position){
				if((-position.y)>1000){this.isShowBackTop=true}
				this.isTabFixed=(-position.y)>this.tabOffsetTop
			},
			loadMore(){
				this.getHomeGoods(this.currentType)				
			},
			swiperImageLoad(){
				this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
			},
			// contentScroll(position){
			// 	this.isShowBackTop=(-position.y)>1000 
				
			// }
			
		}
	}
</script>

<style scoped>
	#home{
		position: relative;
		/* padding-top: 44px; */
		height: 100vh;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		/* position:fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	/* 固定滚动导航 */
	.tab-control{
		position: relative;
		z-index: 9;
	} 
	/* .content{
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	} */
	.content{
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		overflow: hidden;
		position: absolute;
	}
</style>
