import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

/**
 * @ignore
 */
const styles = theme => ({
  element: {
    'vertical-align': 'bottom',
    'margin-left': 25
  }
});

/**
 * TODO
 */
class LonglistManualImport extends React.Component {
  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    /**
     * TODO
     */
    this.state = {
      name: ''
    };

    this.addField = this.addField.bind(this);
    /**
     * @ignore
     */
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  /**
   * TODO
   */
  handleChange = e =>
    this.setState({
      name: e.target.value
    });
  /**
   * TODO
   */
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.addField();
    }
  };
  /**
   * TODO
   */
  addField(event) {
    if(this.state.name!==''){
      this.props.addKpis(this.state.name);
      this.setState({ name: '' });
    }
  }
  /**
   * @ignore
   */
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <TextField
            id='standard-basic'
            className={classes.element}
            value={this.state.name}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            label="KPI's name"
            margin='normal'
          />
          <Fab
            size='small'
            color='primary'
            aria-label='add'
            disabled={this.state.name === ''}
            onClick={this.addField}
            className={classes.element}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LonglistManualImport);
