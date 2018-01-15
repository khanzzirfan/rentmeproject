import moment from 'moment';

//get current date time - Jan 1, 2017 00:00:00 AM
export const getDateTime = () => moment().format('ll LTS');