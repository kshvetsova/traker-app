import moment from "moment";

export const getMoment = (curentTraker) => {
  const end = moment();
  const start = moment(curentTraker.openTraker);
  const seconds = end.diff(start, 's');
  const time = moment(curentTraker.time).add(seconds, 's');
  return time.format('YYYY-MM-DD HH:mm:ss');
};


export const setTimer = (startTime, time) => {
  const start = moment(startTime);
  const end = moment();
  const trakerHours = end.diff(start, 'hours');
  const timeTraker = moment(time);
  let houres = trakerHours < 24 ? timeTraker.hours() : trakerHours;
  return `${houres.toString().length === 1 ? '0' + houres : houres}${timeTraker.format(':mm:ss')}`;
};
