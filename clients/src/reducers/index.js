import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducers";
import postReducer from "./posts.reducer";
import errorReducer from "./error.reducer"


export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer
})