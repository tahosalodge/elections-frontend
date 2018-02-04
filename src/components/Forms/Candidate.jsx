import React from 'react';
import propTypes from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import flow from 'lodash/flow';
import { connect } from 'react-redux';

import { ranks } from 'constants/values';
import { createCandidate, updateCandidate } from 'redux/state/candidate';
import {
  required,
  number as validNumber,
  email,
  bsaId,
  minValue,
  isYouth,
} from 'components/Forms/validation';
import { FieldWithLabel, Address, Select, Button, Form } from 'components/Forms/elements';

class Candidate extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    // createCandidate: propTypes.func.isRequired,
    // updateCandidate: propTypes.func.isRequired,
    // match: propTypes.shape({
    //   params: propTypes.shape({
    //     electionId: propTypes.string,
    //   }),
    // }).isRequired,
  };

  submit = (values) => {
    // const { match: { params } } = this.props;
    if (values.parentPhone === values.youthPhone) {
      throw new SubmissionError({
        youthPhone:
          'Parent and youth phone number should not match, if the scout does not have their own please leave this field empty.',
      });
    }

    if (values.parentEmail === values.youthEmail) {
      throw new SubmissionError({
        youthPhone:
          'Parent and youth email should not match, if the scout does not have their own please leave this field empty.',
      });
    }
    console.log(values);
    // if (params.electionId) {
    //   this.props.updateCandidate(params.electionId, values);
    // } else {
    //   this.props.createCandidate(params.unitId, values);
    // }
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <h1>Candidate</h1>
        <p />
        <Form onSubmit={handleSubmit(this.submit)}>
          <h2>Contact Information</h2>
          <FieldWithLabel label="BSA ID" id="bsaid" validate={[required, validNumber, bsaId]} />
          <FieldWithLabel label="First name" id="fname" validate={[required]} />
          <FieldWithLabel label="Last name" id="lname" validate={[required]} />
          <FieldWithLabel
            label="Date of Birth (dd/mm/yyyy)"
            id="dob"
            validate={[required, isYouth]}
          />
          <FieldWithLabel label="Parent Phone" id="parentPhone" validate={[required]} />
          <FieldWithLabel label="Parent Email" id="parentEmail" validate={[required, email]} />
          <FieldWithLabel label="Youth Phone (optional)" id="youthPhone" />
          <FieldWithLabel label="Youth Email (optional)" id="youthEmail" validate={[email]} />
          <Address />

          <h2>Eligibility Information</h2>
          <FieldWithLabel
            label="Long Term Camping Nights"
            id="campingLongTerm"
            validate={[required, minValue(5)]}
          />
          <FieldWithLabel
            label="Short Term Camping Nights"
            id="campingShortTerm"
            validate={[required, minValue(10)]}
          />
          <Select label="Rank" id="rank" options={ranks} validate={[required]} />
          <Button text="Submit" disabled={pristine || submitting} />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  election: state.election.items,
});

export default flow(
  reduxForm({
    form: 'candidate',
  }),
  connect(mapStateToProps, { createCandidate, updateCandidate }),
)(Candidate);
