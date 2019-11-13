import React from 'react';
import { withStyles } from '@material-ui/styles';

import { Card, Typography, CardContent, TextField, Grid, Icon } from '@material-ui/core';

const styles = theme => ({
    img : {
        width:40,
        'float':'right'
    },
    card : {
        marginBottom: 10
    }
});

class DefinitionCard extends React.Component {

    handleChange(e,name){
        this.props.handleChange(e,name)
    }

    createCard(icon,name,text,labels){
        const { classes } = this.props;
        return(
            <Card className={classes.card}>
                <CardContent>
                    <Icon>
                        <img className={classes.img} src={`/content/svg_icon/${icon}.svg`} alt={name}/>
                    </Icon>
                    <Typography variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography color="textSecondary">
                        {text}
                    </Typography>
                    <TextField
                        onChange={(e)=>this.handleChange(e,icon)} 
                        id="standard-basic"
                        label = {labels}
                        margin="normal"
                        value= {this.props.listKpis.definitionField.get(icon)}
                    />
                </CardContent>
            </Card>
        )
    }

    generateCard() {
        const { classes } = this.props;
        return (
            <Grid container spacing={1}>
            <Grid item xs={12}>
            <Card className={classes.card}>
                <CardContent>
                    <Icon>
                        <img className={classes.img} src={`/content/svg_icon/name.svg`} alt="KPI Name"/>
                    </Icon>
                    <Typography variant="h5" component="h2">
                        KPI Name
                    </Typography>
                    <Typography color="textSecondary">
                        {this.props.listKpis.name}
                    </Typography>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4}>
                {this.createCard("purpose","Purpose","Why should we measure this?", "Type here")}
                {this.createCard("customer","Customer","Who will use this KPI?", "Type here")}
                {this.createCard("datasource","Data Sources","Where will the KPI data come from?", "Type here")}
            </Grid>
            <Grid item xs={4}>
            {this.createCard("definition","Definition or Formula",
                            "If there's any calculation, how the measure is worked out? What is and is not included in the values used?", 
                            "Type here")}
            {this.createCard("resources","Production Resources",
                            "What resources are needed to produce the KPI and reports?", 
                            "Type here")}
            {this.createCard("problem","Problems and Errors",
                            "What are the known issues with KPI production & accuracy?", 
                            "Type here")}
            </Grid>
            <Grid item xs={4}>
            {this.createCard("target","Targets",
                            "What score do we want to achieve? (if already know)", 
                            "Type here")}
            {this.createCard("outcome","Targets Outcomes",
                            "What score do we want to achieve? (if already know)", 
                            "Type here")}
            {this.createCard("cost","Production Cost",
                            "What is the cost of implementing and producing the KPI?", 
                            "Type here")}
            </Grid>
        </Grid>
        )
    }

  render() {
    return (
        <form noValidate autoComplete="off">
           {this.generateCard()}
        </form>
        )
    };
}

export default withStyles(styles)(DefinitionCard);