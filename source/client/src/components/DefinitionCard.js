import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Grid from '@material-ui/core/Grid';
import { SvgIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
});

class DefinitionCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cardList : []
        }
        this.createCard = this.createCard.bind(this);
    }

    createCard(icon,name,text,labels){
        const { classes } = this.props;
        return(
            <Card style={{'margin-bottom':15}}>
                <CardContent>
                    <Icon>
                        <img style={{width:40,'float':'right'}} src={`/content/svg_icon/${icon}.svg`}/>
                    </Icon>
                    <Typography variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography color="textSecondary">
                        {text}
                    </Typography>
                    <TextField
                        id="standard-basic"
                        label = {labels}
                        margin="normal"
                    />
                </CardContent>
            </Card>
        )
    }

    generateCard() {
        return (
            <Grid container spacing={1}>
            <Grid item xs={4}>
                {this.createCard("name","KPI Name",null, "KPI example 7")}
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
            {this.createCard("money","Production Cost",
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

export default DefinitionCard;