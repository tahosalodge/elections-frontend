import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const show = keyframes`
  from {
    opacity: 0;
    transform: translate3d(30%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const ToastLi = styled.li`
  align-items: flex-start;
  border-radius: 4px;
  color: #ffffff;
  display: flex;
  padding: 16px;
  background-color: ${props => props.color};
  transition: 0.3s;
  animation ${show} 0.3s;

  &:not(:last-child) {
    margin: 0 0 12px;
  }

  .toast__content {
    flex: 1 1 auto;
    margin: 0 12px 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .toast__dismiss {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: block;
    flex: 0 0 auto;
    font: inherit;
    padding: 0;
  }

`;

const Toast = ({ color, dismiss, text }) => (
  <ToastLi color={color}>
    <p className="toast__content">{text}</p>
    <button className="toast__dismiss" onClick={dismiss}>
      &times;
    </button>
  </ToastLi>
);

Toast.propTypes = {
  color: PropTypes.string.isRequired,
  dismiss: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Toast;
