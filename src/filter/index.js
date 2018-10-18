let nmFilter=num=>{
    let nums=num.toString().split(".")[0]
    if(nums.length < 6){
        return nums
    }else{
        return nums.slice(0,-4)+"万"
    }
}
let dtTime=(time)=>{
    let date =new Date(time);
    let m,s;
    m=date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    s=date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return m+":"+s;
}
let updateTimefil=(time)=>{
    let date= new Date(time);
    let m ,d;
    m=date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1;
    d=date.getDate();
    return m+"月"+d+"日"
}
export { nmFilter, dtTime, updateTimefil }