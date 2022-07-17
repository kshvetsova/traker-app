import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTrakers, deleteTraker, getTrakerId,getCurrentTraker,
  updateTraker, setTimerActive, setOpenTraker} from '../../store';
import { getMoment, setTimer } from '../../helpers/moment';
import moment from 'moment'
import classNames from 'classnames';
import './TrakerList.scss';


export const TrakerList = () => {
  const dispatch = useDispatch();
  const trakers = useSelector(getTrakers);
  const trakerId = useSelector(getTrakerId);
  const currentTraker = useSelector(getCurrentTraker);

  useEffect(() => {

    if (trakerId) {
      dispatch(updateTraker(trakerId, getMoment(currentTraker)));
    }

    return () => {
      dispatch(setOpenTraker(trakerId, moment().format('YYYY-MM-DD HH:mm:ss')));
    }
  }, []);

  useEffect(() => {
    let timerId;

    if (trakerId) {
      if (currentTraker.openTraker === trakerId) {
        timerId = setInterval(() => {
          let time = moment(currentTraker.time).add(1, 'second');
          const res = time.format('YYYY-MM-DD HH:mm:ss');
          dispatch(updateTraker(trakerId, res));
      }, 1000);
    }
  }

    return () => {
     clearInterval(timerId);
   };
  }, [trakerId, currentTraker]);




  return (
    <ul className="TrakerList">
      {trakers.map(({ name, id, time, startTime }) => (
        <li
          key={id}
          className={classNames("TrakerList-Item", {
          item_active: trakerId === id,
          })}
        >
          <p>{name}</p>
          <div className="TrakerList-Container">
            <div className="TrakerList-Traker">
              {setTimer(startTime, time)}
            </div>
            <button
              type="button"
              className={classNames("TrakerList-Button button", {
                button_active: trakerId !== id,
              })}
              onClick={() => dispatch(setTimerActive(id))}
            >{}</button>
            <button
              className="TrakerList-ButtonDelete button"
              type="button"
              onClick={() => {
                dispatch(deleteTraker(id));
              }}
            >{}</button>
          </div>
        </li>
    ))}
    </ul>
  )
};
