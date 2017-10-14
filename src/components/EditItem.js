import React, {Component} from 'react';
import {Emitter} from '../lib/Emitter'

export class EditItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			index: this.props.index
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
						  value: nextProps.value,
						  index: nextProps.index
					  })
	}

	onChangeValue(event) {
		let value = event.target.value;
		this.setState({value})
	}

	onEditItem(event) {
		event.preventDefault();
		if (this.state.value.length > 0) {
			Emitter.emit('onEditItem', {value: this.state.value, index: this.state.index, oldVal: this.state.oldVal});
			this.setState({value: '', index: ''})
		}
	}

	render() {
		return (
			<div className="">
				<form>
					<input
						className="inputStyle"
						value={this.state.value}
						onChange={this.onChangeValue.bind(this)}
					/>
					<button
						onClick={this.onEditItem.bind(this)}
						className='buttonStyle'
					>
						Edit Item
					</button>

				</form>
			</div>
		);
	}
}
