import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({
  onSearch,
  searching,
}: {
  onSearch: (data: string) => void;
  searching: boolean;
}) => {
  // Local state
  const [searchText, setSearchText] = useState("");

  // Functions / handlers
  const handleClear = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search..."
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        onSearch(e.target.value);
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
        },
      }}
      InputProps={{
        autoComplete: "off",

        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),

        endAdornment: searching ? (
          <InputAdornment position="end">
            <CircularProgress size={18} />
          </InputAdornment>
        ) : searchText ? (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end">
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default SearchBar;
