import {combineReducers} from 'redux' ;
import MemberReducer from './Reducers/member.reducer';
import ThemeReducer from "./Reducers/theme.reducer"

const rootReducer = combineReducers({
    MemberReducer,
    ThemeReducer
}) ;

export default rootReducer ;