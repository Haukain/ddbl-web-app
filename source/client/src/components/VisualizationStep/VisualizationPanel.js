import React, {Component} from 'react';
import DefinedKPIChart from './DefinedKPIChart';
import TotalScoreKPIChart from './TotalScoreKPIChart';
import { withStyles } from '@material-ui/styles';
import Api from '../../utils/Api';
import utils from '../../utils/utils';
import Fab from '@material-ui/core/Fab';
import { Link as RouterLink } from 'react-router-dom';

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
 * TODO
 */
class VisualizationPanel extends Component {
    /**
     * @ignore
     */  
    constructor(props) {
        super(props);
        /**
         * TODO
         */
        this.state = {
            definedKPIData: [],
            numberKPIData:[],
            totalScoreLabel:[],
            totalScoreData: []
        }
    }
    
    /**
     * @ignore
     */
    componentDidMount(){
        this.getChartData();
    }
    
    /**
     * TODO
     */
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

    /**
     * @ignore
     */
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
                <Fab color="secondary" component={RouterLink} to='/definition'  className={classes.definitionButton} variant="extended">
                    Open Definition form
                </Fab>              
            </div>

        )
    }


}

export default withStyles(styles)(VisualizationPanel);

