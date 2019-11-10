import React from 'react';

const NotificationComponent = ({message, type, acceptText, declineText, onAcceptClicked, onDeclineClicked}) => {
    // First decide what the class should be based on message type
    let notificationClass;
    switch (type) {
      case 'success':
        notificationClass = 'alert alert-success';
        break;
      case 'caution':
        notificationClass = 'alert alert-warning';
        break;
      case 'error':
        notificationClass = 'alert alert-danger';
        break;
      default: // The default should be for a standard message
        notificationClass = 'alert alert-info';
    };
    
    return (
      <div className={notificationClass}>
        <p>{message}</p>
        {acceptText ? <div className="btn btn-primary" onClick={onAcceptClicked}>{acceptText}</div> : null}
        {declineText ? <div className="btn btn-danger" onClick={onDeclineClicked}>{declineText}</div> :
          null}
      </div>
    );
  };

export default NotificationComponent;
