/**
 * @author:lpf
 * @flow
 *
 **/
import { bindActionCreators } from "redux";
import * as reduxActions from 'redux-actions';
import set from 'lodash/set';
const { createAction, handleActions } = reduxActions;
const initStore = {
  styleItem: {
    configStyle: {},
    baseStyle: {},
  },
  id: null,
  styleConfig: {},
  dataAttr: {},
  dataSource: {},
  updateComponentStyle: false,
  updateComponentDataSource: false,
};
const SETSTYLEVALUE = 'SETSTYLEVALUE';
const SETSELECTITEM = 'SETSELECTITEM';
const UPDATESTYLEDATA = 'UPDATESTYLEDATA';
const UPDATEDATASOURCE = 'UPDATEDATASOURCE';
const appReducer = handleActions({
  [SETSTYLEVALUE]: (state, action) => {
    console.log('action:', action);
    const {path, value} = action.payload;
    const newState = set(state.styleItem, path, value);
    return { ...state, styleItem: {...newState} };
  },
  [SETSELECTITEM]: (state, action) => { console.log('setSelect:',action); return ({ ...state, ...action.payload })},
  [UPDATESTYLEDATA]: (state, action) => ({ ...state, updateComponentStyle: action.payload }),
  [UPDATEDATASOURCE]: (state, action) => ({ ...state, updateComponentDataSource: action.payload })
}, initStore);
export default appReducer;
export const updateStyle = createAction(SETSTYLEVALUE);
export const setSelectItem = createAction(SETSELECTITEM);
export const updateComponentStyleAction = createAction(UPDATESTYLEDATA);
export const updateComponentDataSourceAction =  createAction(UPDATEDATASOURCE);