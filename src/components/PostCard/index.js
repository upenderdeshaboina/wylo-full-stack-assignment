import { FaRegHeart } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import {Link} from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import './postcard.css'


const PostCard=(props)=>{
    const {postDetails,onClickLiked}=props
    const {id,name,caption,image,isLiked}=postDetails
    const onClickLike=()=>{
        onClickLiked(id)
    }
    return (
        <li key={id}>
            <div className="card-container">
                <img src={image} className="post-image" alt={name}/>
                <div className="text-container">
                    <div>
                       <p className="post-by">Post by:- {name}</p>
                        <p className="description"> {caption}</p> 
                    </div>
                    <div>
                        <button className="like-btn" type="button" onClick={onClickLike}>
                            {isLiked?<FcLike size={30}/>:<FaRegHeart size={25}/>}
                        </button>
                        <Link to={`/edit-post/${id}`}>
                            <button className="edit-btn" type="button"><FaEdit size={25}/></button>
                        </Link>
                        
                    </div>
                    
                </div>
            </div>
        </li>
    )
}
export default PostCard