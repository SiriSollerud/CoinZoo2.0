import React from "react";
import { animals } from "./AnimalNames";
import { bannedCoins } from "./BannedCoins";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

//TODO:change to bannedCoins instead and have full coin name?

function containsBannedWords(coin) {
  for (var i = 0; i !== bannedCoins.length; i++) {
    if (coin.includes(bannedCoins[i])) {
      return true;
    }
  }
  return false;
}

function checkAnimalName(coin) {
  for (var i = 0; i !== animals.length; i++) {
    if (coin.includes(animals[i]) && !containsBannedWords(coin)) {
      return true;
    }
  }
  return false;
}

function set24hChangeColor(priceChange) {
  if (priceChange == null) {
    priceChange = "0";
  } else if (priceChange < 0) {
    priceChange = <span className="red">{priceChange.toFixed(2)}%</span>;
  } else if (priceChange > 0) {
    priceChange = <span className="green">{priceChange.toFixed(2)}%</span>;
  }
  return priceChange;
}

const CoinItem = (props) => {
  let coinName = props.coins.name.toLowerCase();
  let checkAnimal = checkAnimalName(coinName);
  let change = set24hChangeColor(props.coins.price_change_percentage_24h);

  if (checkAnimal && props != null)
    return (
      <tr>
        <td className="rank">
          <p className="text-white-600 whitespace-no-wrap">
            <p>{props.coins.market_cap_rank}</p>
          </p>
        </td>
        <td className="px-5 py-5 border-b  border-gray-200 bg-transparent text-sm">
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src={props.coins.image}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-white-900 whitespace-no-wrap">
                {props.coins.name}
              </p>
              <p className="text-white-600 whitespace-no-wrap">
                {props.coins.symbol.toUpperCase()}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b text-center border-gray-200 bg-transparent text-sm">
          <p className="text-white-900 whitespace-no-wrap">
            ${props.coins.current_price.toLocaleString()}
          </p>
        </td>
        <td className="px-5 py-5 border-b text-center border-gray-200 bg-transparent text-sm">
          <p className="text-white-600 whitespace-no-wrap">{change}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
          <p className="text-white-600 whitespace-no-wrap">
            ${props.coins.total_volume.toLocaleString()}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
          <p className="text-white-600 whitespace-no-wrap">
            ${props.coins.market_cap.toLocaleString()}
          </p>
        </td>
      </tr>
    );
};

export default CoinItem;
