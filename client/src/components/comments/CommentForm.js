import React, { Component } from 'react';
import {connect} from 'react-redux'
import { addComment } from '../../actions/comments'
import {getUsers} from '../../actions/users'
import { Link } from 'react-router-dom'


class CommentForm extends Component {
  
    
    state={}
      
    onChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
    
    onSubmit = (event) => {
      event.preventDefault()
      this.props.onSubmit(this.state)
    }
    
    
    
    render() { 
      return ( 
        <div className="container">
            
            <form onSubmit={this.onSubmit}>
              <label> <h5> Add your comment:  </h5>
                <input type="text" onChange={this.onChange} name="content" value={this.state.content} required></input>
              </label>
              <button >Send</button>
            </form>
        </div>
      )}
}

const mapStateToProps = state => ({
  
  currentUser: state.currentUser
})

 
export default connect(mapStateToProps,  {addComment, getUsers})(CommentForm) 
