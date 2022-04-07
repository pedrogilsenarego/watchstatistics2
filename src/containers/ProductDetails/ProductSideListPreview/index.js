import React from "react";
import { Typography, Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles((theme) => ({
	table: {
		backgroundColor: "#14587500 !important",
		background: "#14587500 !important",
		paddingTop: "10px",
		marginBottom: "10px"
	},
	tableCell: { fontSize: "18px !important", color: "#ffffffB3 !important" }
}));

// eslint-disable-next-line
const ProductSideListPreview = (product) => {
	const {
		productBrand,
		productCategory,
		productName,
		reference,
		movement,
		caliber,
		productionYears,
		waterResistance,
		caseSize,
		caseMaterial,
		productPriceBrackets
	} = product;
	const classes = useStyles();

	return (
		<div>
			<Box color={"text.secondary"} borderRadius="10px">
				<Typography variant={"h6"} style={{ paddingLeft: "10px" }}>
					Details
				</Typography>
			</Box>
			<TableContainer className={classes.table} component={Paper}>
				<Table size="small" aria-label="simple table">
					<TableBody>
						<TableRow>
							<TableCell className={classes.tableCell}>Category</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{productCategory}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Brand</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{productBrand}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Model</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{productName}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Reference</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{reference}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Movement</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{movement}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Caliber</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{caliber}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Production</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{productionYears}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Case Size</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{caseSize}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Case Material</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{caseMaterial}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Water Res.</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{waterResistance}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.tableCell}>Price</TableCell>
							<TableCell className={classes.tableCell} align="right">
								{productPriceBrackets}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default ProductSideListPreview;
