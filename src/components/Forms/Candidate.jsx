import React from 'react';
import propTypes from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import flow from 'lodash/flow';
import { isEmpty } from 'lodash/lang';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import { ranks } from 'constants/values';
import candidateShape from 'shapes/candidate';
import electionShape from 'shapes/election';
import loadingShape from 'shapes/loading';
import { createCandidate, updateCandidate, getCandidate } from 'redux/state/candidate';
import { candidateById } from 'selectors/candidates';
import {
  required,
  number as validNumber,
  email,
  bsaId,
  minValue,
  isYouth,
} from 'components/Forms/validation';
import { FieldWithLabel, Address, Select, Button, Form } from 'components/Forms/elements';
import LoadingOrContent from 'components/LoadingOrContent';

class Candidate extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    createCandidate: propTypes.func.isRequired,
    updateCandidate: propTypes.func.isRequired,
    getCandidate: propTypes.func.isRequired,
    election: electionShape.isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        electionId: propTypes.string,
      }),
    }).isRequired,
    candidate: candidateShape.isRequired,
    initialize: propTypes.func.isRequired,
    loading: loadingShape.isRequired,
    reset: propTypes.func.isRequired,
  };

  componentWillReceiveProps({ candidate }) {
    const { match: { params: { candidateId } }, initialize } = this.props;
    if (candidateId && !isEmpty(candidate)) {
      this.props.getCandidate(candidateId);
      initialize({
        ...candidate,
        dob: format(candidate.dob, 'MM/DD/YYYY'),
      });
    }
  }

  submit = (values) => {
    const { match: { params }, election } = this.props;
    const { unitId, _id: electionId, chapter } = election;
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
    const candidate = {
      ...values,
      chapter,
      electionId,
      unitId,
    };

    if (params.candidateId) {
      this.props.updateCandidate(params.candidateId, candidate);
    } else {
      this.props.createCandidate(params.electionId, candidate);
      this.props.reset();
    }
  };

  render() {
    const {
      handleSubmit, pristine, submitting, loading,
    } = this.props;
    return (
      <LoadingOrContent loading={loading.candidate}>
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
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = (state, props) => {
  const toProps = {
    loading: state.loading,
    candidate: candidateById(state, props),
  };
  return toProps;
};

export default flow(
  reduxForm({
    form: 'candidate',
  }),
  connect(mapStateToProps, { createCandidate, updateCandidate, getCandidate }),
)(Candidate);
