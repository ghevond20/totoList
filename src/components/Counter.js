import React,{Component} from 'react';
import {Emitter} from '../lib/Emitter';

export default class Counter extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		Emitter.addListener('getcount', this.getcount);
		Emitter.addListener('getUniqueCount', this.getUniqueCount);
	}
	getcount=()=>{

	return this.props.items.length;
	};



	getUniqueCount=()=>{
	const unique = [...new Set(this.props.items.map(a=>a))];
	return unique.length;
	};

	render(){
		return(
			<div>
				All Items Count = {this.getcount()}<br/>
				All Unique Count = {this.getUniqueCount()}
			</div>
		)
	}
}