import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from './HomePage';
import NoMatch from './utils/NoMatch';
import StepSelectionPage from './StepSelectionPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Longlist from './LonglistStep/Longlist';
import Definition from './DefinitionStep/Definition';
import ShortList from './ShortlistStep/ShortList';
import VisualizationPanel from './VisualizationStep/VisualizationPanel';
import Snackbar from './utils/Snackbar';
import Header from './utils/Header';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbars: []
    };

    this.handleSnackbarOpening = this.handleSnackbarOpening.bind(this);
    this.handleSnackbarClosing = this.handleSnackbarClosing.bind(this);
    this.generateSnackbars = this.generateSnackbars.bind(this);
  }

  handleSnackbarOpening(msg, error) {
    let snackbars = this.state.snackbars;
    snackbars.push({ msg: msg, error: error });
    this.setState({ snackbars: snackbars });
  }

  handleSnackbarClosing(i) {
    let snackbars = this.state.snackbars;
    snackbars.splice(i);
    this.setState({ snackbars: snackbars });
  }

  generateSnackbars() {
    let snackbars = [];
    // eslint-disable-next-line
    for (let [i, s] of this.state.snackbars.entries()) {
      snackbars.push(
        <Snackbar
          key={i}
          snack={s}
          handleClose={() => this.handleSnackbarClosing(i)}
        />
      );
    }
    return snackbars;
  }

  render() {
    return (
      <div className='App'>
        <CssBaseline />
        <Router>
          <Header />
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/longlist'>
              <Longlist openSnackbar={this.handleSnackbarOpening} />
            </Route>
            <Route exact path='/shortlist'>
              <ShortList openSnackbar={this.handleSnackbarOpening} />
            </Route>
            <Route exact path='/definition'>
              <Definition openSnackbar={this.handleSnackbarOpening} />
            </Route>
            <Route exact path="/visualization">
              <VisualizationPanel/>
            </Route>
            <Route exact path='/steps'>
              <StepSelectionPage />
            </Route>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </Router>
        {this.generateSnackbars()}
      </div>
    );
  }
}

export default App;
