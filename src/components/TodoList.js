import React, {Component} from 'react';
import {List} from './List'
import {AddNewItem} from './AddNewItem';
import {EditItem} from './EditItem';
import {Emitter} from '../lib/Emitter'


export class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editableItem: {}
		};
	}

	componentWillMount() {
		Emitter.addListener('onClickEditButton', this.onClickEditButton.bind(this))
		Emitter.addListener('onEditItem', (v,i)=> {
			this.setState({editableItem:{}})
		});
	}

	onClickEditButton(editableItem) {
		this.setState({editableItem})
	}

	getInputBox() {

			if (Object.keys(this.state.editableItem).length) {
				return (<EditItem value={this.state.editableItem.value} index={this.state.editableItem.index}/>)
			}
			else {
				return (<AddNewItem/>)
			}


	}

	render() {
		return (
			<div>
				{this.getInputBox()}
				<List />

			</div>
		);
	}
}
