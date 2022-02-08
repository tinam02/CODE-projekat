import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function ImagePage() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "uploads", params.imageID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, []);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <div>
      <h1>Image</h1>
      <p>{listing.description}</p>
    </div>
  );
}

export default ImagePage;