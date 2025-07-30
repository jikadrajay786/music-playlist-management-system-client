import { useCallback, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface ISearchbarProps {
  onSearch: (data: string) => void;
  searching: boolean;
}
const SearchBar = ({ onSearch, searching }: ISearchbarProps) => {
  // Local state
  const [searchText, setSearchText] = useState("");

  // Functions / handlers
  const handleClear = useCallback(() => {
    setSearchText("");
    onSearch("");
  }, [onSearch]);

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
