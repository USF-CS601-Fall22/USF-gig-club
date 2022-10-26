import * as auth from './reducers/auth.reducers';
import * as classified from './reducers/classified.reducers';

export interface AppState {
    authState: auth.State;
    classifiedState: classified.State;
}