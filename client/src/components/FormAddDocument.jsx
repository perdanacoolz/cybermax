import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddDocument = () => {
  const [description, setDescription] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [fileurl, setFileurl] = useState("");
   const [version, setVersion] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveDocumen = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/documents", {
        description: description,
        documentType: documentType,
         fileurl: fileurl,
        version: version,
         status: status});
      navigate("/documents");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">documents</h1>
      <h2 className="subtitle">Add New document</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveDocumen}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">description</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="description"
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
                    placeholder="tipe document"
                  />
                </div>
              </div>

               <div className="field">
                <label className="label">file url</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={fileurl}
                    onChange={(e) => setFileurl(e.target.value)}
                    placeholder="file url"
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
                    Save
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

export default FormAddDocument;
