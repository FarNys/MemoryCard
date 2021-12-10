import React, { useState, useEffect } from "react";
import { selectWishCard, setCard } from "../features/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import SingleCard from "../components/SingleCard";
import "../styles/SingleCard.css";
import Loader from "react-js-loader";

const Wishlist = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const wishCards = useSelector(selectWishCard);

  // const deleteHandler = async (item) => {
  //   // setdeleteEffect(false);
  //   const res = await fetch(`http://localhost:5000/allcards/${item._id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "x-auth-token": localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   dispatch(
  //     deleteItem({
  //       deleteId: data._id,
  //     })
  //   );
  //   console.log(data, item);
  // };
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
  //   dispatch(
  //     changeWishPage({
  //       elementId: item._id,
  //     })
  //   );
  // };

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

  // const dispatch = useDispatch();

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
      <div className="allcard_container_inner">
        {wishCards.length > 0 ? (
          wishCards.map((item) => {
            return <SingleCard item={item} key={item._id} />;
          })
        ) : (
          <ul>
            <li>
              <h3>No Wish Card</h3>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
