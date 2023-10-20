import './App.css'
import axios from "axios"
import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import NavBarComponent from './components/NavBarComponent'
import {getUser,getToken} from './services/authorize'
function App() {
  const [blogs,setBlogs] = useState([])
  const fetchData=()=>{
    axios.get(`${import.meta.env.VITE_REACT_APP_API}/blogs`)
    .then(res=>{
      setBlogs(res.data)
    })
    .catch(err=>alert(err))
  }

  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=(slug)=>{
    Swal.fire({
      title:'Are you want to delete?',
      icon:'warning',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){        
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog=(slug)=>{
    axios.delete(`${import.meta.env.VITE_REACT_APP_API}/blog/${slug}`,
    {
      headers:{
            Authorization:`Bearer ${getToken()}`
      }
    }
    )
    .then(res=>{
      Swal.fire(
        'Deleted',
        'success'
      )
      fetchData()
    }).catch(err=>console.log(err))
  }

  function createMarkup(item){
    return { __html: item};
  }

  return (
    <div>
      <NavBarComponent/>
      <div className='container'>
      {blogs.map((blog,index)=>{
        return <div className='row' key={index} style={{borderBottom: '1px solid silver'}}>
          <div className='col pt-3 pb-2'>
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>            
            <div className='pt-3' dangerouslySetInnerHTML={createMarkup(blog.content.substring(0,250))}/>
            <p className='text-muted'>
              author: {blog.author}
              , date: {new Date(blog.createdAt).toLocaleString()}
            </p>
            {getUser() && (
              <div>
                <Link className='btn btn-outline-success'
                to={`/blog/edit/${blog.slug}`}>Edit Blog</Link> &nbsp;
                <button className='btn btn-outline-danger'
                onClick={()=>confirmDelete(blog.slug)}>Delete Blog</button>
              </div>              
            )}
          </div>
        </div>
      })}
      </div>      
    </div>
  )
}

export default App
