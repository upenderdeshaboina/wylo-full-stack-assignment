import {Component} from 'react'
import {v4} from 'uuid'
import './add.css'

class AddPost extends Component{
    state={name:'',image:'',category:'',caption:'',isLiked:false}

    onChangeFiles=(event)=>{
        const img = event.target.files[0];
        if (img) {
            const imageUrl=URL.createObjectURL(img)
            this.setState({image:imageUrl})
        }
    }

    onClickSubmit=async(event)=>{
        event.preventDefault()
        const {name,image,category,caption,isLiked}=this.state
        const obj={id:v4(),name,image,category,caption,isLiked}
        console.log(obj)
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(obj)
        }
        const response=await fetch('http://localhost:4000/add-post',options)
        if(response.ok){
            alert('post added')
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
        const {name,caption}=this.state
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
                    <button className='add-btn' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}
export default AddPost