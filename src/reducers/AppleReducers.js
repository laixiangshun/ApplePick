/**
 * Created by lailai on 2017/11/23.
 * reducer: 用浅复制实现数据不变性的原理
 * reducer有这样的重要约束：在reducer里，不可以修改原来的state，需要保持使每个版本的state不变。
 * Obejct.assign() 方法，该方法用于产生新的对象
 * 延展操作符 Spread operator : ...
 *
 * 原始的reducer写法：
 */
const InitState={
    isPacking: false,
    newAppleId: 1,
    apples: [
        {
            id: 0,
            weight: 235,
            isEaten: false
        }
    ]
};
export default (state=InitState,action='')=>{
    let newState;
    switch (action.type){
        case "apple/BEGIN_PICK_APPLE":
            newState=Object.assign({},state,{
                isPicking: true
            });
            return newState;
        case "apple/DONE_PICK_APPLE":
            newState=Object.assign({},state,{
                apples: [
                    ...state.apples,
                    {
                        id: state.newAppleId,
                        weight: action.payload,
                        isEaten: false
                    }
                ],
                newAppleId: state.newAppleId+1,
                isPicking: false
            });
            return newState;
        case "apple/FAIL_PICK_APPLE":
            newState=Object.assign({},state,{
                isPicking: false
            });
            return newState;
        case "apple/EAT_APPLE":
            newState=Object.assign({},state,{
                apples: [
                    ...state.apples.slice(0,action.payload),
                    Object.assign({},state.apples[action.payload],{
                        isEaten: true
                    }),
                    ...state.apples.slice(action.payload+1)
                ]
            });
            return newState;
        default:
            return state;
    }
}