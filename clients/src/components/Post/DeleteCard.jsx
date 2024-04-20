import { useDispatch } from "react-redux"
import { deletePost } from "../../actions/post.action"


export function DeleteCard (props) {

    const dispatch = useDispatch()

    const deleteQuote = () => dispatch(deletePost(props.id));
    
    return (
        <div onClick={() => {
            if (window.confirm('Voulez-vous supprimer cet article')) {
                deleteQuote()
            }
        }}>
        <img src="./img/icons/trash.svg" alt="trash" />

        </div>
    )
}