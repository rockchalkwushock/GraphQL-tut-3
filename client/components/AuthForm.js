import React, { Component } from 'react'

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    onSubmit({ email, password });
  }
  render () {
    const { email, password } = this.state;
    const { errors } = this.props;
    return (
      <div className="row">
        <form onSubmit={this._onSubmit} className="col s6">
          <div className="input-field">
            <input
              placeholder='Email'
              type='email'
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder='Password'
              type='password'
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
            {errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default AuthForm