import React, { useContext, useState } from 'react';
import { adddata } from './context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const AddBookForm = () => {
  const {udata,setUdata} = useContext(adddata)
    const history = useNavigate()

  const [inpval,setINP] = useState({
    title:"",
    author:"",
    genre:"Fiction",
    image:"",
    description:""
  })

  const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Fantasy', 'Biography', 'History', 'Self-Help'];


  const setData = (e)=>{
    console.log(e.target.value)
    const {name,value} = e.target
    setINP((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  }


    const addinpdata = async(e)=>{
      e.preventDefault();

      const {title,author,genre,image,description} = inpval
      const res = await fetch(`https://book-server-7iqt.onrender.com/add`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },body:JSON.stringify({
          title,author,genre,image,description
        })
      })
      const data = await res.json()
      console.log(data)

      if (res.status===422 || !data) {
        alert("error")
        console.log("error")
      } else {
        history('/')
        setUdata(data)
        console.log("data adddeddd")
      }
    }
  // To accept the Book details and UI for the same by inline CSS.
  return (
    <div className="container">
    {/* <NavLink to={"/"}>Home</NavLink> */}
    <form>
      <div className="row">
      
      <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputPassword1" className="form-label">
          Book Name
        </label>
        <input
          value={inpval.title}
          onChange={setData}
          name="title"
          type="text"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputEmail1" className="form-label">
        Author Name
        </label>
        <input
         value={inpval.author}
         onChange={setData}
          name="author"
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputPassword1" className="form-label">
          Genre
        </label>
        <select
            value={inpval.genre}
            name='genre'
            onChange={setData}
            style={{ marginLeft: '8px', padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        {/* <input
         value={inpval.genre}
         onChange={setData}
        name="genre"
          type="text"
          className="form-control"
          id="exampleInputPassword1"
        /> */}
      </div>
      <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label for="exampleInputPassword1" className="form-label">
          Image URL
        </label>
        <input
         value={inpval.image}
         onChange={setData}
        name="image"
          type="text"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3 col-lg-12 col-md-12 col-12">
        <label for="exampleInputPassword1" className="form-label">
          Description
        </label>
        <textarea  value={inpval.description} onChange={setData} name="description" className="form-control" cols={30} rows={5}></textarea>
      </div>
      <button onClick={addinpdata} type="submit" className="btn btn-primary">
        Submit
      </button>
      </div>
    </form>
  </div>
  );
};

export default AddBookForm;
