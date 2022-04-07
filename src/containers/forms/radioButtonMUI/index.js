import React from "react";
import { Radio, FormControlLabel, RadioGroup } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const RadioButtonWrapper = (options, { name, ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(options.name);

	const handleChange = (evt) => {
		const { checked } = evt.target;
		setFieldValue(options.name, checked);
	};

	const configRadioButton = {
		...field,
		onChange: handleChange
	};

	if (meta && meta.touched && meta.error) {
		configRadioButton.error = true;
		configRadioButton.helperText = meta.error;
	}

	return (
		<RadioGroup {...props} name={name}>
			{Object.keys(options).map((item, pos) => {
				return (
					<FormControlLabel
						{...configRadioButton}
						value={options[item].value}
						control={<Radio />}
						label={options[item].label}
					/>
				);
			})}
		</RadioGroup>
	);
};

export default RadioButtonWrapper;
