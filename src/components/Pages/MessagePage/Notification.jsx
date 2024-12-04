import React from 'react';
import { NotificationWrapper } from './styles/MessageStyles';

const Notification = ({ message, type }) => {
  if (!message) return null;

  return <NotificationWrapper type={type}>{message}</NotificationWrapper>;
};

export default Notification;
