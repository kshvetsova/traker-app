import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTraker, setTrakerId, getTrakers } from '../../store'
import moment from 'moment';

import './TrakerForm.scss';

export const TrakerForm = () => {
  const [query, setQuery] = useState();
  const trakers = useSelector(getTrakers);
  const dispatch = useDispatch();

  const createTraker = useCallback((name) => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    dispatch(setTrakerId(date));

    return {
      name: name || date,
      id: date,
      time: date,
      startTime: date,
      openTraker: date,
    }
  }, []);

  return (
    <form
      className="TrakerForm"
      onSubmit={(e) => {
        e.preventDefault();
        const traker = createTraker(query);
        if (!trakers.find(elem => elem.id === traker.id)) {
          dispatch(addTraker(traker));
        }
        setQuery('');
      }}
    >
      <input
        className="TrakerForm-Input"
        type="text"
        value={query}
        onChange={({ target }) => setQuery(target.value.trimStart())}
        placeholder="Enter traker name"
      />
      <button type="submit" className="TrakerForm-Button">
        <img
          src="images/caret-right.svg"
          alt="caret-right"
        />
      </button>
    </form>
  )
}