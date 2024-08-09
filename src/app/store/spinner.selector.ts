import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpinnerState } from './spinner.state';


export const SPINNER_STATE_NAME = 'spinner';

const getSpinnerState = createFeatureSelector<SpinnerState>(SPINNER_STATE_NAME);

export const getLoading = createSelector(getSpinnerState, (state) => {
  return state.showLoading;
});