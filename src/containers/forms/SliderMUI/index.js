import React from "react";
import { Slider } from "@material-ui/core";
import { useField } from "formik";

const SliderWrapper = ({ name, ...otherProps }) => {
	const [field, mata] = useField(name);

	const configSlider = {
		...field,
		name,

		...otherProps
	};

	if (mata && mata.touched && mata.error) {
		configSlider.error = true;
		configSlider.helperText = mata.error;
	}

	return (
		<Slider
			{...configSlider}
			defaultValue={0}
			aria-labelledby="discrete-slider"
			valueLabelDisplay="auto"
			step={1}
			marks
			min={0}
			max={10}
		/>
	);
};

export default SliderWrapper;
