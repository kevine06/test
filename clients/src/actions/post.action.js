import axios from "axios";
import { REACT_APP_API_URL } from "../../env";

//posts

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_POSTS";

export const ADD_POST= "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// trends
export const GET_TRENDS = "GET_TRENDS";

//errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios
        .get(`${REACT_APP_API_URL}/api/post/`)
        .then((res) => {
            const array = res.data.slice(0, num)
            dispatch({ type: GET_POSTS, payload: array })
            dispatch({ type: GET_ALL_POSTS, payload: res.data})
        })
        .catch((err) => console.log(err))
    }
}

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${REACT_APP_API_URL}/api/post/`, data)
      .then((res) => {
        const responseData = res.data;
      })
      .catch((error) => {
        const serverErrors = error.response.data.errors;
        dispatch({ type: GET_POST_ERRORS, payload: serverErrors });
        throw error;
      });
  };
};


export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${REACT_APP_API_URL}/api/post/like-post/` + postId,
            data: {id : userId },
        })
        .then(() => {
            dispatch({ type: LIKE_POST, payload: { postId, userId } })
        })
        .catch((err) => console.log(err));
    };
};

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${REACT_APP_API_URL}/api/post/unlike-post/` + postId,
        data: { id: userId },
      })
        .then(() => {
          dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        })
        .catch((err) => console.log(err));
    };
  };

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${REACT_APP_API_URL}/api/post/${postId}`,
            data: { message }
        })
        .then(() => {
            dispatch({ type: UPDATE_POST, payload: {message, postId}})
        })
        .catch((err) => console.log(err));
    }
}


export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${REACT_APP_API_URL}/api/post/${postId}`
        })
        .then(() => {
            dispatch({ type: DELETE_POST, payload: { postId }})
        })
        .catch((err) => console.log(err));
    }
}

export const addComment = (postId, commenterId, text, commentesPseudo) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${REACT_APP_API_URL}/api/post/comment-post/${postId}`,
        data: { commenterId, text, commentesPseudo },
      })
        .then(() => {
          dispatch({ type: ADD_COMMENT, payload: { postId } });
        })
        .catch((err) => console.log(err));
    };
  };

export const editComment = (postId, commenterId, text) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${REACT_APP_API_URL}/api/post/edit-comment-post/${postId}`,
        data: { commenterId, text },
      })
        .then(() => {
          dispatch({ type: EDIT_COMMENT, payload: { postId, commenterId, text } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${REACT_APP_API_URL}/api/post/delete-comment-post/${postId}`,
        data: { commentId},
      })
        .then(() => {
          dispatch({ type: DELETE_COMMENT, payload: { postId, commentId }});
        })
        .catch((err) => console.log(err));
    };
  };

  export const getTrends = ( sortedArray ) => {
    return (dispatch) => {
      dispatch({ type :GET_TRENDS, payload: sortedArray})
    }
  }