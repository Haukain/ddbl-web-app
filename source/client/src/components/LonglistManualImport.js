import React from 'react';
import { withStyles } from '@material-ui/styles';
import { TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    element:{
        'vertical-align':'bottom',
        'margin-left' : 25,
    }
});

class LonglistManualImport extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          name : ""
      }

      this.addField = this.addField.bind(this);
    }

    handleChange = (e) => this.setState({
		name: e.target.value
	})

    addField(event) {
        this.props.addKpis(this.state.name)
    }

    render() {
        const { classes } = this.props;
        
        return (
          <div className={classes.listRoot}>
              <div>
                <TextField
                id="standard-basic"
                className={classes.element}
                value={this.state.name}
                onChange={this.handleChange}
                label="KPI's name"
                margin="normal"
                />
                <Fab size="small" color="primary" aria-label="add" disabled={this.state.name===""} onClick={this.addField} className={classes.element}>
                    <AddIcon />
                </Fab>
            </div>
          </div>
        );
    }
}

    export default withStyles(styles)(LonglistManualImport);