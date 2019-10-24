import React from 'react';
import Parser from 'xml2js'

class LonglistXMLImport extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        kpiList : []
    }

    this.handleChange = this.handleChange.bind(this);
    this.extractSchema = this.extractSchema.bind(this);
  }

  handleChange(event) {
    let reader = new FileReader();
    reader.readAsText(event.target.files[0], "UTF-8");
    reader.onload = (evt) => {
        Parser.parseString(evt.target.result, (err, result) => {
            this.extractSchema(result)
        })
    }
    reader.onerror = (evt) => {
        console.log("error reading file");
    }
  }

  extractSchema(schema){
    let kpiList = [];
    if(schema.Report['VisRpt:VisioReport'][0].ReportFields[0].ReportField.findIndex(e => e.Name[0] === "Displayed Text")!==undefined)
    {
        let previousIndexes = schema.Report['VisRpt:VisioReport'][0].Group[0].GroupField[0].RowItem
        .reduce( 
            (a, e, i) => {
                if (e.Field[0].Val){
                    if(e.Field[0].Val[0]._ === 'KPI') a.push(i)
                }
                return a
            }
        , [])

        for(let i of previousIndexes) {
            kpiList.push(schema.Report['VisRpt:VisioReport'][0].Group[0].GroupField[0].RowItem[i+1].Field[0].Val[0]._)
        }
        this.setState({kpiList:kpiList})
    }
    else (console.error("Error while extracting schema from the XML file"))
    // schema.Report['VisRpt:VisioReport'][0].Group[0].GroupField[0].RowItem.forEach( (item,index) => {

    // })
  }

  generateKpiList() {
      let kpiList = []
      for(let k of this.state.kpiList)
      {
          kpiList.push(<p>{k}</p>)
      }
      return kpiList
  }

  render() {
    return (
      <div>
          <input variant="contained" color="primary" type="file" name="xml" accept=".xml" onChange={this.handleChange}/>
          {this.generateKpiList()}
      </div>
    );
  }
}

export default LonglistXMLImport;