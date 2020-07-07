 export default{
//mutations中的方法完成的事情尽量单一
addCounter(state,payload){
    payload.count+=1
},
addToCat(state,payload){
     payload.count=1
    payload.checked= false
    state.cartList.push(payload)
}
 }
 