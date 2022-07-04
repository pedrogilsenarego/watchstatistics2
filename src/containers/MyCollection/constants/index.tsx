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

export const topHeaderRightEntries = (
  collectionField: string
) => [collection(collectionField)];