
export const newSearch = (searchData) => {
    localStorage.setItem("searchData", JSON.stringify(searchData))
    return {
      type: "NEW_SEARCH",
      payload: searchData,
    };
  };
  
  export const resetSearch = () => {
    return {
      type: "RESET_SEARCH",
    };
  };