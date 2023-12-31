export const authenticate = (res,next)=>{
      if(window !== "undifind"){
            sessionStorage.setItem("token",JSON.stringify(res.data.token))
            sessionStorage.setItem("user",JSON.stringify(res.data.username))
      next()
      }
}

export const getToken=()=>{
      if(window !== "undifind"){
            if(sessionStorage.getItem("token")){
                  return JSON.parse(sessionStorage.getItem("token"))
            }else{
                  return false
            }
      }
}

export const getUser=()=>{
      if(window !== "undifind"){
            if(sessionStorage.getItem("user")){
                  return JSON.parse(sessionStorage.getItem("user"))
            }else{
                  return false
            }
      }
}

export const logout=(next)=>{
      if(window !== "undifind"){
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("user")
      }
      next()
}