import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
// components
import Popover from "../../../../components/Popover";

interface IProps {
  userID: string;
  productName: string;
  productBrand: string;
  reference: string;
}

const BottomComponents = ({
  userID,
  productName,
  productBrand,
  reference,
}: IProps) => {
  const [openHelper, setOpenHelper] = useState<any>(null);
  const history = useHistory();
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        {userID && (
          <Typography style={{ paddingLeft: "10px", color: "#ffffff66" }}>
            Submited by {userID}
          </Typography>
        )}
      </Grid>
      <Grid item>
        <Typography
          onMouseOver={(e) => {
            setOpenHelper(e.currentTarget);
          }}
          onMouseOut={() => {
            setOpenHelper(null);
          }}
          onClick={() => {
            history.push({
              pathname: "/submitfeedback",
              state: {
                message: `I found there is something incorrect with the ${productBrand} ${productName} ${reference}, the following should be fixed:`,
              },
            });
          }}
          style={{
            paddingLeft: "10px",
            color: "#ffffff66",
            cursor: "pointer",
          }}
        >
          Report
        </Typography>
      </Grid>
      <Popover
        message="If something is not correct, please let us know!"
        anchor={openHelper}
        setAnchor={setOpenHelper}
      />
    </Grid>
  );
};

export default BottomComponents;
