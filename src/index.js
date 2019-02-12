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
    //fetch("http://localhost:80/signup", { method: "POST", body: b })
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
// // let Signup = connect(function(x) {
// //   return (
// //     <div>
// //       <h1>Login</h1>
// //       <Login />
// //     </div>
// //   )
// })(unconnectedSignup)
class UnconnectedLogin extends Component {
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
    console.log("what i am sending to server", b)
    fetch("http://165.227.42.84:80/login", { method: "POST", body: b })
      //fetch("http://localhost:80/login", { method: "POST", body: b })
      .then(function(x) {
        return x.text()
      })
      .then(response => {
        console.log("response from login", response)
        let body = JSON.parse(response)
        this.props.dispatch({ type: "set-session-id", sessionId: body.sid })
      })
  }
  render() {
    if (this.props.sid) {
      return <div>this is my session id {this.props.sid}</div>
    }
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

let Login = connect(function(state) {
  return { sid: state.sessionId }
})(UnconnectedLogin)
class unconnectedApp extends Component {
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <Signup />
        <h1>Log In</h1>
        <Login />
      </div>
    )
  }
}
let App = connect()(unconnectedApp)
let reducer = function(state, action) {
  if (action.type === "set-session-id") {
    return { ...state, sessionId: action.sessionId }
  }
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
