import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBarComponent from "./NavBarComponent";
const SingleComponents = () => {
  let { slug } = useParams();
  const [blog, setBlog] = useState("");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API}/blog/${slug}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => alert(err));
  }, []);
  function createMarkup(item) {
    return { __html: item };
  }
  return (
    <div>
      <NavBarComponent />
      <div className="container">
        <h1>{blog.title}</h1>
        <div
          className="pt-3"
          dangerouslySetInnerHTML={createMarkup(blog.content)}
        />
        <p className="text-muted">
          author: {blog.author}, date:{" "}
          {new Date(blog.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SingleComponents;
