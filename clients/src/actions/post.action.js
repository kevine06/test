import axios from "axios";
import { REACT_APP_API_URL } from "../../env";


export const  GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";


export const getPosts = (num) => {
    return (dispatch) => {
        return axios
        .get(`${REACT_APP_API_URL}/api/post/`)
        .then((res) => {
            const array = res.data.slice(0, num)
            dispatch({ type: GET_POSTS, payload: array })
        })
        .catch((err) => console.log(err))
    }
}

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