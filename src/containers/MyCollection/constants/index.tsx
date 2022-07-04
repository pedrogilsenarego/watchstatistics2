import { tabs } from "../types"

export const menuButtons = (setWhichMenu: any) => [
  {
    name: "My Watches",
    onClick: () => setWhichMenu("myWatches"),
  },
  {
    name: "Goodies",
    onClick: () => setWhichMenu("goodies"),
  },

];


const collection = (collection: string) => (
  <>
    <b>Collection: </b>
    {collection}
  </>
);

const watchParts = (parts: string) => (
  <>
    <b>Watch Parts: </b>
    {parts}
  </>
);

export const topHeaderRightEntries = (tab: string,
  collectionField: string, partsField: string
) => {
  switch (tab) {
    case tabs.MY_COLLECTION: return [collection(collectionField)]
    case tabs.GOODIES: return [watchParts(partsField)]
    default: return [collection(collectionField)]
  }
};