import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

/**
 * Number of KPIs per person - horizontal bar chart
 */
/*class PercentageDefKPIChart extends Component {
    
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
                    labels:props.labelsData,
                    datasets:[ {
                        label: 'Number of full field',
                        data:props.rawData,
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
                           text:"Percentage of definition of KPIs",
                           fontSize:15,
                           responsive:true
                       },
                       legend:{
                           display:this.props.displayLegends,
                           position:this.props.legendPosition,
                           labels:{
                           fontColor:"#000"
                           }
                       },
                       tooltips:{
                        callbacks: {
                            label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            var total = 20; //number of definition field
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat((currentValue/total*100).toFixed(1));
                            return currentValue + ' (defined at ' + percentage + '%)';
                            },
                            title: function(tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                            }
                        }
                    }                       
                   }}
                />
            </div>
        )
    }
}

export default PercentageDefKPIChart;
*/
