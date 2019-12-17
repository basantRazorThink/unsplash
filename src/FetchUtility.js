const FetchUtility = async (url) => {
 const jsonData = await fetch(url);
 return  jsonData.status === 200?
     await jsonData.json(): "server not reachable"
}

export default FetchUtility