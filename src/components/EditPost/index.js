import {Component} from 'react'
import './edit.css'

class EditPost extends Component{
    state={id:'',name:'',image:'',category:'',caption:'',isLiked:false}

    onChangeFiles=(event)=>{
        const img = event.target.files[0];
        if (img) {
            const imageUrl=URL.createObjectURL(img)
            this.setState({image:imageUrl})
        }
    }

    

    onClickSubmit=async(event)=>{
        event.preventDefault()
        const {id}=this.props.match.params
        const {name,image,category,caption,isLiked}=this.state
        const obj={id,name,image,category,caption,isLiked}
        console.log(obj)
        const options={
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(obj)
        }
        const response=await fetch(`https://mylo-backend.onrender.com/edit-post/${id}`,options)
        if(response.ok){
            alert('post updated')
            const {history}=this.props
            history.replace('/')
        }
        this.setState({
            name:'',
            image:'',
            category:'',
            caption:'',
            isLiked:false
        })
    }

    onChangeCategory=e=>{
        this.setState({category:e.target.value})
    }

    render(){
        const {name,category,caption,image}=this.state
        console.log(category,image)
        return (
            <div className='edit-container'>
                <form className='form' onSubmit={this.onClickSubmit}>
                    <h1 className='edit-heading'>Edit-Post</h1>
                    <div className='inputs'>
                        <label htmlFor='name'>Name</label>
                        <input id='name' type='text' className='name' onChange={(e)=>this.setState({name:e.target.value})} value={name} accept='image*' required placeholder='Enter Your Name'/>
                    </div>
                    <div className='inputs'>
                        <label htmlFor='image'>Image</label>
                        <input id='image' className='image' type='file' onChange={this.onChangeFiles}/>
                    </div>
                    <div className='inputs'>
                        <label htmlFor='select'>Select Category</label>
                        <select onChange={this.onChangeCategory}>
                            <option value='pets' name='option'>Pets</option>
                            <option value='nature' name='option'>Nature</option>
                        </select>
                    </div>
                    <div className='inputs'>
                        <label htmlFor='caption'>Caption</label>
                        <textarea onChange={(e)=>this.setState({caption:e.target.value})} value={caption} placeholder='Enter Your Caption'></textarea>
                    </div>
                    <button className='editing-btn' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}
export default EditPost