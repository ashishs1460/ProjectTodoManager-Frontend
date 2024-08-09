import { createReducer, on } from '@ngrx/store';
import { initialState } from './spinner.state';
import { setLoadingSpinner } from './spinner.action';


export const spinnerReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      state,
      showLoading: action.status,
    };
  })
);