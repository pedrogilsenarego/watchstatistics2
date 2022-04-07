import React from "react";
import {
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel
} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { useField, useFormikContext } from "formik";

const CheckboxWrapper = ({ name, label, legend, ...otherProps }) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt) => {
		const { checked } = evt.target;
		setFieldValue(name, checked);
	};

	const configCheckbox = {
		...field,
		onChange: handleChange
	};

	const configFormControl = {};
	if (meta && meta.touched && meta.error) {
		configFormControl.error = true;
	}

	return (
		<FormControl {...configFormControl}>
			<FormLabel component="legend">{legend}</FormLabel>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							sx={{
								color: "#ffffffB3",
								"&.Mui-checked": {
									color: "white"
								}
							}}
							{...configCheckbox}
						/>
					}
					label={label}
				/>
			</FormGroup>
		</FormControl>
	);
};

export default CheckboxWrapper;
