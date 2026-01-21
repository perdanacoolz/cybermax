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
        description: description,
        documentType: documentType,
        fileurl: fileurl,
        version: version,
        status: status,
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
                <label className="label">desc</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product description"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">documentType</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    placeholder="documentType"
                  />
                </div>
              </div>
			  
			 
			    <div className="field">
                <label className="label">fileurl</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={fileurl}
                    onChange={(e) => setFileurl(e.target.value)}
                    placeholder="fileurl"
                  />
                </div>
              </div>
			  
			    <div className="field">
                <label className="label">version</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="version"
                  />
                </div>
              </div>
			  
			   <div className="field">
                <label className="label">status</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="status"
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
