import { starRatingColor } from "src/Utils/gamyfication";
import StarRatings from "react-star-ratings";
const Rating = ({individualRating}) => {
  return (
    <StarRatings
        starDimension='15px'
        starSpacing='5px'
        rating={individualRating || 0}
        starRatedColor={starRatingColor(individualRating || 0)}
        starEmptyColor='#ffffff33'
      />
  )
}

export default Rating