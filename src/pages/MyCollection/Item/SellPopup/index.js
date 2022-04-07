import React from "react";

import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Form, Formik } from "formik";
import TextField from "../../../../containers/forms/InputMUI";
import ButtonMUI from "../../../../containers/forms/ButtonMUI";
import * as Yup from "yup";

const INITIAL_FORM_STATE = {
  price: "0",
};
const FORM_VALIDATION = Yup.object().shape({
  price: Yup.number().required("Required"),
});

const SellPopup = ({
  openSellWatchPopup,
  watch,
  handleWatch4SellConfirm,
  setOpenSellWatchPopup,
}) => {
  return (
    <div>
      <Dialog open={openSellWatchPopup} style={{ color: "black" }}>
        <DialogTitle>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h6" component="div" style={{ color: "black" }}>
              "Sell this watch"
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              handleWatch4SellConfirm(values);
            }}
          >
            <Form>
              <Typography style={{ color: "black" }}>
                You are puting: {watch} to market, this is not reversible.
              </Typography>
              <TextField type="number" name="price" placeholder="0"></TextField>
              <ButtonGroup>
                <ButtonMUI>Accept</ButtonMUI>
                <Button
                  onClick={() => {
                    setOpenSellWatchPopup(false);
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellPopup;
