import React, { Component } from "react";
import Grid from "./Grid1"
import "./styles.css";
import FetchUtility from "../../FetchUtility";
import Alert from "../Alert"
import { url, client_id, loaderGifUrl } from "../../Constants";

const urlConstructor = (urlParamObj) => {
    debugger;
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
            currentPageNo: 1,// to determine the current page
            gridContents: null,
            isLoading: true, // for loader
            searchFound: false,// try to replace its logic with gridContents
            showLoadMore: true,
            alertNoMorePics: false// if the user has viewed all the pages and no more pics are there to show
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
            isLoading: false,// stop loader 
        });

    }
    // cases when the component grid updates
    // 1: if user selects different search keywords from popular searches or enters a keyword in the searchbar.
    // 2:  when the user hits the loadmore button

    componentDidUpdate(prevProps) {
        const { limitPerPage, searchValue, loadMore, toggleHandleLoadMore } = this.props;
        const { currentPageNo, gridContents } = this.state;

        // if user selects different search keywords from popular searches or enters a keyword in the searchbar
        // i.e when the searchValue changes any how
        if (prevProps.searchValue !== searchValue) {
            // first show loader
            this.setState({ isLoading: true, currentPageNo: 1, alertNoMorePics: false }, () => {
                // check below line for state update
                let urlParamObj = { currentPageNo: this.state.currentPageNo, limitPerPage, searchValue, client_id }
                let urlToFetch = urlConstructor(urlParamObj);
                let res = FetchUtility(urlToFetch)
                res
                    .then(res =>
                        // cases when searchValue changes
                        // 1. pic of entered keyword is found, then populate the gridContents
                        // 2. pic of entered keyword is not found, then show content not found
                        (res.results.length) ?
                            this.setState({
                                gridContents: res.results,
                                isLoading: false,
                                showLoadMore: true
                            }) : this.setState({
                                gridContents: null,
                                isLoading: false,
                                showLoadMore: false
                            })
                    )
                    .catch(e => console.log(e));
            })


        }

        // when the user hits the load more button
        if (prevProps.loadMore === false && loadMore === true) {
            console.log("loadMore has changed", prevProps.loadMore, loadMore);
            // first show loader and increment the currentPageNo is incremented
            // check below line for state update
            this.setState({ isLoading: true, currentPageNo: this.state.currentPageNo + 1 }, () => {


                // get the searchvalue(keywords entered) pics
                let urlParamObj = { currentPageNo: this.state.currentPageNo, limitPerPage, searchValue, client_id }
                let urlToFetch = urlConstructor(urlParamObj);
                let res = FetchUtility(urlToFetch)
                res
                    .then(res =>
                        // cases after loadmore is hit
                        // 1. if currentPageNo is less than res.total_pages, append the res.results with the gridContents
                        // 2. if currentPageNo is equal to res.total_pages, donot show the 

                        (currentPageNo < res.total_pages) ?
                            //    console.log("from loadmore instance", currentPageNo,res.total_pages,currentPageNo <= res.total_pages): null
                            this.setState({
                                // update the grids by adding the new contents to the grid
                                gridContents: [...this.state.gridContents, ...res.results],
                                isLoading: false,
                            }, () => toggleHandleLoadMore())
                            : this.setState({ isLoading: false, showLoadMore: false, alertNoMorePics: true }, () => toggleHandleLoadMore())
                    )
                    .catch(e => console.log(e));
            })


        }


    }
    render() {
        const { gridContents, isLoading, showLoadMore, alertNoMorePics } = this.state;
        console.log("from render of grid the state and props is", this.state, this.props)
        // console.log("grid container rendered");
        const { handlePopUp, handleLoadMore } = this.props;
        return (
            <div className="gridContainer">
                {
                    isLoading ?
                        <img className="loader" src={loaderGifUrl} /> :
                        null
                }

                { // if gridContents is full after searching and loading has stopped
                    (gridContents && !isLoading) ? gridContents.map((pic, index) => (

                        <Grid
                            pic={pic}
                            index={index}
                            handlePopUp={handlePopUp}
                            key={index}
                        />


                    )) :
                        null
                }
                <Alert  
                   styleName= "no-search"
                   gridContents= {gridContents}
                   isLoading= {isLoading}
                   alertNoMorePics= {alertNoMorePics}
                /> 
                {/* {// if gridContents is null and loading is done show no search found 
                    //this and bottom className = no-search will b one component
                    (!gridContents && !isLoading) ?
                        <div className="no-search">no search found</div>
                        : null
                } */}
                {
                    (showLoadMore && !isLoading) ?
                        <div className="btn-container"><button className="loadBtn" onClick={handleLoadMore}>Load More</button></div>
                        : null
                }
                {/* {
                    alertNoMorePics ? <div className="no-search">no more pics to show</div>
                        : null
                } */}

            </div>
        );
    };

}

export default GridContainer;