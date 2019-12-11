import React, {Component} from 'react';
import DefinedKPIChart from './DefinedKPIChart';
import TotalScoreKPIChart from './TotalScoreKPIChart';
import { withStyles } from '@material-ui/styles';
import Api from '../../utils/Api';
import utils from '../../utils/utils';
import Fab from '@material-ui/core/Fab';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
    size: {
      height : 210,
      width : '30%',  
      position : "relative", 
      display : "inline-block",
      padding: '5px',
      margin: '10px',
    },
    saveButton: {
      margin: 0,
      top: 7,
      right: 20,
      bottom: 'auto',
      left: 'auto',
      position: 'fixed',
    }
  });
  
class VisualizationPanel extends Component {
      
    constructor(props) {
        super(props);
    
        this.state = {
            definedKPIData: [],
            numberKPIData:[],
            totalScoreLabel:[],
            totalScoreData: []
        }
    }
      
    componentDidMount(){
        this.getChartData();
    }
         
    getChartData(){
        let definedKPIData= [];
        let totalScoreData= [];
        let totalScoreLabel= [];
    
        //chart - number of KPI defined/undefined/partially
        Api.get('/chart/completion-percentage/1/1')
        .then(data => {           
            definedKPIData.push(data.defined);
            definedKPIData.push(data.partially)
            definedKPIData.push(data.undefined)

            this.setState({ 
                definedKPIData: definedKPIData        
            })  
        });    
        
        //chart - total score per KPI    
        Api.get('/chart/kpi-score/1/1')
        .then(data => {
            //eslint-disable-next-line
            for (let k in data) {
                totalScoreLabel.push(utils.trimStringToFit(data[k].name));
                totalScoreData.push(data[k].score);               
            }
            this.setState({ 
                totalScoreLabel:totalScoreLabel,
                totalScoreData: totalScoreData        
            })  
        });
    }

   
    render(){
        const { classes } = this.props;
        
        return(
            <div>            
                <div className={classes.size}>                    
                    <DefinedKPIChart 
                        rawData={this.state.definedKPIData}                                                                         
                    />                                        
                </div> 
                <div className={classes.size}>                    
                    <TotalScoreKPIChart
                        rawData={this.state.totalScoreData}
                        labelsData={this.state.totalScoreLabel}                                                                         
                    />                                        
                </div>
                <Fab color="secondary" component={RouterLink} to='/definition'  className={classes.saveButton} variant="extended">
                    Open Definition form
                </Fab>              
            </div>

        )
    }


}

export default withStyles(styles)(VisualizationPanel);

