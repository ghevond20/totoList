import React, {Component} from 'react';
import {Emitter} from '../lib/Emitter'
import Counter from "./Counter";

export class AddNewItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tempString: ''
		}
	}

	onChangeValue(event) {
		let tempString = event.target.value;
		Emitter.emit('itemValueChange', tempString);
		this.setState({tempString})
	}

	onAddNewItem(event) {
		event.preventDefault();
		if (this.state.tempString.length > 0) {
			Emitter.emit('onAddNewItem', this.state.tempString);
			this.setState({tempString: ''})
		}
	}



	render() {
		return (
			<div className="">
				<form>
					<input
						className="inputStyle"
						value={this.state.tempString}
						onChange={this.onChangeValue.bind(this)}
					/>
					<button
						onClick={this.onAddNewItem.bind(this)}
						className='buttonStyle'
					>
						Add Item
					</button>
				</form>
			</div>
		);
	}
}
