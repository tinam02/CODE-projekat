import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, query, getDocs,orderBy } from "firebase/firestore";
import Masonry from "react-masonry-css";

function AllUploads() {
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);

  //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  useEffect(() => {
    const fetchUploads = async () => {
      const q = query(collection(db, "uploads"),orderBy("timestamp"));
      const uploads = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        uploads.unshift({ id: doc.id, data: doc.data() });
      });
      setUploads(uploads);
      console.log(uploads);
      setLoading(false);
    };
    fetchUploads();
  }, []);
  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1100: 3,
    719: 2,
    560: 1,
  };
  let renderedUploads = "";

  if (uploads) {
    if (!(uploads.length > 0)) {
      renderedUploads = "Nothing has been uploaded yet!";
    } else {
      renderedUploads = uploads.map((file) => (
        <img src={file.data.imageURL[0]} alt={file.data.description} key={file.data.imageURL[0]}/>
      ));
    }
  }

  return (
    <div>
      <h1>Explore</h1>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {renderedUploads}
        </Masonry>
      )}
    </div>
  );
}

export default AllUploads;
