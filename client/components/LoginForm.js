import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this._onSubmit = this._onSubmit.bind(this);
  }
  componentWillUpdate(nextProps) {
    const lastProps = this.props;
    // if there was no user obj before
    // and there now is a user obj.
    // then redirect authenticated user to dashboard.
    if (!lastProps.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }
  _onSubmit({ email, password }) {
    const { mutate } = this.props;
    // pass email & password to mutate()
    // create user from 'variables'
    // update component with new 'query' data
    // catch error and display message via setState()
    mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm errors={errors} onSubmit={this._onSubmit}/>
      </div>
    );
  }
}

// give access to query for 'user'.
// give access to mutation 'login()'
export default graphql(query)(
  graphql(mutation)(LoginForm)
);