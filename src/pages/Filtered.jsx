import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//  ":" posle / u Route!!
//useparams jer switch ne radi u ovoj verziji reacta
import { db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
//TODO image card za slike

function Filtered() {
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchUploads = async () => {
      const q = query(
        collection(db, "uploads"),
        where("type", "==", params.filteredBy)
      );
      let uploads = [];
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        return uploads.unshift({ id: doc.id, data: doc.data() });
      });
      setUploads(uploads);
      console.log(uploads);
      setLoading(false);
    };
    fetchUploads();
  }, []);
  //!!   DEPENDENCY ARRAY ZA INF LOOP

  let renderedUploads = "";
  if (uploads) {
    if (!(uploads.length > 0)) {
      renderedUploads = `No uploads tagged with ${params.filteredBy}`;
    } else {
      const fileObj = (file) => (
        <div>
          {/* vraca objekat za svaki fajl */}
          {console.log(file)}
          <p>Title: {file.data.name}</p>
          <img src={file.data.imageURL[0]} alt="" />
        </div>
      );

      renderedUploads = <>{uploads.map(fileObj)}</>;
    }
  }

  return (
    <div>
      <h1>Filtered</h1>
      <p>-----PARAMETAR OVDE ---------------</p>
      {loading ? <h1>Loading</h1> : renderedUploads}
    </div>
  );
}

export default Filtered;
