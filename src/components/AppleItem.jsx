import React from 'react';
import './appleItem.less';

class AppleItem extends React.Component{
    //在react组件里面，要开启条件更新这个生命周期函数 shouldComponentUpdate， 才会对把这个性能提高点释放出来
    shouldComponentUpdate(nextProps){
        return nextProps.state!=this.props.state;
    }
    render(){
        let {
             state,
             actions
            }=this.props;
        return(
            <div className="appleItem" style={{display: state.isEaten?"none":""}}>
                <div className="apple">
                    <img src="https://raw.githubusercontent.com/ckinmind/apple-basket-redux/master/src/images/apple.png" alt="" />
                </div>
                <div className="info">
                    <div className="name">红苹果{state.id}号</div>
                    <div className="weight">{state.weight}克</div>
                </div>
                <div className="btn-div">
                    <button onClick={()=>actions.eatApple(state.id)}>吃掉</button>
                </div>
            </div>
        )
    }
}
export default AppleItem;