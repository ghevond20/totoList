import React, {Component} from 'react'
import {Emitter} from '../lib/Emitter'

export class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentWillMount () {
    Emitter.addListener('onAddNewItem', this.onAddNewItem.bind(this))
    Emitter.addListener('onEditItem', this.onEditItem.bind(this))
  }

  onEditItem(item){
    let items = this.state.items
    items[item.index] = item.value
    this.setState({items})
  }

  onAddNewItem (newItem) {
    let items = this.state.items
    items.push(newItem)
    this.setState({items})
  }

  removeItem (index) {
    this.setState(prevState => ({
      items: prevState.items.filter((el, i) => {
        return i !== index
      })
    }))
  }
  editItem (index) {
    Emitter.emit('onClickEditButton', {value: this.state.items[index], index})
  }

  render () {
    return (
      <ul className=''>
        {
          this.state.items.map((item, index) =>
            <li key={index} className='list'>
              <div>
                {item}
                <button onClick={this.removeItem.bind(this, index)}>X</button>
                <button onClick={this.editItem.bind(this, index)}>Edit</button>
              </div>
            </li>
          )
      }
      </ul>
    )
  }
}
