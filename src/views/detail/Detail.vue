<template>
 <div class="detail">
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
   <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3"> 
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop" ></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo"  ref="comment"></detail-comment-info>
    <goods-list :goods ="recommends" ref="recommend"></goods-list >
   </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
 </div>
</template>

<script> 
   import DetailNavBar from './childComps/DetailNavBar'
   import DetailSwiper from './childComps/DetailSwiper'
   import DetailBaseInfo from './childComps/DetailBaseInfo'
   import DetailShopInfo from './childComps/DetailShopInfo'
   import DetailGoodsInfo from './childComps/DetailGoodsInfo'
   import DetailParamInfo from './childComps/DetailParamInfo'
   import DetailCommentInfo from './childComps/DetailCommentInfo'
   import DetailBottomBar from './childComps/DetailBottomBar'
   import BackTop from 'components/content/backTop/BackTop.vue'
  // import DetailRecommendInfo from './childComps/DetailRecommendInfo'

   import Scroll from 'components/common/scroll/Scroll'
   import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

  export default {
    name: "Detail",
    components: {
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       DetailGoodsInfo,
       DetailParamInfo,
       DetailCommentInfo,
       Scroll,
       GoodsList,
       DetailBottomBar,
       BackTop
       
    },
    data() {
      return {
       iid:null,
       topImages:[],
       goods:{},
       shop:{},
       detailInfo:{},
       paramInfo:{},
       commentInfo:{},
       recommends:[],
       themeToYs:[],
       getThemeTopy:null,
       currentIndex:0,
       isShowBackTop:false
      }
    },
    created() {
      //保存传入的iid
     this.iid=this.$route.params.iid
    
     //根据传入的iid请求详细数据
     getDetail(this.iid).then(res=>{
        //获取顶部轮播图
        const data=res.result;
        this.topImages=data.itemInfo.topImages;
        console.log(res)
      //获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //店铺信息
        this.shop=new Shop(data.shopInfo)

        this.detailInfo=data.detailInfo
          //参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //评论信息
          if(data.rate.cRate!==0){
            this.commentInfo=data.rate.list[0]
          }
        
     })
    //  getRecommend().then(res=>{
    //     console.log(res)
    //  })

      this.getRecommend()

     this.getThemeTopy = this.debounce(()=>{
          this.themeToYs=[],
          this.themeToYs.push(0);
          this.themeToYs.push(this.$refs.param.$el.offsetTop)
           this.themeToYs.push(this.$refs.comment.$el.offsetTop)
            this.themeToYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeToYs.push(Number.MAX_VALUE)
          //  console.log(this.themeToYs)

        },100)
    
    },
    methods: {

      
        
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopy()
      },
      titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeToYs[index],200)
      },
      debounce(func,delay){
				let timer=null
				return function(...args){
					if(timer) clearTimeout(timer)
					timer=setTimeout(()=>{
						func.apply(this,args)
					},delay)
				}						
      },
      getRecommend(){
        getRecommend().then(res => {    
          this.recommends = res.data.list
        })
      },
      contentScroll(position){
	      if((-position.y)>1000){this.isShowBackTop=true}
			

        const positionY= -position.y
         let length = this.themeToYs.length;
        for (let i = 0; i < length; i++) {
           let iPos = this.themeToYs[i];
              if (this.currentIndex !== i&&(positionY >= iPos && positionY < this.themeToYs[i+1])) {
                this.currentIndex = i;
                this.$refs.nav.currentIndex=this.currentIndex
          }
        }
      },
      backClick(){
				this.$refs.scroll.scrollTo(0,0)
      },
      addToCart(){
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.realPrice;
        // 3.添加到Store中
        this.$store.dispatch('addCart', obj).then(res=>{
           
            this.$toast.show(res,1000)
        })
      
      }
      }   
    }
  
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px); 
  }
  
</style>
