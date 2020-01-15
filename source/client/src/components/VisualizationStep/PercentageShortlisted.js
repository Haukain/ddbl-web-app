import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

/**
 * Percentage of KPIs shortlisted - Pie chart
 */
class PercentageShortlisted extends Component {
    
    static defaultProps = {
        displayTitle:true,
        displayLegends:true,
        legendPosition:'bottom',
    }
    
    render(){
        return(
            <div className="percentageShortlisted">      
                <Doughnut
                    width={600} height={300} 
                    data={ {
                        labels:[
                            "KPI non-shortlisted",
                            "KPI shortlisted"
                        ],
                        datasets:[ {
                            label: 'Number of KPIs',
                            data:this.props.rawData,
                            backgroundColor: [
                                'rgba(0, 206, 86, 0.6)',
                                'rgba(0, 162, 235, 0.6)',
                                'rgba(0, 99, 132, 0.6)',
                            ],
                            borderWidth:0,
                            hoverBorderWidth:2,
                            hoverBorderColor:'#FFF'                                              
                        }]
                        }}
                    options={{
                        maintainAspectRatio: false,
                        title:{
                            display:this.props.displayTitle,
                            text:"Display of shortlisted KPIs",
                            fontSize:15,
                            fontColor:"#000",
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
                                var total = meta.total;
                                var currentValue = dataset.data[tooltipItem.index];
                                var percentage = parseFloat((currentValue/total*100).toFixed(1));
                                return currentValue + ' (' + percentage + '%)';
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

export default PercentageShortlisted;