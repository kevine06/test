import { useState } from "react";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import { deleteComment, editComment } from "../../actions/post.action";

function EditDeleteComment({ comment, postId }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setEdit(false); // Après avoir validé la modification, désactivez le mode édition
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id))
    setEdit(false); 
  }


  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  const toggleEdit = () => {
    // Inverse l'état d'édition à chaque clic sur l'icône d'édition
    setEdit(!edit);
  };

  return (
    <div className="edit-comment">
      {isAuthor && !edit && (
        <span onClick={toggleEdit}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={toggleEdit}>
            Annuler
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <div className="btn">
            <span onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                    handleDelete();
                }
            }}>
            <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
         
        </form>
      )}
    </div>
  );
}

export default EditDeleteComment;
