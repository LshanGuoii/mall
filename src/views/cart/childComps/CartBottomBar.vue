<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="checkd" :is-checked="isSelectAll"  @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计:{{totolPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            结算：({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from './CheckButton'
    import {mapGetters} from 'vuex'
export default {
   name:"CartBottomBar",
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        totolPrice(){ 
            return '￥'+ this.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue+ item.newPrice * item.count
            },0)
        },
        checkLength(){
            return this.cartList.filter(item=>item.checked).length 
        },
        isSelectAll(){
            if(this.cartList.length ===0) return false
            return !this.cartList.find(item=>!item.checked)
        }
    },
    methods: {
        checkClick(){
            if(this.isSelectAll){
                this.cartList.forEach(item=>item.checked=false) 
            } else{
                this.cartList.forEach(item=>item.checked=true) 
            }
            
           
        },
        calcClick(){
            if(!this.isSelectAll){
                this.$toast.show('请选择购买的商品',2000)
            }
        }
    },
    mounted () {}
}
</script>

<style scoped>
    .bottom-bar{
        height: 40px;
        background-color: #eee;
        position: fixed;
        width: 100%;
        right: 0;
        bottom: 49px;
         left: 0;
        /* top:435px;    */
        line-height: 40px;
        display: flex;
        font-size: 14px;
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .checkd{
        width:20px;
        height: 20px;
        line-height: 20px;
    }
    .price{
        margin-left: 30px;
         

    }
    .calculate{
        width: 80px;
        margin-left: auto; 
        background-color: orangered;
        text-align: center;
     
    }
</style>
