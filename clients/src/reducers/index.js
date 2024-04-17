import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducers";
import postReducer from "./posts.reducer";



export default combineReducers({
    userReducer,
    usersReducer,
    postReducer
})