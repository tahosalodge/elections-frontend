import React from 'react';
import fileDownload from 'js-file-download';
import apiRequest from 'redux/helpers/api';
import { Button } from 'components/Forms/elements';

class ExportCandidates extends React.Component {
  getCandidateCSV = async params => {
    const download = await apiRequest('/candidates/export', 'POST', params);
    fileDownload(download, 'tahosacandidates.csv');
  };

  render() {
    return (
      <div>
        <Button
          onClick={() => this.getCandidateCSV({ newOnly: true })}
          text="Get New Candidates"
        />
        <Button
          onClick={() => this.getCandidateCSV({ newOnly: false })}
          text="Get All Candidates"
        />
      </div>
    );
  }
}

export default ExportCandidates;
