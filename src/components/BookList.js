import React, { useState, useEffect,useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CreateIcon from "@mui/icons-material/Create";
import RemovRedEye from "@mui/icons-material/RemoveRedEye";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { adddata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";
import { deletedata } from "./context/ContextProvider";
import { Link } from "react-router-dom";
import "./BookList.css";

const BookList = () => {
  const [getbookdata, setBookdata] = useState([]);

   const { udata, setUdata } = useContext(adddata)
  const {updata,setUpdata} = useContext(updatedata)
  const {dltdata,setDLTdata} = useContext(deletedata)

  const fetchData = async () => {
    try {
      const res = await fetch(`/getdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 404 || !data) {
        console.log("No data found");
      } else {
        setBookdata(data);
        console.log("Data fetched successfully");
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletebook = async (id) => {
    const res2 = await fetch(`/deletebook/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("Book deleted");
      setDLTdata(deletedata)
      fetchData();
    }
  };

  return (
    <>
      {
        udata ?
        <>
          
            <div class="alert alert-success alert-dismissible fade show" style={{margin:"20px"}} role="alert">
              <strong>{udata.title}</strong> added successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> 
            </>: ""
      }
      {
        updata ?
        <>
          
            <div class="alert alert-success alert-dismissible fade show" style={{margin:"20px"}} role="alert">
              <strong>{updata.title}</strong> update successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> 
            </>: ""
      }
      {
        dltdata ?
        <>
          
            <div class="alert alert-warning alert-dismissible fade show" style={{margin:"20px"}} role="alert">
              <strong>{dltdata.title}</strong> Deleted successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> 
            </>: ""
      }

      <h1 style={{ fontWeight: "400", color: "white", textAlign: "center" }}>
        BOOK LIST
      </h1>
      <div
        className="container mt-3 d-flex justify-content-center"
        style={{ flexWrap: "wrap" }}
      >
        {getbookdata.map((book) => (
          <Card
            key={book._id}
            sx={{ minWidth: 275 }}
            style={{ width: "30%", margin: "10px" }}
          >
            <CardContent>
              <div
                className="d-flex justify-content-around m-10"
                style={{ flexWrap: "wrap" }}
              >
                <div className="left-view">
                  <img
                    src={book.image}
                    alt="Book Cover"
                    style={{ width: "220px" }}
                  />
                </div>
                <div className="right-view" style={{ maxWidth: "350px" }}>
                  <h3 className="mt-3">
                    Book Name:{" "}
                    <span style={{ fontWeight: "400" }}>
                      {book.title.slice(0, 7)}...
                    </span>
                  </h3>
                  <h3 className="mt-3">
                    Author:{" "}
                    <span style={{ fontWeight: "400" }}>{book.author}</span>
                  </h3>
                  <h3 className="mt-3">
                    Genre:{" "}
                    <span style={{ fontWeight: "400" }}>{book.genre}</span>
                  </h3>
                  <p className="mt-3" style={{ fontWeight: "bold" }}>
                    Description:{" "}
                    <span style={{ fontWeight: "400" }}>
                      {book.description.slice(0, 20)}...
                    </span>
                  </p>
                  <div style={{ textAlign: "center" }}>
                    <Link to={`/view/${book._id}`}>
                      <button className="btn btn-success mx-2">
                        <RemovRedEye />
                      </button>
                    </Link>
                    <Link to={`/update/${book._id}`}>
                      <button className="btn btn-primary mx-2">
                        <CreateIcon />
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletebook(book._id)}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </>
  );
};

export default BookList;
