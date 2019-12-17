// import React, { useState, useEffect } from 'react';
// import './styles.css';

// const Grid = ({ accessKey, handlePopUp, searchValue, loadMore, limitPerPage }) => {
//     const [gridContents, setGridContents] = useState(null);
//     const [currentPageNo, setCurrentPageNo] = useState(1);

//     const usefetchMoreImages = () => {
//         let newPageNo = currentPageNo + 1;
//         const fetchData = async (newPageNo) => {
//             const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=${newPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`);
//             const data = await jsonData.json();
//             const oldData = [...gridContents.results];
//             let newData = oldData.concat(data.results);
//             setGridContents(gridContents => [...gridContents.results, data.results]);};

//         fetchData(newPageNo);
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=${currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`);
//             const data = await jsonData.json();
//             const newPageNo = (currentPageNo + 1);
//             setCurrentPageNo( currentPageNo =>  currentPageNo +1 )
//             currentPageNo < data.total_pages ? usefetchMoreImages() : null;
//         };

//         fetchData();
//     }, [loadMore]);

//     useEffect(() => {
//         const fetchData = async () => {
//             searchValue = searchValue || 'random';
            
//             const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`);
//             const data = await jsonData.json();


//             setGridContents(data);
//         };
//         fetchData();
//     }, [searchValue]);
//     return (
//         <div className="gridContainer">
//             {(gridContents !== undefined && gridContents !== null) ? gridContents.results.map((pic, index) => (
//                 <div
//                     key={index}
//                     className="gridItem"
//                     id={pic.id}
//                     style={{
//                         backgroundImage: `url(${pic.urls.small})`,
//                     }}
//                     onClick={() => {
//                         handlePopUp(pic.id);
//                     }}
//                 />
//             )) : null}
//         </div>
//     );
// };

// export default Grid;
