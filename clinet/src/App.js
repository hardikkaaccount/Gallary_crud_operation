import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./App.css";


// Main App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<AddGallery />} />
        <Route path="/" element={<GalleryList />} />
        <Route path="/edit/:id" element={<EditGallery />} />
      </Routes>
    </Router>
  );
}

export default App;

function AddGallery() {
  const [gallery, setGallery] = useState({
    gallery_name: "",
    location: "",
    art_type: "",
    exhibition_schedule: "",
    admission_fee: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGallery({ ...gallery, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/post", gallery);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add gallery");
    }
  };

  return (
    <div>
      <Link to="/">Back to Gallery List</Link>
      <h2>Add Gallery</h2>
      <form onSubmit={handleSubmit}>
        <input name="gallery_name" placeholder="Gallery Name" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="art_type" placeholder="Art Type" onChange={handleChange} />
        <input name="exhibition_schedule" placeholder="Exhibition Schedule" onChange={handleChange} />
        <input name="admission_fee" type="number" placeholder="Admission Fee" onChange={handleChange} />
        <button type="submit">Add Gallery</button>
      </form>
    </div>
  );
}


function EditGallery() {
  const { id } = useParams();
  const [gallery, setGallery] = useState({
    gallery_name: "",
    location: "",
    art_type: "",
    exhibition_schedule: "",
    admission_fee: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getbyid/${id}`);
        setGallery(response.data.gallery);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGallery();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGallery({ ...gallery, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/update/${id}`, gallery);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update gallery");
    }
  };

  return (
    <div>
      <Link to="/">Back to Gallery List</Link>
      <h2>Edit Gallery</h2>
      <form onSubmit={handleSubmit}>
        <input name="gallery_name" placeholder="Gallery Name" value={gallery.gallery_name} onChange={handleChange} />
        <input name="location" placeholder="Location" value={gallery.location} onChange={handleChange} />
        <input name="art_type" placeholder="Art Type" value={gallery.art_type} onChange={handleChange} />
        <input name="exhibition_schedule" placeholder="Exhibition Schedule" value={gallery.exhibition_schedule} onChange={handleChange} />
        <input name="admission_fee" type="number" placeholder="Admission Fee" value={gallery.admission_fee} onChange={handleChange} />
        <button type="submit">Update Gallery</button>
      </form>
    </div>
  );
}


function GalleryList() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getall");
        setGalleries(response.data.galleries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGalleries();
  }, []);

  const deleteGallery = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete/${id}`);
      setGalleries(galleries.filter((gallery) => gallery._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete gallery");
    }
  };

  return (
    <div>
      <Link to="/add">Add Gallery</Link>
      <h2>Gallery List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Gallery Name</th>
            <th>Location</th>
            <th>Art Type</th>
            <th>Exhibition Schedule</th>
            <th>Admission Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {galleries.map((gallery, index) => (
            <tr key={gallery._id}>
              <td>{index + 1}</td>
              <td>{gallery.gallery_name}</td>
              <td>{gallery.location}</td>
              <td>{gallery.art_type}</td>
              <td>{gallery.exhibition_schedule}</td>
              <td>{gallery.admission_fee}</td>
              <td>
                <Link to={`/edit/${gallery._id}`}>Edit</Link>
                <button onClick={() => deleteGallery(gallery._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

