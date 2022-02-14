import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import Masonry from "react-masonry-css";

function AllUploads() {
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const [lastUpload, setLastUpload] = useState(null);

  //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  useEffect(() => {
    fetchUploads();
  }, []);
  const fetchUploads = async () => {
    const q = query(
      collection(db, "uploads"),
      orderBy("timestamp", "desc"),
      limit(30)
    );
    const uploads = [];
    const querySnapshot = await getDocs(q);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastUpload(lastVisible);

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      uploads.push({ id: doc.id, data: doc.data() });
    });
    setUploads(uploads);
    setLoading(false);
  };
  //pagination
  const loadMore = async () => {
    const q = query(
      collection(db, "uploads"),
      orderBy("timestamp", "desc"),
      limit(10),
      startAfter(lastUpload)
    );
    const uploads = [];
    const querySnapshot = await getDocs(q);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastUpload(lastVisible);

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      uploads.push({ id: doc.id, data: doc.data() });
    });
    setUploads((prevstate) => [...prevstate, ...uploads]);
    setLoading(false);
  };

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
        <img
          onClick={() => {
            console.log(new Date(file.data.timestamp.seconds * 1000));
          }}
          src={file.data.imageURL[0]}
          alt={file.data.description}
          key={file.data.imageURL[0]}
        />
      ));
    }
  }

  return (
    <main>
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
  
      {lastUpload && <button onClick={loadMore}> Load more</button>}
    </main>
  );
}

export default AllUploads;
