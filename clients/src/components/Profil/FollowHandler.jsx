import { useEffect, useState } from "react";
import { isEmpty } from "../Utils";
import { useSelector, useDispatch } from "react-redux"
import { followUser, unfollowUser } from "../../actions/user.action";


export function FollowHandler ({ idToFollow,type }) {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();


    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    }

    const handleUnFollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed (false);
        }
    },[userData, idToFollow])
    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnFollow}>
                  { type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
                  { type === "card" && <img src="./img/icons/checked.svg" alt="checked" />}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) &&(
                <span onClick={handleFollow}>
                   { type === "suggestion" && <button className="follow-btn">Suivre</button> }
                   { type === "card" && <img src="./img/icons/check.svg" alt="check" />}
                </span>
            )}
            
        </>
    )
}