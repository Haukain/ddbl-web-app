import React from 'react';
import Parser from 'xml2js';
import Fab from '@material-ui/core/Fab';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

/**
 * TODO
 */
class LonglistXMLImport extends React.Component {
  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.extractSchema = this.extractSchema.bind(this);
  }
  /**
   * TODO
   */
  extractSchema(schema) {
    let kpiList = [];
    try {
      if (
        schema.Report[
          'VisRpt:VisioReport'
        ][0].ReportFields[0].ReportField.findIndex(
          e => e.Name[0] === 'Displayed Text'
        ) !== -1
      ) {
        let previousIndexes = schema.Report[
          'VisRpt:VisioReport'
        ][0].Group[0].GroupField[0].RowItem.reduce((a, e, i) => {
          if (e.Field[0].Val) {
            if (e.Field[0].Val[0]._ === 'KPI') a.push(i);
          }
          return a;
        }, []);

        // eslint-disable-next-line
        for (let i of previousIndexes) {
          kpiList.push(
            schema.Report['VisRpt:VisioReport'][0].Group[0].GroupField[0]
              .RowItem[i + 1].Field[0].Val[0]._
          );
        }
        this.props.importKpis(kpiList);
      } else throw new Error('No text field in the report');
    } catch (error) {
      this.props.openSnackbar(
        'Error while extracting the schema from the XML file',
        true
      );
      console.error(
        `Error while extracting the schema from the XML file. Please ensure than the imported XML file is a Visio report: ${error}`
      );
    }
  }
  /**
   * TODO
   */
  handleChange(event) {
    try {
      let reader = new FileReader();
      reader.readAsText(event.target.files[0], 'UTF-8');
      reader.onload = evt => {
        Parser.parseString(evt.target.result, (err, result) => {
          this.extractSchema(result);
        });
      };
      reader.onerror = evt => {
        throw new Error('FileReader error');
      };
    } catch (error) {
      this.props.openSnackbar('Error while reading the imported file', true);
      console.error(`Error while reading the imported file: ${error}`);
    }
  }
  /**
   * @ignore
   */
  render() {
    return (
      <div>
        <input
          hidden
          type='file'
          accept='.xml'
          id='file-input'
          onChange={this.handleChange}
          variant='contained'
          color='primary'
        />
        <label htmlFor='file-input'>
          <Fab component='span' size='small' color='primary'>
            <NoteAddIcon />
          </Fab>
        </label>
      </div>
    );
  }
}

export default LonglistXMLImport;
