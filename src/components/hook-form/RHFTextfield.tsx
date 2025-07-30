import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const RHFTextfield = ({
  name,
  placeholder,
  ...other
}: {
  name: string;
  placeholder: string;
}) => {
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
