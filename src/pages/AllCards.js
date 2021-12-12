import React, { useState, useEffect } from "react";
import { setCard, selectCard } from "../features/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import SingleCard from "../components/SingleCard";
import "../styles/SingleCard.css";

import Loader from "react-js-loader";
import States from "../components/States";
import Blobs from "../components/Blobs";
const AllCards = () => {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const myCards = useSelector(selectCard);
  //CHANGE WISH STATE
  // const wishHandler = async (item) => {
  //   const res = await fetch(`http://localhost:5000/allcards/${item._id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "x-auth-token": localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ isWishList: item.isWishList }),
  //   });
  //   const data = await res.json();
  // dispatch(
  //   changeWishState({
  //     elementId: item._id,
  //   })
  // );
  //   console.log(item._id, myWishCards);
  //   console.log(myCards);
  // };
  //USE EFFECT TO LOAD ALL DATA CARDS
  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      const result = await fetch("http://localhost:5000/allcards/", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      dispatch(
        setCard({
          cards: data,
        })
      );
      setloading(false);

      console.log(data);
      console.log(65);
    };
    fetchData();
  }, [dispatch]);
  if (loading)
    return (
      <Loader
        type="bubble-loop"
        bgColor={"#c33764"}
        color={"#c33764"}
        size={50}
      />
    );

  return (
    <div className="allcard_container">
      <States />
      <Blobs blobClass={"blobs_one"} />
      <Blobs blobClass={"blobs_two"} />
      <div className="allcard_container_inner">
        {myCards.length > 0 ? (
          myCards.map((item) => {
            return <SingleCard item={item} key={item._id} />;
          })
        ) : (
          <h3>No Card yet!</h3>
        )}
      </div>
    </div>
  );
};

export default AllCards;
