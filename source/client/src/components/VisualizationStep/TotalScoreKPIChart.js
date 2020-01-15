import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

/**
 * Total score (ease of m*importance) per KPI - bar chart
 */
class TotalScoreKPIChart extends Component {
    
    /**
     * @ignore
     */
    render(){
        // this.props.labelsData.forEarch(console.log)
        return(
            <div className="numberKPIChart">
                <HorizontalBar
                    width={600} height={300}
                    data={ {
                        labels:this.props.labelsData,
                        datasets:[ {
                            label: 'Total score',
                            data:this.props.rawData,
                            backgroundColor: 'rgba(0, 99, 132, 0.6)',
                            borderWidth:0                                              
                        }]
                   }}
                   options={{
                        maintainAspectRatio: false,
                        title:{
                            display:true,
                            text:"Total score per KPIs",
                            fontSize:15,
                            fontColor:"#000",
                            responsive:true
                        },
                        legend:{
                            display:false,
                        },
                        scales: {                            
                                yAxes: [{
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                        min : 0
                                    }
                                }]
                        }                       
                   }}
                />
            </div>
        )
    }
}

export default TotalScoreKPIChart;

