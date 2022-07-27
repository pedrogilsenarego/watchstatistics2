import { useSelector } from "react-redux"
import { Redux } from "src/redux/types"
import { Grid } from "@mui/material"
import { RiCloseFill } from "react-icons/ri";

interface Props {
  setOpenDrawer: (openDrawer: boolean) => void;
}

const FusionDrawer = ({ setOpenDrawer }: Props) => {
  const watchParts = useSelector<Redux, string[] | []>(
    (state) => state.user.currentUser.watchParts
  );


  const arrangeFusion = () => {
    const oldArray = [...watchParts]
    const newArray = Array(9) as any


    for (let i = 0; i < oldArray.length; i++) {

      const checkIfExist = () => {
        if (newArray[Array.from(oldArray[i])[0]]) {
          if (!newArray[Array.from(oldArray[i])[0]].includes(oldArray[i])) return [...newArray[Array.from(oldArray[i])[0]], oldArray[i]]
          else return [...newArray[Array.from(oldArray[i])[0]]]
        }
        return [oldArray[i]]
      }

      newArray.splice(Array.from(oldArray[i])[0], 1, checkIfExist())
    }

    return newArray
  }

  console.log(arrangeFusion())

  return (
    <>
      <Grid container>
        <Grid
          container
          justifyContent='space-between'
          style={{
            marginTop: "-10px",
            position: "fixed",
            zIndex: 20,
            backgroundColor: "#18161E",
            paddingBottom: "10px",
            paddingTop: "10px"
          }}
        >
          <Grid item xs={4}>
            <RiCloseFill
              onClick={() => setOpenDrawer(false)}
              size='2.5em'
              color='lightGrey'
            />
          </Grid>
        </Grid>

      </Grid>
    </>
  )
}

export default FusionDrawer 