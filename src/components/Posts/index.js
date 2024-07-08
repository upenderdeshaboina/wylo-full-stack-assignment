import {Component} from 'react'
import PostCard from '../PostCard'
import { Link } from 'react-router-dom'
import './posts.css'

class Posts extends Component{
    state={
        postsArray:[],
        editClick:false,
        editObj:{
             id:'',
            name:'',
            caption:'',
            image:'',
            category:'',
            isLiked:''
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData= async()=>{
        const response=await fetch('http://localhost:4000/')
        if(response.ok){
            const jsonData=await response.json()
            this.setState({postsArray:jsonData})
        }
    }


    onClickLiked=(likeId)=>{
        const {postsArray}=this.state
        const newArray=postsArray.map((e)=>e.id===likeId?{...e,isLiked:!e.isLiked}:e)
        this.setState({postsArray:newArray})
    }

    onClickEditPost=(editId)=>{
        this.setState(prevState=>({editClick:!prevState.editClick}))
    }

    render(){
        const {postsArray,editClick,editObj}=this.state
        return(
            <div className='main-container'>
                <h1 className='posts-heading'>All Posts</h1>
                <div className='bottom-container'>
                   {editClick?(
                    <form>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input className='input' type='text' value={editObj.name} onChange={this.onchangeName}/>
                        </div>
                    </form>
                ):(
                    <>
                    <ul className='list-container'>
                        {postsArray.map(post=>(
                            <PostCard key={post.id} postDetails={post} onClickEdit={this.onClickEditPost} onClickLiked={this.onClickLiked}/>
                        ))}
                    </ul>
                    <Link className='link' to='/add-post'>
                        <button className='add-btn' type='button'>Add Post</button>
                    </Link>
                    </>
                )} 
                </div>
                
            </div>
        )
    }
}
export default Posts