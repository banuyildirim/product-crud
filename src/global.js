import { notification } from 'antd';
import moment from 'moment';
import React from 'react';


module.exports = {
  fail_notification: error => {
    notification['error']({
        duration: 6,
        message: 'error',
        description: 'error_occured',
    });
  },
  save_success_notification: (response, model) => {
    notification['success']({
      duration: 6,
      message: 'success',
      description: 'save_success',
    });
  },
  update_success_notification: (response, model) => {
    notification['success']({
      duration: 6,
      message: 'update_success',
      description: 'update_success',
    });
  },
  delete_success_notification: (response, model) => {
    notification['success']({
      duration: 6,
      message: 'success',
      description: 'delete_success',
    });
  },
  formatDate: date => {
    return moment(date)
      .locale('tr')
      .format('DD-MM-YYYY HH:mm');
  },
};