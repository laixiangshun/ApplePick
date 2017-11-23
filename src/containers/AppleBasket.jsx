import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './appleBasket.less';
import AppleItem from '../components/AppleItem.jsx';
import actions from '../actions/appleAction.js';


class AppleBusket extends React.Component{
    getStatus(state){
        let stats={
            appleNow:{
                quanlity: 0,
                weight: 0
            },
            appleEaten: {
                quanlity: 0,
                weight: 0
            }
        };
        state.apples.map(index=>{
            let selector=index.isEaten ? 'appleEaten' : 'appleNow';
            stats[selector].quanlity++;
            stats[selector].weight+=index.weight;
        });
        return stats;
    }
    render(){
        let {state,actions}=this.props;
        let stats=this.getStatus(state);
        return(
            <div className="appleBusket">
                <div className="title">苹果篮子</div>
                <div className="stats">
                    <div className="section">
                        <div className="head">当前</div>
                        <div className="content">
                            {stats.appleNow.quanlity}个苹果,
                            {stats.appleNow.weight}克
                        </div>
                    </div>
                    <div className="section">
                        <div className="head">已吃掉</div>
                        <div className="content">
                            {stats.appleEaten.quanlity}个苹果，
                            {stats.appleEaten.weight}克
                        </div>
                    </div>
                </div>
                <div className="appleList">
                    {state.apples.map(apple=>
                        <AppleItem state={apple} actions={{eatApple: actions.eatApple}} key={apple.id}/>)
                    }
                    <div className="empty-tip" style={{display: stats.appleNow.quanlity==0?"":"none"}}>苹果篮子空空如也</div>
                    <div className="empty-tip" style={{display: state.ispacking?"":"none"}}>正在摘苹果，请耐心等待</div>
                </div>
                <div className="btn-div">
                    <button onClick={actions.pickApple}>摘苹果</button>
                </div>
            </div>
        )
    }
}
function select(state){
    return{
        state: state
    }
}
function buildActionDispatcher(dispatch){
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}
export default connect(select,buildActionDispatcher)(AppleBusket);