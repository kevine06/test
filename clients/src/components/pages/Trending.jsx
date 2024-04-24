import { useContext } from "react";
import {UidContext } from "../../components/AppContext";
import { useSelector } from "react-redux";
import LeftNav from "../../components/LetNav"
import { isEmpty } from "../Utils" 
import Card from "../../components/Post/Card";
import Trends from "../../components/Trends"


function Trending() {
    const uid = useContext(UidContext);
    const trendList = useSelector((state) => state.trendingReducer)
    console.log(trendList);

    return (
        <div className="trending-page">
            <LeftNav />
            <div className="main">
                <ul>
                    {!isEmpty(trendList[0]) && trendList.map((post) => 
                    <Card post={post} key={post._id} />)}
                </ul>
            </div> 
            <div className="right-side">
                <div className="right-side-container">
                    <Trends />
                </div>
            </div>
        </div>
    )
}
export default Trending;