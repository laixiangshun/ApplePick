let actions={
    //注意这里是actionCreator,返回的是一个函数而不是对象,所以我们要引用中间件thunk
    //注意这里需要 () => ... , 不然 pickAppleAction 不是一个actionCreator, 而是一个thunk
    pickApple: ()=>(dispatch,getState)=>{
        if(getState().isPicking){
            return;
        }
        dispatch(actions.beginPickApple());
        let url = 'https://api.github.com/search/users?q=laixiangshun';
        fetch(url).then(res=>{//这里是模拟请求数据 本demo没有用到后台的数据
            //console.log(res);
            let weight=Math.floor(200+Math.random()*100);
            dispatch(actions.donePickApple(weight));
        }).catch(
                e=>{
                    dispatch(actions.failPickApple('摘苹果异常'))
                }
        )
    },
    beginPickApple: ()=>({
        type: 'apple/BEGIN_PICK_APPLE'
    }),
    donePickApple: appleWeight=>({
        type: "apple/DONE_PICK_APPLE",
        payload: appleWeight
    }),
    failPickApple: errMag=>({
        type: "apple/FAIL_PICK_APPLE",
        payload: new Error(errMag),
        error: true
    }),
    eatApple: appleId=>({
        type: "apple/EAT_APPLE",
        payload: appleId
    })
};
export default actions;