import request from '@/utils/request.js'

export  function dish_count(){
    return  request.get("/admin/dish_count")
}

export  function dish(limit,current){
    return  request.get("/admin/dish?limit="+limit+"&current="+current)
}