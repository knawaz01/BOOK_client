// // client/src/components/UpdateBookForm.js
import React, { useState,useContext } from 'react';
import {useParams,useNavigate} from 'react-router-dom'
import { updatedata } from './context/ContextProvider';

const UpdateBookForm = () => {
  const {updata,setUpdata} = useContext(updatedata)

  const history = useNavigate();
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

  const {id}= useParams('')
  console.log(id)
  const fetchData = async () => {
    
    try {
      const res = await fetch(`/getbook/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.status === 404 || !data) {
        console.log('No data found');
      } else {
        setINP(data);
        console.log('Data fetched successfully');
        console.log(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  

  useState(()=>{
    fetchData()
  },[])

  const updatebook = async(e)=>{
    e.preventDefault()
    const {title,author,genre,image,description} = inpval
    const res2 = await fetch(`/updatebook/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        title,author,genre,image,description
      })
    })
    const data2 = await res2.json()
    console.log(data2)
    if (res2.status===422 || !data2) {
      alert("fill tha data")
    } else {
      history('/')
      setUpdata(data2)
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
        placeholder='if url not entered then the image will not updated'
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
      <button onClick={updatebook} type="submit" className="btn btn-primary">
        Submit
      </button>
      </div>
    </form>
  </div>





    // <div style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto',height:'79vh' }}>
    //   <h1 style={{ color: 'white',marginTop:"20px",fontWeight:"bold",fontSize:"50px" }}>Add New Book</h1>
    //   <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',padding:"20px" }}>
    //     <label style={{ margin: '8px', textAlign: 'left', width: '100%' }}>
    //       <h4 style={{ color: "white" }}>Title :</h4>
    //       <input
    //         type="text"
    //         name='title'
    //         value={inpval.title}
    //         onChange={setData}
    //         style={{ marginLeft: '8px', padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
    //       />
    //     </label>
    //     <label style={{ margin: '8px', textAlign: 'left', width: '100%' }}>
    //     <h4 style={{ color: "white" }}>Author :</h4>
    //       <input
    //         type="text"
    //         name='author'
    //         value={inpval.author}
    //         onChange={setData}
    //         style={{ marginLeft: '8px', padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
    //       />
    //     </label>
    //     <label style={{ margin: '8px', textAlign: 'left', width: '100%' }}>
    //     <h4 style={{ color: "white" }}>Genre :</h4>
    //       <select
    //         value={inpval.genre}
    //         name='genre'
    //         onChange={setData}
    //         style={{ marginLeft: '8px', padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
    //       >
    //         {genres.map((genre) => (
    //           <option key={genre} value={genre}>
    //             {genre}
    //           </option>
    //         ))}
    //       </select>
    //     </label>
    //     <label style={{ margin: '8px', textAlign: 'left', width: '100%' }}>
    //     <h4 style={{ color: "white" }}>Image URL :</h4>
    //       <input
    //         type="text"
    //         name='image'
    //         value={inpval.image}
    //         onChange={setData}
    //         style={{ marginLeft: '8px', padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
    //       />
    //     <h4 style={{ color: "white" }}>Description :</h4>
    //       <input
    //         type="text"
    //         name='description'
    //         value={inpval.description}
    //         onChange={setData}
    //         style={{ marginLeft: '8px', padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
    //       />
    //     </label>
    //     <button
    //       type="submit"
    //       // onClick={addinpdata}
    //       style={{
    //         backgroundColor: '#2ecc71',
    //         color: '#fff',
    //         padding: '12px 24px',
    //         border: 'none',
    //         borderRadius: '4px',
    //         cursor: 'pointer',
    //         marginTop: '16px',
    //         fontWeight: 'bold',
    //       }}
    //     >
    //       Add Book
    //     </button>
    //   </form>
    // </div>
  );
};

export default UpdateBookForm;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UpdateBookForm = ({ bookId, onClose, onUpdate }) => {
//   const navigate = useNavigate();
//   const [updatedBook, setUpdatedBook] = useState({
//     title: '',
//     author: '',
//     genre: '',
//     image: '',
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/books/${bookId}`);
//         setUpdatedBook(response.data);
//       } catch (error) {
//         console.error('Error fetching book details:', error);
//       }
//     };

//     fetchBookDetails();
//   }, [bookId]);

//   const handleUpdate = async () => {
//     setLoading(true);

//     // Handling the update of the book details.
//     try {
//       await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/books/${bookId}`, updatedBook);
//       onUpdate();
//       navigate('/');
//     } catch (error) {
//       console.error('Error updating book:', error);
//     } finally {
//       setLoading(false);
//       // Reset the updatedBook state to empty values
//       setUpdatedBook({
//         title: '',
//         author: '',
//         genre: '',
//         image: '',
//       });
//     }
//   };

//   return (
//     <div className="update-form" style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto' }}>
//       <h1 style={{ color: 'purple' }}>Update Book</h1>
//       <label style={{ margin: '8px', textAlign: 'left', width: '93%' }}>
//         Title:
//         <input
//           type="text"
//           value={updatedBook.title}
//           onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}
//           style={{ marginLeft: '8px', padding: '8px', width: '93%', borderRadius: '4px', border: '1px solid #ccc' }}
//         />
//       </label>
//       <label style={{ margin: '8px', textAlign: 'left', width: '93%' }}>
//         Author:
//         <input
//           type="text"
//           value={updatedBook.author}
//           onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
//           style={{ marginLeft: '8px', padding: '8px', width: '93%', borderRadius: '4px', border: '1px solid #ccc' }}
//         />
//       </label>
//       <label style={{ margin: '8px', textAlign: 'left', width: '93%' }}>
//         Genre:
//         <input
//           type="text"
//           value={updatedBook.genre}
//           onChange={(e) => setUpdatedBook({ ...updatedBook, genre: e.target.value })}
//           style={{ marginLeft: '8px', padding: '8px', width: '93%', borderRadius: '4px', border: '1px solid #ccc' }}
//         />
//       </label>
//       <label style={{ margin: '8px', textAlign: 'left', width: '93%' }}>
//         Image URL:
//         <input
//           type="text"
//           value={updatedBook.image}
//           onChange={(e) => setUpdatedBook({ ...updatedBook, image: e.target.value })}
//           style={{ marginLeft: '8px', padding: '8px', width: '93%', borderRadius: '4px', border: '1px solid #ccc' }}
//         />
//       </label>
//       {loading ? (
//         <p style={{ margin: '16px', color: '#2ecc71' }}>Updating book...</p>
//       ) : (
//         <div style={{ marginTop: '16px' }}>
//           <button
//             onClick={handleUpdate}
//             style={{
//               backgroundColor: '#2ecc71',
//               color: '#fff',
//               padding: '12px 24px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               marginRight: '8px',
//               fontWeight: 'bold',
//             }}
//           >
//             Update
//           </button>
//           <button
//             onClick={onClose}
//             style={{
//               backgroundColor: '#e74c3c',
//               color: '#fff',
//               padding: '12px 24px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateBookForm;
