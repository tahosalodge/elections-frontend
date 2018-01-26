import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { removeToast } from 'redux/state/toasts';
import Toast from './Toast';

const ToastsUl = styled.ul`
  top: 70px;
  position: fixed;
  right: 10px;
  width: 90%;
  max-width: 320px;
`;

const Toasts = ({ toasts, ...props }) => (
  <ToastsUl>
    {toasts.map((toast) => {
      const { id } = toast;
      return <Toast {...toast} key={id} dismiss={() => props.removeToast(id)} />;
    })}
  </ToastsUl>
);

Toasts.propTypes = {
  removeToast: PropTypes.func.isRequired,
  toasts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  toasts: state.toasts,
});

export default connect(mapStateToProps, { removeToast })(Toasts);
