import React, {Component} from 'react'
import {Emitter} from '../lib/Emitter'
import Counter from './Counter'
import * as Constants from '../lib/Constants'

export class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			tempValue:'',
			color: []
			// duplicate: [
			// 	{ids:[1,2,3],color:'#fff'},
			// 	{ids:[4,8,16],color:'red'}
			// ],


		};
	}

	componentWillMount() {
		Emitter.addListener('onAddNewItem', this.onAddNewItem);
		Emitter.addListener('onEditItem', this.onEditItem.bind(this));
		Emitter.addListener('itemValueChange', this.itemValueChange.bind(this));
	}

	 setDefaultColor(indexList){
		let color = this.state.color
		indexList.forEach((index)=>{
				color[index] = Constants.DEFAULT_COLOR
		})
		return color
	 }

	onEditItem = (item) => {
		let items = this.state.items;
		let color = this.state.color
		let prevValue = this.state.items[item.index]
		items[item.index] = item.value;

		let hasEqual = this.checkUniqueItem(prevValue)
		if(hasEqual.length < 3){
			color = this.setDefaultColor(hasEqual);
		}else{
			color[item.index] = Constants.DEFAULT_COLOR
		}
	 	hasEqual = this.checkUniqueItem(item.value)
		color = this.setDublicatetColors(color, hasEqual,item.index)

		this.setState({items,color});
	};

	checkUniqueItem(value){
		let equal = []
		this.state.items.forEach((item, index)=>{
				if(value === item){
						equal.push(index)
				}
		})
		return equal
	}

 	setDublicatetColors(color, hasEqual, itemIndex){
		if(hasEqual.length){
			if(color[hasEqual[0]] ===  Constants.DEFAULT_COLOR){
				color[hasEqual[0]] = this.getRandomColor()
			}
			color[itemIndex] = color[hasEqual[0]]
		}
		return color
	}

	onAddNewItem = (newItem) => {
		let items = this.state.items;
		let color = this.state.color;
		let hasEqual = this.checkUniqueItem(newItem)
		color[items.length] = Constants.DEFAULT_COLOR
		color = this.setDublicatetColors(color, hasEqual, items.length)
		items.push(newItem);
		this.setState({items,tempValue:'',color});
	};

	getRandomColor() {
		let letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	itemValueChange = (tempValue) => {
		this.setState({tempValue})
	}

	removeItem(index) {
		this.setState(prevState => ({
			items: prevState.items.filter((el, i) => {
				return i !== index
			})
		}))
	}

	editItem(index) {
		Emitter.emit('onClickEditButton', {value: this.state.items[index], index})
	}

	render() {
		return (
			<div>
				<Counter items={this.state.items}/>
				<ul className=''>
					{
						this.state.items.map((item, index) => {
							let duplicate = this.state.tempValue === item ? ' duplicate' : '';
							return (<li key={index} className={`list${duplicate}`} style={{backgroundColor: this.state.color[index]}}>
								<div>
									{item}
									<button onClick={this.removeItem.bind(this, index)}>X</button>
									<button onClick={this.editItem.bind(this, index)}>Edit</button>
								</div>
							</li>);
						})
					}
				</ul>
			</div>
		)
	}
}
