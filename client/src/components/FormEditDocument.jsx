import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditDocument = () => {
const [description, setDescription] = useState("");
const [documentType, setDocumentType] = useState("");
const [fileurl, setFileurl] = useState("");
const [version, setVersion] = useState("");
const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDocumentById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/documents/${id}`
        );
        setDescription(response.data.description);
        setDocumentType(response.data.documentType);
        setFileurl(response.data.fileurl);
        setVersion(response.data.version);
        setStatus(response.data.status);
         
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getDocumentById();
  }, [id]);

  const updateDocument = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/documents/${id}`, {
        name: name,
        price: price,
        name: name,
        price: price,
        price: price,
      });
      navigate("/documents");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">document</h1>
      <h2 className="subtitle">Edit document</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateDocument}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditDocument;
