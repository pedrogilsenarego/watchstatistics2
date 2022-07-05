import Carrousell from "src/components/Carrousell"

const Sugested2Market = () => {
  const data = [[{ image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", main: "teste" }, 1], [1, 2], [1, 3]]
  return (
    <><Carrousell title="On the Market" data={data} /></>
  )
}

export default Sugested2Market