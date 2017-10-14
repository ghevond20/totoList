import React, {Component} from 'react'
import {Emitter} from '../lib/Emitter'
import Counter from './Counter'

export class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			duplicate: [],
			color: []

		};
	}

	componentWillMount() {
		Emitter.addListener('onAddNewItem', this.onAddNewItem);
		Emitter.addListener('onEditItem', this.onEditItem.bind(this));
		Emitter.addListener('itemValueChange', this.itemValueChange.bind(this));
	}

	onEditItem = (item) => {
		let items = this.state.items;
		items[item.index] = item.value;
		this.setState({items});
		this.state.items.filter((itm, index) => {
			if (items.lastIndexOf(itm) === index &&
				items.indexOf(itm) !== index) {
				if(items.lastIndexOf(itm) > items.indexOf(itm)){
					this.setState((prevState, props) => {
						let firstIndex = this.state.items.indexOf(itm);
						let style = {};
						if (firstIndex in prevState.color) {
							style = prevState.color[firstIndex];
						} else {
							style = {backgroundColor: this.getRandomColor()};
							prevState.color[firstIndex] = style;
						}
						prevState.color[index] = style;
						return {color: prevState.color};
					})
				}else{
					this.setState((prevState, props) => {
						let firstIndex = this.state.items.lastIndexOf(itm);
						let style = {};
						if (firstIndex in prevState.color) {
							style = prevState.color[firstIndex];
						} else {
							style = {backgroundColor: this.getRandomColor()};
							prevState.color[firstIndex] = style;
						}
						prevState.color[index] = style;
						return {color: prevState.color};
					})
				}

			}

		});

	};

	onAddNewItem = (newItem) => {

		let items = this.state.items;
		items.push(newItem);
		this.setState({items});
		this.setState({duplicate: []});
		this.state.items.filter((itm, index) => {
			if (items.lastIndexOf(itm) === index &&
				items.indexOf(itm) !== index) {
				this.setState((prevState, props) => {
					let firstIndex = this.state.items.indexOf(itm);
					let style = {};
					if (firstIndex in prevState.color) {
						style = prevState.color[firstIndex];
					} else {
						style = {backgroundColor: this.getRandomColor()};
						prevState.color[firstIndex] = style;
					}
					prevState.color[index] = style;
					return {color: prevState.color};
				})
			}
		});
	};

	getRandomColor() {
		let letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	itemValueChange = (val) => {

		if (val === '') {
			this.setState({duplicate: []});
		} else {
			this.state.items.map((item, index) => {
				let d = '';
				if (item === val) {
					d = ' duplicate';
				}
				this.setState((prevState, props) => {
					prevState.duplicate[index] = d;
					return {duplicate: prevState.duplicate};
				})
			});
		}

	};

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
							let duplicate = index in this.state.duplicate ? this.state.duplicate[index] : '';
							let color = index in this.state.color ? this.state.color[index] : {};
							return (<li key={index} className={`list${duplicate}`} style={color}>
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
