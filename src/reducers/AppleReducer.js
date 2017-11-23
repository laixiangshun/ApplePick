/**
 * Created by lailai on 2017/11/23.
 * reducer： 使用immutable.js处理不变数据
 */
import Immutable from 'immutable';
import action from '../actions/appleAction.js';
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
export default (state=InitState,action=action)=>{
    let newState;
    switch (action.type){
        case "apple/BEGIN_PICK_APPLE":
            //newState=Object.assign({},state,{
            //    isPicking: true
            //});
            //return newState;
            return Immutable.fromJS(state).set('isPicking',true).toJS();
        case "apple/DONE_PICK_APPLE":
            //newState=Object.assign({},state,{
            //    apples: [
            //        ...state.apples,
            //        {
            //            id: state.newAppleId,
            //            weight: action.payload,
            //            isEaten: false
            //        }
            //    ],
            //    newAppleId: state.newAppleId+1,
            //    isPicking: false
            //});
            //return newState;
            let newApple={
                id: state.newAppleId,
                weight: action.payload,
                isEaten: false
            };
            return Immutable.fromJS(state).update('apples',list=>list.push(newApple))
                .set('newAppleId',state.newAppleId+1)
                .set('isPicking',false)
                .toJS();
        case "apple/FAIL_PICK_APPLE":
            //newState=Object.assign({},state,{
            //    isPicking: false
            //});
            //return newState;
            return Immutable.fromJS(state).set('isPicking',false).toJS();
        case "apple/EAT_APPLE":
            //newState=Object.assign({},state,{
            //    apples: [
            //        ...state.apples.slice(0,action.payload),
            //        Object.assign({},state.apples[action.payload],{
            //            isEaten: true
            //        }),
            //        ...state.apples.slice(action.payload+1)
            //    ]
            //});
            //return newState;
            return Immutable.fromJS(state).setIn(['apples',action.payload,'isEaten'],true).toJS();
        default:
            return state;
    }
}