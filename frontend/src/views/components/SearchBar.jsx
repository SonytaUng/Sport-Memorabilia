import React from "react";
import "../../styles/SearchBar.css";


function SearchBar({placeholder}){
    return(
    <div class="search">
        <div className="searchInputs">
            <input type = "text" placeholder={placeholder}/>
            <div className = "searchIcon"></div>
        </div>
        <div className="dataResult"></div>
        
        </div>
    );
}
export default SearchBar;