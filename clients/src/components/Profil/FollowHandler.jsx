import { useEffect, useState } from "react";
import { isEmpty } from "../Utils";
import { useSelector, useDispatch } from "react-redux"
import { followUser, unfollowUser } from "../../actions/user.action";


export function FollowHandler ({ idToFollow }) {
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
                 <button className="unfollow-btn">Abonné</button>
              </span>
            )}
            {isFollowed === false && !isEmpty(userData) &&(
                 <span onClick={handleFollow}>
                 <button className="follow-btn">Suivre</button>
              </span>
            )}
            
        </>
    )
}