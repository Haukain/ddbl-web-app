import React, {Component} from 'react';
import DefinedKPIChart from './DefinedKPIChart';
import TotalScoreKPIChart from './TotalScoreKPIChart';
import { withStyles } from '@material-ui/styles';
import Api from '../../utils/Api';
import utils from '../../utils/utils';
import Fab from '@material-ui/core/Fab';
import { Link as RouterLink } from 'react-router-dom';
import PercentageShortlisted from './PercentageShortlisted';

/**
 * @ignore
 */
const styles = theme => ({
    size: {
      height : 210,
      width : '30%',  
      position : "relative", 
      display : "inline-block",
      padding: '5px',
      margin: '10px',
    },
    definitionButton: {
      margin: 0,
      top: 7,
      right: "45%",
      bottom: 'auto',
      left: 'auto',
      position: 'fixed',
    }
  });

/**
 * Panel that display every chart with the data
 */
class VisualizationPanel extends Component {
    /**
     * @ignore
     */  
    constructor(props) {
        super(props);
        /**
         * Initialisation of all the tables that will store the chart data 
         */
        this.state = {
            definedKPIData: [],
            numberKPIData:[],
            totalScoreLabel:[],
            totalScoreData: [],
            shortlistedKPIData: []
        }
    }
    
    /**
     * @ignore
     */
    componentDidMount(){
        this.getChartData();
    }
    
    /**
     * This is a function that get all the data for the charts from the server
     */
    getChartData(){
        let definedKPIData= [];
        let totalScoreData= [];
        let totalScoreLabel= [];
        let shortlistedKPIData = [];
    
         //chart - percentage of shortlisted KPIs
         Api.get('/chart/shortlisted-percentage/1/1')
         .then(data => { 
            shortlistedKPIData.push(data.imported);
            shortlistedKPIData.push(data.shortlisted)
             
             this.setState({ 
                 shortlistedKPIData: shortlistedKPIData        
             })  
         });        
        
        //chart - number of KPIs defined/undefined/partially defined
        Api.get('/chart/completion-percentage/1/1')
        .then(data => { 
            definedKPIData.push(data.defined);
            definedKPIData.push(data.partially)
            definedKPIData.push(data.undefined)

            this.setState({ 
                definedKPIData: definedKPIData        
            })  
        });    
        
        //chart - top 10 total score per KPI    
        Api.get('/chart/kpi-score/1/1')
        .then(data => {
            //eslint-disable-next-line
            if (data.length >=10) {
                for (let k=0; k<10; k++) {
                    totalScoreLabel.push(utils.trimStringToFit(data[k].name));
                    totalScoreData.push(data[k].score);               
                }
            }
            else {
                for (let k in data) {
                    totalScoreLabel.push(utils.trimStringToFit(data[k].name));
                    totalScoreData.push(data[k].score);               
                }
            }

            this.setState({ 
                totalScoreLabel:totalScoreLabel,
                totalScoreData: totalScoreData        
            })  
        });
    }

    /**
     * @ignore
     */
    render(){
        const { classes } = this.props;
        
        return(
            <div>            
                <div className={classes.size}>                    
                    <PercentageShortlisted 
                        rawData={this.state.shortlistedKPIData}                                                                         
                    />                                        
                </div> 
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
                <Fab color="secondary" component={RouterLink} to='/definition'  className={classes.definitionButton} variant="extended">
                    Open Definition form
                </Fab>              
            </div>

        )
    }


}

export default withStyles(styles)(VisualizationPanel);

