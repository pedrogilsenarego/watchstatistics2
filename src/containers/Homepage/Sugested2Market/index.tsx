import Carrousell from "src/components/Carrousell"
import useSugested2Market from "./useSugested2Market"



const Sugested2Market = () => {
  const { data } = useSugested2Market()
  return (
    <><Carrousell title="On the Market" data={data} /></>
  )
}

export default Sugested2Market