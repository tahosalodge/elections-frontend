import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import flow from 'lodash/flow';
import { isEmpty } from 'lodash/lang';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import nominationShape from 'shapes/nomination';
import electionShape from 'shapes/election';
import loadingShape from 'shapes/loading';
import { election as electionMatch } from 'shapes/match';
import {
  createNomination,
  updateNomination,
  getNomination,
} from 'redux/state/nomination';
import { nominationById } from 'selectors/nominations';
import {
  required,
  email,
  bsaId,
  minValue,
  isAdult,
} from 'components/Forms/validation';
import {
  FieldWithLabel,
  Address,
  Button,
  Form,
} from 'components/Forms/elements';
import LoadingOrContent from 'components/LoadingOrContent';

class Nomination extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    createNomination: propTypes.func.isRequired,
    updateNomination: propTypes.func.isRequired,
    getNomination: propTypes.func.isRequired,
    election: electionShape.isRequired,
    match: electionMatch.isRequired,
    nomination: nominationShape.isRequired,
    initialize: propTypes.func.isRequired,
    loading: loadingShape.isRequired,
    reset: propTypes.func.isRequired,
  };

  componentWillReceiveProps({ nomination }) {
    const { match: { params: { nominationId } }, initialize } = this.props;
    if (nominationId && !isEmpty(nomination)) {
      this.props.getNomination(nominationId);
      initialize({
        ...nomination,
        dob: format(nomination.dob, 'MM/DD/YYYY'),
        type: 'unit',
      });
    }
  }

  submit = values => {
    const { match: { params }, election, nomination } = this.props;
    const { unitId, _id: electionId, chapter } = election;

    if (!isEmpty(nomination)) {
      this.props.updateNomination(params.nominationId, {
        ...nomination,
        ...values,
      });
    } else {
      this.props.createNomination(electionId, {
        ...values,
        chapter,
        electionId,
        unitId,
        type: 'unit',
      });
      this.props.reset();
    }
  };

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;
    return (
      <LoadingOrContent loading={loading.nomination}>
        <Form onSubmit={handleSubmit(this.submit)}>
          <h2>Contact Information</h2>
          <FieldWithLabel label="BSA ID" id="bsaid" validate={[bsaId]} />
          <FieldWithLabel label="First name" id="fname" validate={[required]} />
          <FieldWithLabel label="Last name" id="lname" validate={[required]} />
          <FieldWithLabel
            label="Date of Birth (mm/dd/yyyy)"
            id="dob"
            validate={[required, isAdult]}
          />
          <FieldWithLabel label="Phone" id="phone" validate={[required]} />
          <FieldWithLabel
            label="Email"
            id="email"
            validate={[required, email]}
          />
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
          <FieldWithLabel id="position" label="Leadership Position" />
          <Button text="Submit Nomination" disabled={pristine || submitting} />
        </Form>
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = (state, props) => {
  const toProps = {
    loading: state.loading,
    nomination: nominationById(state, props),
  };
  return toProps;
};

export default flow(
  reduxForm({
    form: 'nomination',
  }),
  connect(mapStateToProps, {
    createNomination,
    updateNomination,
    getNomination,
  })
)(Nomination);
