import request from '@/utils/request.js'

export  function ulogin(id,password){
    return  request.get("/user/ulogin?id="+id+"&password="+password)
}

export  function register(name,password){
    return  request.get("/user/register?name="+name+"&password="+password)
}

export  function getCategory(){
    return  request.get("/user/getCategory")
}

export  function getDish(){
    return  request.get("/user/getDish")
}

export  function addCart(id,name,price){
    return  request.get("/user/addCart?id="+id+"&name="+name+"&price="+price)
}

export  function getCart(){
    return  request.get("/user/getCart")
}


export  function sub_item(id){
    return  request.get("/user/sub_item?dish_id="+id)
}
export  function add_item(id){
    return  request.get("/user/add_item?dish_id="+id)
}
export  function remove_item(id){
    return  request.get("/user/remove_item?dish_id="+id)
}


export  function pay(datas){
    return  request.post("/user/pay",datas)
}
