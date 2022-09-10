import React from "react";
import axios from "axios";
import Coins from "./components/Coins";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [coins, setCoins] = useState([]);

  // I noticed that the useEffect got called twice, apparently due to the
  // App being wrapped React.Sctrictmode in Index.js.
  // This is a crude solution, but it's simple and works so...
  let strictReactCount = 0;

  // CoinGecko API coins/markets did not inform about max page numbers,
  // nor did it have a next, so I ended up testing how many pages
  // I could get manually until I arrived at 38.
  // Improvement idea: make this automatic and check against error?
  const pages = 38;

  // not really sure how to do multiple API calls elegantly, but this works for now
  const fetchAll = async () => {
    for (let i = 1; i <= pages; i++) {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&page=${i}&per_page=100`
        )
        .then((response) => {
          setCoins((coins) => [...coins, ...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    console.log(strictReactCount);
    if (strictReactCount > 0) {
      fetchAll();
    }
    strictReactCount++;
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 ">
      <div className="py-8">
        <Navbar />
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal ">
              <thead>
                <tr>
                  <th className="sticky top-0 px-5 py-3 border-b-2 border-zinc-600 bg-stone-900 text-center text-xs font-semibold text-stone-100 uppercase tracking-wider">
                    #
                  </th>
                  <th className="sticky top-0 px-5 py-3 border-b-2 border-zinc-600 bg-stone-900 text-center text-xs font-semibold text-stone-100 uppercase tracking-wider">
                    Coin
                  </th>

                  <th className="sticky top-0 px-5 py-3 border-b-2 border-zinc-600 bg-stone-900 text-center text-xs font-semibold text-stone-100 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="sticky top-0 px-5 py-3 border-b-2 border-zinc-600 bg-stone-900 text-center text-xs font-semibold text-stone-100 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="sticky top-0 px-5 py-3 border-b-2 border-zinc-600 bg-stone-900 text-center text-xs font-semibold text-stone-100 uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="sticky top-0px-5 py-3 border-b-2 border-zinc-600 bg-stone-900 text-left text-xs font-semibold text-stone-100 uppercase tracking-wider">
                    Market Cap
                  </th>
                </tr>
              </thead>
              <Coins coins={coins} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
