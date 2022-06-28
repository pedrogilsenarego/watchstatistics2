import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMarketProductsStart } from "src/redux/Market/market.actions";
import { useSelector } from "react-redux";
import { Redux } from "src/redux/types";
import { bagSizeHelper } from "src/Utils/gamyfication";
import { updateCollectionStatus, updateSellerStatus } from "src/redux/User/user.actions";
import { buyMarketProduct } from "src/redux/Market/market.actions";

const mapState = (state: Redux) => ({
  marketData: state.marketData.marketProducts,
  currentUser: state.user.currentUser,
});

const useMarket = () => {
  const dispatch = useDispatch();
  const { marketData, currentUser } = useSelector(mapState);
  const funds = currentUser.points || 0;

  useEffect(() => {
    dispatch(fetchMarketProductsStart({}));
    // eslint-disable-next-line
  }, []);

  const handleBuyItem = (id: number) => {
    if (funds >= marketData[id].price) {
      const newCollection = currentUser?.collection || [];
      const watch = {
        id: marketData[id].id,
        generalState: marketData[id].generalState,
        polishState: marketData[id].polishState,
        movementState: marketData[id].movementState,
      };
      newCollection.push(watch);
      const configUpdateCollection = {
        ...currentUser,
        flag: "buy",
        userID: currentUser.id,
        collection: newCollection,
        points: currentUser.points - marketData[id].price,
      };

      dispatch(updateCollectionStatus(configUpdateCollection));

      const configBuyItem = {
        documentID: marketData[id].documentID,
      };
      dispatch(buyMarketProduct(configBuyItem));

      const newMessage = {
        from: "watchstatistics",
        message: `Congratulation you sold your ${marketData[id].productBrand} ${marketData[id].productName} ${marketData[id].reference}, you added ${marketData[id].price} points to your currency`,
        date: new Date(),
      };

      const configSellerUpdate = {
        userID: marketData[id].UserUID,
        points: marketData[id].price,
        messages: newMessage,
      };
      dispatch(updateSellerStatus(configSellerUpdate));
    }
  };

  const handleAction = (type: string, id: number) => {
    switch (type) {
      case "buy": {
        handleBuyItem(id);
        break;
      }
      default:
        break;
    }
  };

  const bagFull = () => {
    if (
      currentUser?.collection?.length >= bagSizeHelper(currentUser?.experience)
    )
      return true;
    else return false;
  };

  console.log(bagFull());

  return { handleAction, bagFull, funds, marketData, currentUser };
};

export default useMarket;
