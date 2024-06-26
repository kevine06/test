import { DELETE_POST, EDIT_COMMENT, GET_POSTS, UPDATE_POST , DELETE_COMMENT} from "../actions/post.action";
import { LIKE_POST } from "../actions/post.action";
import { UNLIKE_POST } from "../actions/post.action";

const initialState = {};


export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                if(post._id === action.payload.postId) {
                    return {
                      ...post,
                        likers: [action.payload.userId, ...post.likers]
                    }
                }
            return post;
            });
            case UNLIKE_POST:
                return state.map((post) => {
                  if (post._id === action.payload.postId) {
                    return {
                      ...post,
                      likers: post.likers.filter((id) => id !== action.payload.userId),
                    };
                  }
                  return post;
                });   
            case UPDATE_POST:
              return state.map((post) => {
                if (post._id === action.payload.postId) {
                  return {
                    ...post,
                    message: action.payload.message,
                  };
                } else return post
              })
            case DELETE_POST:
                return state.filter((post) => post._id !== action.payload.postId);
            case EDIT_COMMENT: 
                return state.map((post) => {
                  if (post._id === action.payload.postId) {
                    return {
                      ...post,
                      Comments: post.Comments.map((comment) => {
                        if (comment._id === action.payload.commenterId) {
                          return {
                            ...comment,
                            text: action.payload.text
                          }
                        } else {
                          return comment
                        }
                      })
                    }
                  } else return post;
                }) 
              case DELETE_COMMENT:
                  return state.map((post) => {
                    if (post._id === action.payload.postId) {
                      return {
                        ...post,
                        Comments: post.Comments.filter(
                          (comment) => comment._id !== action.payload.commentId
                        ),
                      };
                    } else return post;
                  });
        default:
            return state;
    }
}