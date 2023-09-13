import { notification } from 'antd';
import moment from 'moment';

export const formatDate = date => {
  return moment(date)
  .locale('tr')
  .format('DD-MM-YYYY HH:mm');
};

export const fail_notification = error => {
  notification['error']({
      duration: 6,
      message: 'error',
      description: 'error_occured',
  });
};

export const save_success_notification = (response, model) => {
  notification['success']({
    duration: 6,
    message: 'success',
    description: 'save_success',
  });
};

export const delete_success_notification = (response, model) => {
  notification['success']({
    duration: 6,
    message: 'success',
    description: 'delete_success',
  });
};

export const update_success_notification = (response, model) => {
  notification['success']({
    duration: 6,
    message: 'update_success',
    description: 'update_success',
  });
};