import { useState } from "react";
import {Grid} from "@mui/material"
import { MdAddCircle } from "react-icons/md";
import Popover from "src/components/Popover";


const CustomAddCircle = ({value, name, handleSubmitDetails, submitDetails}) => {
  const [anchorPopover, setAnchorPopover] = useState(null);

  const handleClick = () => {
    handleSubmitDetails(name)
    setAnchorPopover(null);
  }

  return (
    <>
    {!submitDetails[name] && ( <Grid container alignItems='center' justifyContent='flex-end'>
          <MdAddCircle
            onMouseOver={(e) => {
              setAnchorPopover(e.currentTarget);
            }}
            onMouseOut={() => {
              setAnchorPopover(null);
            }}
            style={{ cursor: "pointer" }}
            size='1.8em'
            color='orange'
            onClick={handleClick
              
            }
          />
          <Popover
            anchor={anchorPopover}
            setAnchor={setAnchorPopover}
            message={
              value !== 1 ? `Win ${value} points` : `Win ${value} point`
            }
          />
        </Grid> )}
         
    </>
  );
};

export default CustomAddCircle