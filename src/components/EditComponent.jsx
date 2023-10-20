import { useState,useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import NavBarComponent from './NavBarComponent';
import {getToken} from '../services/authorize'
const EditComponent=()=>{
      let { slug } = useParams(); 
      const [state,setState] = useState({
            title:"",
            author:""
      })
      const {title,author} = state
      const [content,setContent] = useState('')

      const submitContent=(e)=>{
            setContent(e)
      }

     const showUpdateForm=()=>(
      <form onSubmit={submitForm}>
                        {/* ถ้าแบบไฮโซให้ใช้แบบนี้
                        <div className="form-group">
                              <label>ชื่อบทความ</label>
                              <input type="text" className="form-control" value={title} 
                              onChange={inputValue("title")}/>
                        </div> */}
                        <div className="form-group">
                              <label>ชื่อบทความ</label>
                              <input type="text" className="form-control" value={title} 
                              onChange={(e)=>inputValue("title",e)}/>
                        </div>
                        <div className="form-group">
                              <label>รายละเอียด</label>
                              <ReactQuill
                              value={content}
                              onChange={submitContent}
                              theme="snow"
                              className="pb-5 mb-3"
                              style={{border:'1px solid #666'}}
                              />
                        </div>
                        <div className="form-group">
                              <label>ผู้แต่ง</label>
                              <input type="text" className="form-control" value={author}
                              onChange={(e)=>inputValue("author",e)}/>
                        </div>
                        <br />
                        <input type="submit" value="อัพเดต" className="btn btn-primary"/>
                  </form>
     )

      //กำหนดค่าให้ state แบบ loso
      const inputValue=(name,e)=>{
            setState({...state,[name]:e.target.value})
      }

      const submitForm=(e)=>{
            e.preventDefault()
            // console.log("url"+import.meta.env.VITE_REACT_APP_API)
            axios.put(`${import.meta.env.VITE_REACT_APP_API}/blog/${slug}`,{title,content,author},
            {
                  headers:{
                        Authorization:`Bearer ${getToken()}`
                  }
            })
            .then(res=>{
                  Swal.fire(
                        'Updated',
                        'Saved data to database',
                        'success'
                      )
                      const {title,content,author} = res.data
                      setState({...state,title,author})
                      setContent(content)
            })
            .catch(err=>{
                  Swal.fire(
                        'Error',
                        err.response.data.error,
                        'error'
                      )
            })
      }
      useEffect(()=>{
            axios.get(`${import.meta.env.VITE_REACT_APP_API}/blog/${slug}`)
            .then(res=>{
                  // setBlog(res.data)
                  const {title,content,author} = res.data
                  setState({...state,title,author})
                  setContent(content)
            })
            .catch(err=>alert(err))
      },[])


      return(
            <div>
                  <NavBarComponent/>
                  <div className='container'>
                        <h1>แก้ไขบทความ</h1>
                        {showUpdateForm()}
                  </div>   
            </div>  
      )
}
export default EditComponent