import React, { useState, useEffect, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import Case from "../../../assets/Case.svg";
import Bracelet from "../../../assets/Bracelet.svg";
import Movement from "../../../assets/Movement.svg";
import Crown from "../../../assets/Crown.svg";
import Glass from "../../../assets/Glass.svg";
import { useSelector } from "react-redux";
import Watch from "../WatchSolid";
import {
	Grid,
	Typography,
	Box,
	Paper,
	Button,
	CardMedia
} from "@material-ui/core";
import LinearProgress, {
	linearProgressClasses
} from "@mui/material/LinearProgress";
import { fetchRandomProduct } from "../../../redux/Products/products.actions";
import { styled } from "@mui/material/styles";
import Popup from "../../controls/Popup";
import BoosterSelection from "./BoosterSelection";
import { percentageLoot, getRandomPart } from "../helpers";
import { updateBoxStatus } from "../../../redux/User/user.actions";

const mapState = (state) => ({
	randomProduct: state.productsData.randomNewProduct,
	currentUser: state.user.currentUser,
	cartBoosters: state.cartData.cartBoosters
});

const WatchParts = ({ data, collectionFull, setBagFull, setWatchCase }) => {
	const dispatch = useDispatch();
	const [list, setList] = useState(data);

	const [dragging, setDragging] = useState(false);
	const [fusionGlass, setFusionGlass] = useState(false);
	const [fusionCrown, setFusionCrown] = useState(false);
	const [fusionMovement, setFusionMovement] = useState(false);
	const [fusionBracelet, setFusionBracelet] = useState(false);
	const [fusionCase, setFusionCase] = useState(false);
	const [fusionMatchParts, setFusionMatchParts] = useState(true);
	const [fusionPrice, setFusionPrice] = useState("");
	const [ready, setReady] = useState(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
	const [boostStatus, setBoostStatus] = useState("false");
	const [openPopupNewWatch, setOpenPopupNewWatch] = useState(false);
	const { randomProduct, currentUser, cartBoosters } = useSelector(mapState);

	const [numberBoosters, setNumberBoosters] = useState(0);

	const itemsBagDeleted = (pos) => {
		var a = currentUser.watchParts;
		for (var i = 0; i < pos.length; i++) {
			a.splice(a.indexOf(pos[i]), 1);
		}
		return a;
	};

	const handleDeleteWatchParts = (pos, color, percentage, color2) => {
		const a = itemsBagDeleted(pos);

		if (percentage && color && percentageLoot(percentage) === 1) {
			const b = getRandomPart(color);
			a.push(b);
		} else {
			if (color2 && color2 !== "black") {
				const b = getRandomPart(color2);
				a.push(b);
			}
		}

		const configData = {
			...currentUser,
			flag: "deleteWatchPart",
			watchParts: a,
			userID: currentUser.id
		};
		dispatch(updateBoxStatus(configData));
		setBagFull(false);
	};

	const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
		height: 20,
		width: 100,
		borderRadius: 5,
		[`&.${linearProgressClasses.colorPrimary}`]: {
			backgroundColor: LinearProgressBarColor2(shredderMeter(list[2].items))
		},
		[`& .${linearProgressClasses.bar}`]: {
			borderRadius: 5,
			backgroundColor: LinearProgressBarColor(shredderMeter(list[2].items))
		}
	}));

	const shredderMeter = (data) => {
		var a = 0;
		for (var i = 0; i < data.length; i++) {
			a = a + 1 + parseInt(data[i][0]);
		}
		return a;
	};
	const LinearProgressBarFormat = (value) => {
		if (value < 2) return value * 50;
		if (value < 4) return (value - 1) * 20;
		if (value < 7) return (value - 3) * 34;
		if (value < 10) return (value - 6) * 34;
		if (value < 14) return (value - 9) * 25;
		if (value < 18) return (value - 13) * 25;
		if (value < 22) return (value - 17) * 25;
		if (value < 27) return (value - 21) * 20;
		if (value < 33) return (value - 26) * 17;
	};

	const LinearProgressBarColor = (value) => {
		if (value < 2) return "grey";
		if (value < 4) return "white";
		if (value < 7) return "lightGreen";
		if (value < 10) return "darkGreen";
		if (value < 14) return "lightBlue";
		if (value < 18) return "darkBlue";
		if (value < 22) return "purple";
		if (value < 27) return "orange";
		if (value < 33) return "red";
	};

	const LinearProgressBarColor2 = (value) => {
		if (value < 2) return "black";
		if (value < 4) return "grey";
		if (value < 7) return "white";
		if (value < 10) return "lightGreen";
		if (value < 14) return "darkGreen";
		if (value < 18) return "lightBlue";
		if (value < 22) return "darkBlue";
		if (value < 27) return "purple";
		if (value < 33) return "orange";
	};

	useEffect(() => {
		setList(data);
	}, [setList, data]);

	useEffect(() => {
		if (list[1].items.join("").includes("Crown")) {
			setFusionCrown(true);
		} else setFusionCrown(false);
		if (list[1].items.join("").includes("Case")) {
			setFusionCase(true);
		} else {
			setFusionCase(false);
		}

		if (list[1].items.join("").includes("Bracelet")) {
			setFusionBracelet(true);
		} else setFusionBracelet(false);
		if (list[1].items.join("").includes("Glass")) {
			setFusionGlass(true);
		} else setFusionGlass(false);
		if (list[1].items.join("").includes("Movement")) {
			setFusionMovement(true);
		} else setFusionMovement(false);

		const a = [];
		for (var i = 0; i < list[1].items.length; i++) {
			const b = list[1].items[i].slice(0, 1);
			a.push(b);
		}
		const allEqual = (a) => a.every((val) => val === a[0]);
		if (!allEqual(a)) {
			setFusionMatchParts(false);
		} else setFusionMatchParts(true);
	}, [list]);

	const dragItem = useRef();
	const dragItemNode = useRef();

	const handleDragStart = (e, item) => {
		dragItemNode.current = e.target;
		dragItemNode.current.addEventListener("dragend", handleDragEnd);
		dragItem.current = item;

		setTimeout(() => {
			setDragging(true);
		}, 0);
	};

	const handleDragEnd = (e) => {
		setDragging(false);
		dragItem.current = null;
		dragItemNode.current.removeEventListener("dragend", handleDragEnd);
		dragItemNode.current = null;
	};

	const handleDragEnter = (e, targetItem) => {
		if (dragItemNode.current !== e.target) {
			setList((oldList) => {
				let newList = JSON.parse(JSON.stringify(oldList));
				newList[targetItem.grpI].items.splice(
					targetItem.itemI,
					0,
					newList[dragItem.current.grpI].items.splice(
						dragItem.current.itemI,
						1
					)[0]
				);
				dragItem.current = targetItem;
				localStorage.setItem("List", JSON.stringify(newList));
				return newList;
			});
		}
	};

	const getStyles = (item) => {
		if (
			dragItem.current.grpI === item.grpI &&
			dragItem.current.itemI === item.itemI
		) {
			return "#3C3939";
		}
		return colorWatchParts(item.item);
	};

	const colorWatchParts = (watchParts) => {
		let fusionPrice = watchParts.charAt(0);
		if (fusionPrice === "0") return "#ffffff66";
		if (fusionPrice === "1") return "#ffffff";
		if (fusionPrice === "2") return "lightGreen";
		if (fusionPrice === "3") return "darkGreen";
		if (fusionPrice === "4") return "lightBlue";
		if (fusionPrice === "5") return "darkBlue";
		if (fusionPrice === "6") return "purple";
		if (fusionPrice === "7") return "orange";
		if (fusionPrice === "8") return "red";
	};

	const randomWeightedNumber = () => {
		const numbers = [
			1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8,
			8, 9
		];
		const rnd = Math.floor(Math.random() * numbers.length);
		const rnd2 = Math.floor(Math.random() * 10) + 1;
		return numbers[rnd] + rnd2 / 10;
	};

	const priceWatchParts = (watchParts) => {
		let newArray = watchParts;
		let fusionPrice = newArray[0];
		if (fusionPrice === "0") return "0-200€";
		if (fusionPrice === "1") return "200-500€";
		if (fusionPrice === "2") return "500-1000€";
		if (fusionPrice === "3") return "1000-5000€";
		if (fusionPrice === "4") return "5000-10.000€";
		if (fusionPrice === "5") return "10.000-30.000€";
		if (fusionPrice === "6") return "30.000-50.000€";
		if (fusionPrice === "7") return "50.000-100.000€";
		if (fusionPrice === "8") return "100.000€+";
	};

	const boosterValue = () => {
		if (fusionPrice === "0-200€") return cartBoosters.a;
		if (fusionPrice === "200-500€") return cartBoosters.b;
		if (fusionPrice === "500-1000€") return cartBoosters.c;
		if (fusionPrice === "1000-5000€") return cartBoosters.d;
		if (fusionPrice === "5000-10.000€") return cartBoosters.e;
		if (fusionPrice === "10.000-30.000€") return cartBoosters.f;
		if (fusionPrice === "30.000-50.000€") return cartBoosters.g;
		if (fusionPrice === "50.000-100.000€") return cartBoosters.h;
		if (fusionPrice === "100.000€+") return cartBoosters.i;
	};

	const whatImage = (item) => {
		if (item === "Case") return Case;
		if (item === "Glass") return Glass;
		if (item === "Bracelet") return Bracelet;
		if (item === "Movement") return Movement;
		if (item === "Crown") return Crown;
		else return null;
	};

	const handleFusionNewWatch = () => {
		if (boostStatus === "false") {
			const randomValue = randomWeightedNumber();
			const configData = {
				...currentUser,
				userID: currentUser.id,
				collection: currentUser.collection ? currentUser.collection : [],
				randomValue,
				fusionPrice
			};
			dispatch(fetchRandomProduct(configData));
		}
		if (boostStatus === "fail") {
			const randomValue = randomWeightedNumber();
			const configData = {
				...currentUser,
				userID: currentUser.id,
				collection: currentUser.collection ? currentUser.collection : [],
				boosters: currentUser.boosters
					? currentUser.boosters - numberBoosters
					: 0,
				randomValue,
				fusionPrice
			};
			dispatch(fetchRandomProduct(configData));
		}
		if (boostStatus === "true") {
			const baby = boosterValue();
			const configData = {
				...currentUser,
				userID: currentUser.id,
				collection: currentUser.collection ? currentUser.collection : [],
				boosters: currentUser.boosters
					? currentUser.boosters - numberBoosters
					: 0,
				fusionPrice,
				randomValue: baby.avgTotal
			};
			dispatch(fetchRandomProduct(configData));
		}
		setOpenPopupNewWatch(true);
	};

	const boostStatusFalse = () => {
		setBoostStatus("false");
	};

	const boostStatusTrue = () => {
		setBoostStatus("true");
	};

	const boostStatusFail = () => {
		setBoostStatus("fail");
	};

	const configBoosterSelection = {
		boostStatusFalse,
		boostStatusTrue,
		boostStatusFail,
		numberBoosters,
		setNumberBoosters,
		fusionPrice
	};

	const configWatch = {
		caseColor: fusionCase,
		glassColor: fusionGlass,
		movementColor: fusionMovement,
		crownColor: fusionCrown,
		braceletColor: fusionBracelet
	};

	if (list) {
		return (
			<div>
				<Grid container style={{ paddingTop: "80px" }}>
					<Grid item xs={5}>
						<Watch {...configWatch} />
					</Grid>
					<Grid item xs={7}>
						<Paper
							style={{
								marginTop: "20px",
								marginRight: "10px",
								padding: "3px",
								backgroundColor: "#3C393900"
							}}
						>
							{list.map((grp, grpI) => (
								<Box
									style={{
										backgroundColor: "black",
										margin: "10px",
										padding: "10px",
										borderRadius: "5px",
										display: "flex",
										justifyContent: "center"
									}}
									key={grp.title}
									onDragEnter={
										dragging && !grp.items.length
											? (e) => handleDragEnter(e, { grpI, itemI: 0 })
											: null
									}
								>
									<Grid container>
										<Grid xs={12}>
											<Typography>{grp.title}</Typography>
										</Grid>
										<Grid xs={12} style={{ display: "flex" }}>
											{grp.items.map((item, itemI) => (
												<Box
													onDragStart={(e) => {
														handleDragStart(e, { grpI, itemI });
													}}
													onDragEnter={
														dragging
															? (e) => handleDragEnter(e, { grpI, itemI })
															: null
													}
													draggable={true}
													key={item.id}
													style={{
														width: "45px",
														height: "45px",
														cursor: "pointer",
														backgroundColor: dragging
															? getStyles({ grpI, itemI, item })
															: colorWatchParts(item),
														margin: "5px",
														border: "solid 2px",
														borderColor: colorWatchParts(item),
														padding: "5px",
														borderRadius: "8px",
														display: "flex",
														justifyContent: "center",
														filter: "opacity(1) drop-shadow(2px 2px 5px red)"
													}}
												>
													<img
														src={whatImage(item.toString().slice(1))}
														style={{
															maxWidth: "100%",
															maxHeight: "100%",
															padding: "5px",
															filter: "opacity(1) drop-shadow(2px 2px 5px red)"
														}}
														alt=""
													/>
												</Box>
											))}
										</Grid>
									</Grid>
								</Box>
							))}
							<Grid container style={{ display: "flex" }}>
								<Grid item xs={12} md={6}>
									<Typography>
										FUSION MACHINE - New watch to be obtained: {fusionPrice}{" "}
									</Typography>

									{list[1].items.length > 5 && (
										<Typography style={{ color: "orange" }}>
											You have to many parts on the fusion machine
										</Typography>
									)}
									{!fusionMatchParts && (
										<Typography style={{ color: "orange" }}>
											You have Parts that are incompatible (different colors)
										</Typography>
									)}

									{!ready &&
										fusionBracelet &&
										fusionCase &&
										fusionGlass &&
										fusionCrown &&
										fusionMovement &&
										fusionMatchParts &&
										!collectionFull &&
										list[1].items.length === 5 && (
											<Button
												onClick={() => {
													setFusionPrice(priceWatchParts(list[1].items[0]));
													setReady(true);
												}}
											>
												Are you ready!
											</Button>
										)}
									{ready && [
										<BoosterSelection {...configBoosterSelection} />,
										<Button
											onClick={() => {
												setReady(false);
												handleFusionNewWatch();
												handleDeleteWatchParts(list[1].items);
											}}
										>
											Fusion!
										</Button>
									]}
								</Grid>
								<Grid item xs={12} md={6}>
									{list[2].items.length > 0 && (
										<Typography style={{ fusionPrice: "orange" }}>
											Shredded Parts are gone!
										</Typography>
									)}
									<Typography>
										SHREDDING - New part that will be obtained:
									</Typography>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											paddingTop: "5px"
										}}
									>
										<BorderLinearProgress
											variant="determinate"
											value={LinearProgressBarFormat(
												shredderMeter(list[2].items)
											)}
										/>
									</Box>
									{!openConfirmDelete && (
										<Button
											onClick={() => {
												setOpenConfirmDelete(true);
											}}
										>
											<TiDelete fusionPrice="red" fontSize="3.5em" />
											Shred Parts
										</Button>
									)}
									{openConfirmDelete && (
										<Button
											onClick={() => {
												setOpenConfirmDelete(false);
												handleDeleteWatchParts(
													list[2].items,
													LinearProgressBarColor(shredderMeter(list[2].items)),
													LinearProgressBarFormat(shredderMeter(list[2].items)),
													LinearProgressBarColor2(shredderMeter(list[2].items))
												);
											}}
										>
											<TiDelete fusionPrice="red" fontSize="3.5em" />
											I, Confirm
										</Button>
									)}
								</Grid>
							</Grid>
						</Paper>
						{randomProduct && (
							<Popup
								openPopup={openPopupNewWatch}
								setOpenPopup={setOpenPopupNewWatch}
								title={"New Watch Alert!!"}
							>
								<CardMedia
									style={{ height: "30vh" }}
									image={
										randomProduct.productThumbnail
											? randomProduct.productThumbnail[0]
											: null
									}
								></CardMedia>
								<Typography
									style={{
										color: "black",
										fontSize: "12px",
										marginTop: "10px"
									}}
								>
									Congratulations you added to your collection a:{" "}
									{randomProduct.productBrand} {randomProduct.productName} Ref:{" "}
									{randomProduct.reference}
								</Typography>
							</Popup>
						)}
					</Grid>
				</Grid>
			</div>
		);
	}
};
export default WatchParts;
