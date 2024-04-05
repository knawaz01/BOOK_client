import React, { useEffect,useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CreateIcon from '@mui/icons-material/Create'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Link } from 'react-router-dom';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewBook = () => {
  const {id}= useParams('')
  console.log(id)
  const [getbookdata, setBookdata] = useState([]);
  console.log(getbookdata)
  const history = useNavigate();
  
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
        setBookdata(data);
        console.log('Data fetched successfully');
        console.log(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])
 
  const deletebook = async (id) => {
    const res2 = await fetch(`/deletebook/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      console.log('error');
    } else {
      console.log('Book deleted');
      history('/')
    }
  };
  return (
    <div className='container mt-3'>
      <h1 style={{fontWeight: "400"}}>{getbookdata.title}</h1>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div className='d-flex justify-content-around' style={{flexWrap:"wrap"}}>
        <div className='left-view'>
        <img style={{objectFit:"cover",width:"100%"}} src={getbookdata.image} alt='image'/>
        </div>
        <div className='right-view'>
        <h3 className='mt-3'>Book Name: <span style={{fontWeight:"400"}}>{getbookdata.title}</span></h3>
        <h3 className='mt-3'>Author: <span style={{fontWeight:"400"}}>{getbookdata.author}</span></h3>
        <h3 className='mt-3'>Genre: <span style={{fontWeight:"400"}}>{getbookdata.genre}</span></h3>
        <p className='mt-3' style={{fontWeight:"bold"}}>Description: <span style={{fontWeight:"400"}}>{getbookdata.description} </span></p>
        <Link to={`/update/${getbookdata._id}`}><button className='btn btn-primary mx-2'><CreateIcon/></button></Link>
        <button className='btn btn-danger' onClick={() => deletebook(getbookdata._id)}><DeleteOutlineIcon/></button>
        </div>
        </div>
        
        
      </CardContent>
      </Card>
    </div>
  )
}

export default ViewBook
