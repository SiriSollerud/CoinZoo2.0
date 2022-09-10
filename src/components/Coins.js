import React from "react";
import CoinItem from "./CoinItem";


const Coins = (props) => {
  return (
    <tbody>
      {props.coins.map((coins) => {
        return <CoinItem coins={coins} key={coins.id} />;
      })}
    </tbody>
  );
};

export default Coins;
