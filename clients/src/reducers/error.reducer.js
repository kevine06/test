import { GET_POST_ERRORS } from "../actions/post.action";
import { GET_USER_ERROR } from "../actions/user.action";

const initialState = { userError: [], postError: []};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        userError: []
      };
    case GET_USER_ERROR:
        return {
            userError: action.payload,
            postError: []
        }
    default: 
      return state;
  }
}
    