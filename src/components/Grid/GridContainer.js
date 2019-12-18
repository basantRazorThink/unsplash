import React, { Component } from "react";
import Grid from "./Grid1"
import "./styles.css";
import FetchUtility from "../../FetchUtility";
import { url, client_id , loaderGifUrl} from "../../Constants";

const urlConstructor = (urlParamObj) => {
    let finalUrl = url;
    for (let paramKey in urlParamObj) {
        finalUrl = finalUrl.replace(`:${paramKey}`, urlParamObj[paramKey])
    }
    return finalUrl;

}

class GridContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageNo: 1,// to determone the current page
            gridContents: null,
            isLoading: true, // for loader
            searchFound: false,// try to replace its logic with gridContents
            showLoadMore: true,
            alertNoMorePics: false
        }
    }

    componentDidMount() {
        const { limitPerPage, searchValue } = this.props;
        const { currentPageNo } = this.state;
        let urlParamObj = { currentPageNo, limitPerPage, searchValue, client_id }
        let urlToFetch = urlConstructor(urlParamObj);
        let res = FetchUtility(urlToFetch)
        res
            .then(res => this.setState({ gridContents: res.results }))
            .catch(e => console.log(e));

        this.setState({
            isLoading: false,
        });

    }
    // cases when the component grid updates
    // 1: if user selects different search keywords from popular searches or enters a keyword in the searchbar.
    // 2:  when the user hits the loadmore button

    componentDidUpdate(prevProps) {
        const { accessKey, limitPerPage, searchValue, loadMore, toggleHandleLoadMore } = this.props;
        const { currentPageNo, gridContents } = this.state;

        // if user selects different search keywords from popular searches or enters a keyword in the searchbar
        console.log("from compo did mount of grid container", searchValue, loadMore);
        // when the searchValue changes 
        if(prevProps.searchValue !== searchValue){
            console.log("searchValue has changed", prevProps.searchValue,searchValue,prevProps.searchValue !== searchValue)
        }

        // when the user hits the load more button


    }
    render() {
        const { gridContents, isLoading, searchFound, showLoadMore, alertNoMorePics } = this.state;
        // console.log("from render of grid the state and props is", this.state, this.props)
        console.log("grid container rendered");
        const { handlePopUp, handleLoadMore } = this.props;
        return (
            <div className="gridContainer">
                {
                    isLoading ?
                        <img className="loader" src={loaderGifUrl} /> :
                        null
                }

                {(gridContents && !isLoading && !searchFound) ? gridContents.map((pic, index) => (
                    // make this a reusable component
                    <Grid
                      pic={pic}
                      index={index}
                      handlePopUp={handlePopUp}
                      key={index}
                    />


                )) :
                    null
                }
                
                {// this and bottom className = no-search will b one component
                    (searchFound && !isLoading) ?
                        <div className="no-search">no search found</div>
                        : null
                }
                {
                    (showLoadMore && !isLoading) ?
                        <div className="btn-container"><button className="loadBtn" onClick={handleLoadMore}>Load More</button></div>
                        : null
                }
                {
                    alertNoMorePics ? <div className="no-search">no more pics to show</div>
                        : null
                }

            </div>
        );
    };

}

export default GridContainer;