import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { flow } from 'lodash';
import { adultLeadershipPositions } from 'constants/values';
import { updateRequest, createRequest } from 'redux/state/unit';
import { FieldWithLabel, Button, Select, SelectDistrict, Address, Form } from './elements';

class UnitInformation extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        unitId: propTypes.string,
      }),
    }).isRequired,
    unit: propTypes.shape().isRequired,
    initialize: propTypes.func.isRequired,
    push: propTypes.func.isRequired,
    updateRequest: propTypes.func.isRequired,
    createRequest: propTypes.func.isRequired,
  };

  componentDidMount() {
    const { match, unit, initialize } = this.props;
    if (match.params.unitId) {
      if (!unit) {
        this.props.push(`/units/${match.params.unitId}`);
      }
      const {
        number,
        chapter,
        activeMembers,
        unitLeader,
        adultRepresentative,
        youthRepresentative,
        meetingLocation,
      } = unit;
      initialize({
        number,
        chapter,
        activeMembers,
        unitLeader,
        adultRepresentative,
        youthRepresentative,
        meetingLocation,
      });
    }
  }

  submit = (values) => {
    const { match: { params } } = this.props;
    if (params.unitId) {
      this.props.updateRequest(params.unitId, values);
    } else {
      this.props.createRequest(values);
    }
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <h1>Unit Information</h1>
        <Form onSubmit={handleSubmit(this.submit)}>
          <FieldWithLabel label="Unit Number" id="number" />
          <SelectDistrict />
          <FieldWithLabel label="Active Members" id="activeMembers" />
          <Address prefix="meetingLocation" />
          <h2>Unit Leader</h2>
          <FieldWithLabel label="First Name" id="unitLeader.fname" />
          <FieldWithLabel label="Last Name" id="unitLeader.lname" />
          <FieldWithLabel label="Phone" id="unitLeader.phone" type="phone" />
          <FieldWithLabel label="Email" id="unitLeader.email" type="email" />
          <Select
            label="Leadership Position"
            id="unitLeader.position"
            options={adultLeadershipPositions}
          />
          <h2>Adult Representative</h2>
          <FieldWithLabel label="First Name" id="adultRepresentative.fname" />
          <FieldWithLabel label="Last Name" id="adultRepresentative.lname" />
          <FieldWithLabel label="Phone" id="adultRepresentative.phone" type="phone" />
          <FieldWithLabel label="Email" id="adultRepresentative.email" type="email" />
          <h2>Youth Representative</h2>
          <FieldWithLabel label="First Name" id="youthRepresentative.fname" />
          <FieldWithLabel label="Last Name" id="youthRepresentative.lname" />
          <FieldWithLabel label="Phone" id="youthRepresentative.phone" type="phone" />
          <FieldWithLabel label="Email" id="youthRepresentative.email" type="email" />
          <Button text="Submit" disabled={pristine || submitting} />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (props.match.path === '/units/new') {
    return {
      unit: {},
    };
  }
  return {
    unit: state.unit.items[props.match.params.unitId] || {},
  };
};

export default flow(
  connect(mapStateToProps, { push, updateRequest, createRequest }),
  reduxForm({
    form: 'unitInformation',
  }),
)(UnitInformation);
