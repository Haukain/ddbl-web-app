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
import ShortListing from './ShortListing';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <ShortListing/>
      </div>
    );
  }
}

export default App;
