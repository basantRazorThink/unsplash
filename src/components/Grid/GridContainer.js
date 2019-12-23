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
            limitPerPage: '9-per-page',
            currentPageNo: 1,// to determine the current page
            gridContents: null,
            isLoading: true, // for loader
            showLoadMore: true,
            alertNoMorePics: false// if the user has viewed all the pages and no more pics are there to show
        }
    }

    componentDidMount() {
        const { searchValue } = this.props;
        const { currentPageNo } = this.state;
        this.gridUpdater(searchValue, currentPageNo);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchValue !== this.props.searchValue)
            this.setState({
                gridContents: null,
                currentPageNo: 1,
                isLoading: true
            }, () => {
                this.gridUpdater(this.props.searchValue, this.state.currentPageNo)
            })
    }



    gridUpdater = (searchValue, currentPageNo) => {
        let { limitPerPage, gridContents, isLoading, alertNoMorePics } = this.state;
        let urlParamObj = { currentPageNo, limitPerPage, searchValue, client_id }
        let urlToFetch = urlConstructor(urlParamObj);
        let res = FetchUtility(urlToFetch);
        let finalGridContents;
        let finalAlertNoMorePics;
        res.then(res => {
            // compute what the state variables will be before hand and when at last do a setstate with all those variables
            if (currentPageNo < res.total_pages) {
                finalGridContents = gridContents ? [...this.state.gridContents, ...res.results] : res.results;
                finalAlertNoMorePics = false;
            }
            // if loadmore was clicked and no more results left to show
            else if (currentPageNo >= res.total_pages) {
                finalGridContents = gridContents ;
                finalAlertNoMorePics = true
            }
            // if entered keyword isnt found
            if (!res.results.length) {
                finalGridContents = null;
                finalAlertNoMorePics = true;
            }
            this.setState({
                gridContents: finalGridContents,
                isLoading: false,
                alertNoMorePics: finalAlertNoMorePics,
            })

        })
            .catch(e => console.log(e));


    }

    render() {
        console.log("from the GridCONTAINER THE STATE IS", this.state)
        const { gridContents, isLoading, showLoadMore, alertNoMorePics } = this.state;
        const { handlePopUp } = this.props;
        return (
            <div className="gridContainer">
                {
                    isLoading ?
                        <img className="loader" src={loaderGifUrl} /> :
                        null
                }

                {
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
                    styleName="no-search"
                    gridContents={gridContents}
                    isLoading={isLoading}
                    alertNoMorePics={alertNoMorePics}
                />

                {
                    (gridContents && !isLoading && !alertNoMorePics) ?
                        <div className="btn-container">
                            <button className="loadBtn"
                                onClick={() => {
                                    this.setState({ currentPageNo: this.state.currentPageNo + 1 }, () => {
                                        this.gridUpdater(this.props.searchValue, this.state.currentPageNo)
                                    })
                                }}
                            >Load More</button></div>
                        : null
                }


            </div>
        );
    };

}

export default GridContainer;