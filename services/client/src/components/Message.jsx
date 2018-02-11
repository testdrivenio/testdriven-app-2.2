import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
  return (
    <div className={`alert alert-${props.messageType}`}>
      <span
        className="glyphicon glyphicon-exclamation-sign"
        aria-hidden="true">
      </span>
      <span>&nbsp;{props.messageName}</span>
      <button
        className='close'
        data-dismiss='alert'
        onClick={()=>{props.removeMessage()}}
      >&times;</button>
    </div>
  )
};

Message.propTypes = {
  messageName: PropTypes.string,
  messageType: PropTypes.string,
  removeMessage: PropTypes.func.isRequired,
};

export default Message;
