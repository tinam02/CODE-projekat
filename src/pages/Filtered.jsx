import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import Masonry from "react-masonry-css";
import Loading from "../components/Loading";

// todo  update this code

function Filtered() {
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
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
      // console.log(uploads);
      setLoading(false);
    };
    fetchUploads();
  }, []);
  //!!   DEPENDENCY ARRAY ZA INF LOOP
  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1100: 3,
    719: 2,
    560: 1,
  };
  const fetchFilter = async () => {
    const docRef = doc(db, "uploads", this);
    const querySnapshot = await getDoc(docRef);
    console.log(querySnapshot.data());
  };

  let renderedUploads = "";
  if (uploads) {
    if (!(uploads.length > 0)) {
      renderedUploads = `No uploads tagged with ${params.filteredBy}`;
    } else {
      renderedUploads = uploads.map((file) => (
        <img onClick={fetchFilter} src={file.data.imageURL[0]} />
      ));
    }
  }

  return (
    <div>
      <h1>#{params.filteredBy}</h1>

      {loading ? (
      <Loading/>
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

export default Filtered;
