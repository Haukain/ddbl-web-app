import React from 'react';
import Parser from 'xml2js';
import { withStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const styles = theme => ({
  fileInput : {
    border : 'solid 2px lightblue'
  },
  listRoot : {
    textAlign : 'center',
    height : 400,
  }
});

class LonglistXMLImport extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.extractSchema = this.extractSchema.bind(this);
  }

  extractSchema(schema){
    let kpiList = [];
    if(schema.Report['VisRpt:VisioReport'][0].ReportFields[0].ReportField.findIndex(e => e.Name[0] === 'Displayed Text')!==undefined)
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
        this.props.importKpis(kpiList)
    }
    else (console.error('Error while extracting schema from the XML file'))
  }

  handleChange(event) {
    let reader = new FileReader();
    reader.readAsText(event.target.files[0], 'UTF-8');
    reader.onload = (evt) => {
        Parser.parseString(evt.target.result, (err, result) => {
            this.extractSchema(result)
        })
    }
    reader.onerror = (evt) => {
        console.log('error reading file');
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.listRoot}>
          <input
            hidden
            type='file'
            accept='.xml'
            id='file-input'
            onChange={this.handleChange}
            variant='contained' color='primary'
          />
          <label htmlFor='file-input'>
            <IconButton component='span' className={classes.fileInput}
          color="primary">
              <NoteAddIcon/>
            </IconButton>
          </label>
      </div>
    );
  }
}

export default withStyles(styles)(LonglistXMLImport);