import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, query, getDocs } from "firebase/firestore";
//TODO image card za slike



function AllUploads() {
    const [loading, setLoading] = useState(true);
    const [uploads, setUploads] = useState(null);
  
    //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    useEffect(() => {
      const fetchUploads = async () => {
        const q = query(collection(db, "uploads"));
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
        renderedUploads = "Nothing has been uploaded yet!";
      } else {
        renderedUploads = (
          <>
            {uploads.map((file) => (
              <div>
                <p>Title: {file.data.name}</p>
                <img src={file.data.imageURL[0]} alt="" />
              </div>
            ))}
          </>
        );
      }
    }
  
    return (
      <div>
        <h1>All uploads</h1>
        {loading ? <h1>Loading</h1> : renderedUploads}
      </div>
    );
}

export default AllUploads;
