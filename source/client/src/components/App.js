import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import HomePage from './HomePage';
import NoMatch from './NoMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Longlist from './Longlist';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/signin">
              <SignIn/>
            </Route>
            <Route exact path="/signup">
              <SignUp/>
            </Route>
            <Route exact path="/longlist">
              <Longlist/>
            </Route>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
