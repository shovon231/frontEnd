import ReactDOM from "react-dom"
import "./main.css"
import { connect, Provider } from "react-redux"
import { createStore } from "redux"
import React, { Component } from "react"
import { METHODS } from "http"

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleUsernameChange(event) {
    console.log("username: ", event.target.value)
    this.setState({ username: event.target.value })
  }
  handlePasswordChange(event) {
    console.log("Password", event.target.value)
    this.setState({ password: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log("signup form submitted")
    let b = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })
    console.log("what i am sending", b)
    fetch("http://165.227.42.84:80/signup", { method: "POST", body: b })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Username
        <input type="text" onChange={this.handleUsernameChange} />
        Password
        <input type="text" onChange={this.handlePasswordChange} />
        <input type="submit" />
      </form>
    )
  }
}

class App extends Component {
  render() {
    return <Signup />
  }
}

let reducer = function(state, action) {
  return state // Needed because react-redux calls your reducer with an @@init action
}

const store = createStore(
  reducer,
  {}, // initial state
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
