import moment from 'moment';

export const formatDate = dateString => {
  //   const formatedDate = moment(dateString).format('MMM Do, YYYY');
  const momentObj = moment.utc(dateString);
  const formatedDate = momentObj.format('DD MMM YYYY');
  return formatedDate;
};

export const utcMomentObject = dateString => {
  const momentObj = moment.utc(dateString);
  const formatedDate = momentObj.format('DD/MMmm/YY');
  return formatedDate;
};
