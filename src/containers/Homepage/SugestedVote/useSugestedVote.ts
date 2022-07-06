import { useMemo } from "react";
import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLatestProductsStart } from "src/redux/Products/products.actions";
import { createGroups } from "src/Utils/math";

const TILES_SHOW = 4;

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
  products: state.productsData.latestProducts.data,
});

const useSugestedVote = () => {
  const { products, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLatestProductsStart({ pageSize: 12 }));
    // eslint-disable-next-line
  }, []);

  const filteredData = useMemo(
    () => {
      if (!currentUser?.userVotes || !products) return [];
      else {
        const newData = [];
        for (let i = 0; i < products.length; i++) {
          if (!currentUser.userVotes.includes(products[i].documentID)) {
            newData.push(products[i]);
          }
        }
        return newData;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


  const mapItem = (p: any, pos: number) => {
    return {
      id: pos,
      image: p.productThumbnail[0],
      main: p.productBrand + " " + p.productName + " " + p.reference,
      second:
        "Votes: " +
        (p.numberVotesNotOwn || 0 + p.numberVotesOwn || 0) +
        " . Score: " +
        p.avgTotal || 0,
      third: p.userID,
      documentID: p.documentID
    };
  };

  const data2 = filteredData.map((p, pos) => mapItem(p, pos));

  const data = createGroups(
    data2,
    Math.ceil(filteredData.length / TILES_SHOW),
    TILES_SHOW
  );

  console.log(data)

  return { data };
};

export default useSugestedVote;
