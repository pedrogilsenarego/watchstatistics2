import Carrousell from "src/components/Carrousell"
import useSugestedvote from "./useSugestedVote"


const SugestedVote = () => {
  const { data } = useSugestedvote()
  return (
    <><Carrousell title="Sugested for you to vote" data={data} /></>
  )
};

export default SugestedVote;
