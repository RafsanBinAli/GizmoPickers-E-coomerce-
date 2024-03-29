import React, { useState } from 'react';
import LeftSide from "./LeftSide/LeftSide";
import RightBox from "./RightBox/RightBox";

const Shop =()=>{
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState(null);
    const [searchName,setSearchName]=useState(null);

    const handleCategorySelect = (categoryName, subCategoryName) => {
        setSelectedCategoryId(categoryName);
        setSelectedSubCategoryName(subCategoryName);
    };
    const handleSearch=(searchName)=>{
        setSearchName(searchName);
    }
    return (
        <>
        <div className="shop-box-inner">
                <div className="container">
                    <div className="row">
                    <LeftSide onCategorySelect={handleCategorySelect} selectSearchName={handleSearch} />
                    <RightBox selectedCategoryId={selectedCategoryId} searchName={searchName} />

                    </div>
                </div>
            </div>
        </>
    )
}
export default Shop;