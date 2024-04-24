import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducers";
import postReducer from "./posts.reducer";
import errorReducer from "./error.reducer"
import allPostsReducer from "./allPosts.reducer";
import trendingReducer from "./trending.reducer";


export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer,
    allPostsReducer,
    trendingReducer
})