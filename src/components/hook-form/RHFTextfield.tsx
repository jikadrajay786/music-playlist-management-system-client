import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IRHFTextfieldProps {
  name: string;
  placeholder: string;
}

const RHFTextfield = ({ name, placeholder, ...other }: IRHFTextfieldProps) => {
  // Hooks
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => {
        return (
          <TextField
            fullWidth
            variant="outlined"
            size="medium"
            placeholder={placeholder}
            {...field}
            error={!!fieldError}
            helperText={fieldError?.message}
            {...other}
            inputProps={{
              autoComplete: "off",
            }}
          />
        );
      }}
    />
  );
};

export default RHFTextfield;
