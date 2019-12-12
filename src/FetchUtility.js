const FetchUtility = async (accessKey,currentPageNo, limitPerPage, searchValue) => {

    console.log("from utility.js", accessKey, limitPerPage, searchValue)

    const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=${currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`);
    return  await jsonData.json();
}

export default FetchUtility