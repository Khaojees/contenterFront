import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import NavBarComponent from './NavBarComponent';
import {getUser, getToken} from '../services/authorize'
const FormComponent=()=>{
      const [state,setState] = useState({
            title:"",
            author:getUser()
      })
      const {title,author} = state
      const [content,setContent] = useState('')

      //กำหนดค่าให้ state แบบไฮโซ
      // const inputValue=name=>event=>{
      //       setState({...state,[name]:event.target.value})
      // }

      //กำหนดค่าให้ state แบบ loso
      const inputValue=(name,e)=>{
            setState({...state,[name]:e.target.value})
      }

      const submitContent=(e)=>{
            setContent(e)
      }

      const submitForm=(e)=>{
            e.preventDefault()
            console.log("url"+import.meta.env.VITE_REACT_APP_API)
            axios.post(`${import.meta.env.VITE_REACT_APP_API}/create`,
            {title,content,author},
            {
                  headers:{
                        Authorization:`Bearer ${getToken()}`
                  }
            }
            )
            .then(res=>{
                  Swal.fire(
                        'Success',
                        'Saved data to database',
                        'success'
                      )
                      setState({...state,title:"" ,author:""})
                      setContent('')
            })
            .catch(err=>{
                  Swal.fire(
                        'Error',
                        err.response.data.error,
                        'error'
                      )
            })
      }

      return(
            <div>
                  <NavBarComponent/>
                  <div className='container'>
                  <h1>เขียนบทความ</h1>
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
                              placeholder="text here..."
                              style={{border:'1px solid #666'}}
                              />
                        </div>
                        <div className="form-group">
                              <label>ผู้แต่ง</label>
                              <input type="text" className="form-control" value={author}
                              onChange={(e)=>inputValue("author",e)}/>
                        </div>
                        <br />
                        <input type="submit" value="บันทึก" className="btn btn-primary"/>
                  </form>
                  </div>
            </div>  
      )
}
export default FormComponent