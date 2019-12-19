import React, { Component } from "react";
import "./styles.css";
import FetchUtility from "../../FetchUtility";

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageNo: 1,
            gridContents: null,
            isLoading: true,
            searchFound: false,
            showLoadMore: true,
            alertNoMorePics: false
        }
    }

    componentDidMount() {
        const { accessKey, limitPerPage, searchValue } = this.props;
        const { currentPageNo } = this.state;

        let url = `https://api.unsplash.com/search/photos?page=${currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`;

        let res = FetchUtility(url)

        res
            .then(res => this.setState({ gridContents: res.results }))
            .catch(e => console.log(e));
        this.setState({
            isLoading: false,
        })

    }

    componentDidUpdate(prevProps) {
        const { accessKey, limitPerPage, searchValue, loadMore, toggleHandleLoadMore } = this.props;
        const { currentPageNo, gridContents } = this.state;

        // if user selects different search keywords from popular searches or enters a keyword in the searchbar
        if (prevProps.searchValue !== searchValue) {
            // console.log("from componn did update of grid the prevProps.search value and searchValue is", prevProps.searchValue, searchValue, prevProps.searchValue !== searchValue);
            this.setState({
                isLoading: true,
                currentPageNo: 1,
                alertNoMorePics: false
            }, () => {
                let url = `https://api.unsplash.com/search/photos?page=${this.state.currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`;

                let res = FetchUtility(url);
                res
                    .then(res => {

                        //         console.log("========>", res)
                        // if(res === "server not reachable"){
                        //     this.setState({
                        //         isLoading: true,
                        //         searchFound: true
                        //     })
                        // }

                        // if (res.results.length === 0) {
                        //     return this.setState({
                        //         isLoading: false,
                        //         searchFound: true,
                        //         showLoadMore: false

                        //     })
                        // }
                        if (currentPageNo < res.total_pages) {
                            this.setState({
                                // currentPageNo: this.state.currentPageNo + 1,
                                searchFound: false,
                                showLoadMore: true,
                                gridContents: [...res.results], isLoading: false
                            });
                            toggleHandleLoadMore()
                        }
                        // cases if no more pages is found
                         if (res.results.length === 0) {
                            return this.setState({
                                isLoading: false,
                                searchFound: true,
                                showLoadMore: false

                            });
                        }
                    })
                    .catch(e => console.log(e));
            })




        }

        //case: when the user hits the loadmore button
        else if (prevProps.loadMore === false && loadMore === true) {
            //    without searching the user hits the load more button the random pic gets populated
            if ((prevProps.searchValue === "random") && (searchValue === "random")) {
                this.setState({
                    isLoading: true,
                    currentPageNo: this.state.currentPageNo + 1,
                }, () => {
                    let url = `https://api.unsplash.com/search/photos?page=${this.state.currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`;

                    let res = FetchUtility(url);
                    res
                        .then(res => {
                            if (currentPageNo < res.total_pages) {
                                this.setState({
                                    isLoading: false,
                                    searchFound: false,
                                    showLoadMore: true,
                                    gridContents: [...this.state.gridContents, ...res.results],
                                    isLoading: false
                                });
                                toggleHandleLoadMore();
                            }
                            // case: if no pages is found
                            if (res.results.length === 0) {
                                return this.setState({
                                    isLoading: false,
                                    searchFound: true,
                                    showLoadMore: false

                                });
                            }
                        })
                        .catch(e => console.log(e));
                });

            }

            else {
                //when user enters a keyword, searches it and then hits the loadmore button
                this.setState({
                    isLoading: true,
                    currentPageNo: this.state.currentPageNo + 1,

                }, () => {
                    let url = `https://api.unsplash.com/search/photos?page=${this.state.currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`;

                    let res = FetchUtility(url);
                    res
                        .then(res => {
                            console.log("========> re baba", res, (currentPageNo > res.total_pages));
                            // if (this.state.currentPageNo > res.total_pages) {
                            //     console.log("om om om")
                            //     this.setState({
                            //         alertNoMorePics: true,
                            //         searchFound: false
                            //     })
                            // }
                            if (currentPageNo < res.total_pages) {
                                this.setState({
                                    isLoading: false,
                                    searchFound: false,
                                    showLoadMore: true,
                                    gridContents: [...this.state.gridContents, ...res.results],
                                    isLoading: false
                                });
                                toggleHandleLoadMore();
                            }
                            // cases if no more pages is found
                            if (res.results.length === 0) {
                                return this.setState({
                                    isLoading: false,
                                    alertNoMorePics: true,
                                    showLoadMore: false

                                });
                            }
                        })
                        .catch(e => console.log(e));
                });

            }



        }
    }


    render() {
        const { gridContents, isLoading, searchFound, showLoadMore, alertNoMorePics } = this.state;
        console.log("from render of grid the state and props is", this.state, this.props)
        const { handlePopUp, handleLoadMore } = this.props;
        return (
            <div className="gridContainer">
                {
                    isLoading ?
                        <img className="loader" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> :
                        null
                }
                {(gridContents && !isLoading && !searchFound) ? gridContents.map((pic, index) => (
                    <div
                        key={index}
                        className="gridItem"
                        id={pic.id}
                        style={{
                            backgroundImage: `url("${pic.urls.small}")`,
                        }}
                        onClick={() => {
                            handlePopUp(pic.id, pic.user);
                        }}>
                        <div className="profile-container">
                            <div className="profile-pic" style={{ backgroundImage: `url(${pic.user.profile_image.small})` }}></div>
                            <div className="profile-name-ctn">
                                <span className="profile-name-by">Image by</span>
                                <span className="profile-name">{pic.user.name}</span>
                            </div>

                        </div>
                    </div>


                )) :
                    null
                }
                {
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

export default Grid;




// currentPageNo <= res.total_pages)?
//                         this.setState({
//                             // update the grids by adding the new contents to the grid
//                             gridContents: [ ...this.state.gridContents,...res.results],
//                             isLoading: false,
//                          },() => toggleHandleLoadMore()): 
//                           this.setState(
//                               {isLoading: false, showLoadMore: false, alertNoMorePics: true},() => toggleHandleLoadMore())
                    