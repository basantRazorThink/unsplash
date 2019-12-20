const FetchUtility = async (url) => {
    try {
        const jsonData = await fetch(url);
        if(jsonData.status === 200) {
            const res = await jsonData.json();
            return res;
        } else {
            return ({ message: 'Server Error'});
        }
    }
    catch (e) {
        console.log(e)
    }

}

// const fn = (url) => {
//     const response = FetchUtility(url);
//     let result;
//     response.then(resol => {
//         console.log('resol', resol);
//         result = resol;
//     });
//     console.log('result', result);
//     return result;
// }

export default FetchUtility