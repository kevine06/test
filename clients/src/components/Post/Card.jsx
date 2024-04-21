import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { dateParser, isEmpty } from "../Utils";
import { FollowHandler } from "../Profil/FollowHandler";
import Likebutton from "./LikeButton";
import { updatePost } from "../../actions/post.action";
import { DeleteCard } from "./DeleteCard";
import { CardComments } from "./CardComment";

export default function Card({ post }) {
    const [isLoading, setLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdated, setTextUpdated] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();   

    function updateItem() {
        if (textUpdated) {
            dispatch(updatePost(post._id, textUpdated))
        }
        setIsUpdated(false)
    }

    useEffect(() => {
        !isEmpty(usersData[0] && setLoading(false));
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
         {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
         ) : (
            <>
                <div className="card-left">
                    <img src={!isEmpty(usersData[0]) && usersData
                     .map((user) => {
                        if (user._id === post.posterId) return user.picture;
                        
                     }).join('')
                    }
                     alt="poster-pic"
                     />     
                </div>
                <div className="card-right">
                    <div className="card-header">
                        <div className="pseudo">
                            <h3>
                                {!isEmpty(usersData[0]) && usersData
                                .map((user) => {
                                    if (user._id === post.posterId) return user.pseudo 
                                })
                                }
                            </h3>
                            {post.posterId !== userData._id && (
                                <FollowHandler idToFollow={post.posterId } type={"card"}/>                         
                            )}
                        </div>
                        <span>{dateParser(post.createdAt)}</span>
                    </div>
                       {isUpdated === false && <p>{post.message}</p> } 
                       {isUpdated && (
                            <div className="update-post">
                                <textarea 
                                defaultValue={post.message}
                                onChange={(e) => setTextUpdated(e.target.value)}
                                />
                                <div className="nutton-container">
                                    <button className="btn" onClick={updateItem}>
                                        valider modification
                                    </button>
                                </div>
                            </div>
                       )}
                        {post.picture && (
                            <img src={post.picture} alt="card-pic" className="card-pic" />
                        )}
                         {post.video && (
                                <iframe
                                    width="500"
                                    height="300"
                                    src={post.video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={post._id}
                                ></iframe>
                            )}
                            {userData._id === post.posterId && (
                                <div className="button-container">
                                    <div onClick={() => setIsUpdated(!isUpdated)}>
                                        <img src="./img/icons/edit.svg" alt="edit" />
                                    </div>
                                    <DeleteCard id={post._id} />
                                </div>
                            )}
                            <div className="card-footer">
                                <div className="comment-icon">
                                    <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="comment" />
                                    <span>{post.Comments.length}</span>
                                </div>
                                    <Likebutton post={post}/>
                                <img src="./img/icons/share.svg" alt="share" />
                            </div>
                            { showComments && < CardComments post={post} />}
                </div>
            </>
        )}  
        </li>
    )
}