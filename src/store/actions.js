export default{
    addCart(context,payload){           
        return new Promise((resolve,reject) =>{
            let OldProduct=context.state.cartList.find(item=>item.iid === payload.iid)
        if(OldProduct){
            context.commit('addCounter',OldProduct)
            resolve('已经添加到购物车啦！')
        }else{
           context.commit('addToCat',payload)
           resolve('添加成功！')
        }
        })
        
    }
}