const FetchUtility = async (url) => {
    console.log("from fetch utility the url is", url)
 const jsonData = await fetch(url);
 return  jsonData.status === 200?
     await jsonData.json(): "server not reachable"
}

export default FetchUtility