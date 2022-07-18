import { configureStore } from '@reduxjs/toolkit';

const ADD_TRAKER = 'ADD_TRAKER';
const DELETE_TRAKER = 'DELETE_TRAKER';
const UPDATE_TRAKER = 'UPDATE_TIMER';
const OPEN_TRAKER = 'OPEN_TRAKER';
const TRAKER_ID = 'TRAKER_ID';
const TRAKER_ACTIVE = 'TRAKER_ACTIVE';


export const addTraker = (item) => ({ type: ADD_TRAKER, item });
export const deleteTraker = (id) => ({ type: DELETE_TRAKER, id });
export const updateTraker = (id, time) => ({ type: UPDATE_TRAKER, id, time })
export const setTrakerId = (id) => ({ type: TRAKER_ID, id});
export const setTrakerActive = (id) => ({ type: TRAKER_ACTIVE, id });
export const setOpenTraker = (id, time) => ({ type: OPEN_TRAKER, id, time });

export const getTrakers = ({ trakers }) => trakers;
export const getTrakerId = ({ trakerId }) => trakerId;
export const getCurrentTraker = ({ trakers, trakerId }) => (
  trakers.find(traker => traker.id === trakerId));

const savedState = JSON.parse(localStorage.getItem("trakerState") || "null");

const initialState = savedState || {
  trakers: [],
  trakerId: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRAKER:
      return {
        ...state,
        trakers: [ action.item, ...state.trakers ],
      };
    case DELETE_TRAKER:
      return {
        ...state,
        trakers: state.trakers.filter(item => item.id !== action.id),
        trakerId: state.trakerId === action.id ? '' : state.trakerId,
      }
    case UPDATE_TRAKER:
      return {
        ...state,
        trakers: state.trakers.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              time: action.time,
              openTraker: action.id,
            }
          }
          return item;
        })
      }
    case TRAKER_ID:
      return {
        ...state,
        trakerId: action.id,
      }
    case TRAKER_ACTIVE:
      return {
        ...state,
        trakerId: state.trakerId !== action.id ? action.id : '',
      }
    case OPEN_TRAKER:
      return {
        ...state,
        trakers: state.trakers.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              openTraker: state.timerId ? action.time : action.id,
            }
          }
          return item;
        })
      }

    default:
      return state;
  }
}

export const store = configureStore({reducer});

store.subscribe(() => localStorage.setItem(
  'trakerState', JSON.stringify(store.getState())
));