import React from 'react';
import fileDownload from 'js-file-download';
import apiRequest from 'redux/helpers/api';
import { Button } from 'components/Forms/elements';

class ExportNominations extends React.Component {
  getNominationCSV = async params => {
    const download = await apiRequest('/nominations/export', 'POST', params);
    fileDownload(download, 'tahosanominations.csv');
  };

  render() {
    return (
      <div>
        <Button
          onClick={() => this.getNominationCSV({ newOnly: true })}
          text="Get New Nominations"
        />
        <Button
          onClick={() => this.getNominationCSV({ newOnly: false })}
          text="Get All Nominations"
        />
      </div>
    );
  }
}

export default ExportNominations;
