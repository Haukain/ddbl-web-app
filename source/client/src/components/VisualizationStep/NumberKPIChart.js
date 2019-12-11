import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

/**
 * Number of KPIs per person - horizontal bar chart
 */
/*class NumberKPIChart extends Component {
    
    static defaultProps = {
        displayTitle:true,
        displayLegends:false,
        legendPosition:'bottom',
    } 
    
    render(){
        return(
            <div className="numberKPIChart">
                <HorizontalBar
                    width={600} height={200} 
                   data={ {
                    labels:labelsData,
                    datasets:[ {
                        label: 'Number of KPIs',
                        data:rawData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                        ],
                        borderWidth:1,
                        borderColor:'#777',
                        hoverBorderWidth:1,
                        hoverBorderColor:'#000'                                              
                       }]
                   }}
                   options={{
                       maintainAspectRatio: false,
                       title:{
                           display:this.props.displayTitle,
                           text:"Number of KPIs per person",
                           fontSize:15,
                           responsive:true
                       },
                       legend:{
                           display:this.props.displayLegends,
                           position:this.props.legendPosition,
                           labels:{
                           fontColor:"#000"
                           }
                       }                       
                   }}
                />
            </div>
        )
    }
}

export default NumberKPIChart;
*/
