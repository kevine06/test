import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { isEmpty } from "../Utils";

export default function Card ({ post }) {
    const [isLoading, setLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);


    useEffect(() => {
        !isEmpty(usersData[0] && setLoading(false));
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
         {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
         ) : (
            <h2>test</h2>
         )}
        </li>
    )
}