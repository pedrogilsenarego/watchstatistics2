import { useState } from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import MenuTables from "./MenuTables";
import WatchesCards from "./WatchesCards";
import UsersTable from "./UsersTable";
import WatchesTable from "./WatchesTable";

const Browse = () => {
  const [table, setTable] = useState("watches");
  const [typeTable, setTypeTable] = useState("cards");

  const configMenuTables = {
    table,
    setTable,
    typeTable,
    setTypeTable,
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" disableGutters={isMatch ? true : false}>
      <MenuTables {...configMenuTables} />
      {table === "watches" && typeTable === "cards" && <WatchesCards />}
      {table === "watches" && typeTable === "table" && <WatchesTable />}
      {table === "users" && <UsersTable />}
    </Container>
  );
};

export default Browse;
