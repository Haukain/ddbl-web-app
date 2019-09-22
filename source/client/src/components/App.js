import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      signUpAuthenticationForm : true
    }

    this.setAuthenticationForm = this.setAuthenticationForm.bind(this);
    this.getAuthenticationForm = this.getAuthenticationForm.bind(this);
  }

  setAuthenticationForm() {
    this.setState({signUpAuthenticationForm:!this.state.signUpAuthenticationForm})
  }

  getAuthenticationForm() {
    return (
      this.state.signUpAuthenticationForm?<SignUp switchForm={this.setAuthenticationForm}></SignUp>:<SignIn switchForm={this.setAuthenticationForm}></SignIn>
    )
  }

  render() {
    return (
      <div className="App">
        {this.getAuthenticationForm()}
      </div>
    );
  }
}

export default App;
