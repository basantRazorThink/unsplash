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
        const { limitPerPage, gridContents } = this.state;
        let urlParamObj = { currentPageNo, limitPerPage, searchValue, client_id }
        let urlToFetch = urlConstructor(urlParamObj);
        let res = FetchUtility(urlToFetch)
        res.then(res => {
            if (currentPageNo < res.total_pages) {
                // case: when load more is clicked
                this.setState({
                    gridContents: gridContents ? [...this.state.gridContents, ...res.results] : res.results,
                    isLoading: false,
                    alertNoMorePics: false
                });
            }
            // if loadmore was clicked and no more resukts left to show
            else if (currentPageNo >= res.total_pages) {
                this.setState({
                    alertNoMorePics: true
                })
            }
            // if entered keyword isnt found
            if (!res.results.length) {
                this.setState({
                    gridContents: null,
                    isLoading: false,
                    alertNoMorePics: true,
                })
            }

        })
            .catch(e => console.log(e));
        

    }

    render() {
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