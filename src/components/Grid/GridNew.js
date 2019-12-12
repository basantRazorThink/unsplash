import React, { Component } from "react";
import "./styles.css";
import FetchUtility from "../../FetchUtility";




class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageNo: 1,
            gridContents: null,
            alertNoMorePagesToShow: false,
        }
    }

    componentDidMount() {
        const { accessKey, limitPerPage, searchValue } = this.props;
        const { currentPageNo } = this.state;
        let res = FetchUtility(accessKey, currentPageNo, limitPerPage, searchValue)
        res
            .then(res => this.setState({ gridContents: res.results }))
            .catch(e => console.log(e));

    }

    componentDidUpdate(prevProps) {
        const { accessKey, limitPerPage, searchValue, loadMore, toggleHandleLoadMore } = this.props;
        console.log("from componentdidiupdate", prevProps.loadMore, this.props);
        const { currentPageNo, gridContents } = this.state;
        if ((prevProps.searchValue !== searchValue)) {
            console.log("from if of compodidupdate", prevProps.loadMore, loadMore);
            let res = FetchUtility(accessKey, currentPageNo, limitPerPage, searchValue)
            res
                .then(res => {
                    if (currentPageNo < res.total_pages) {
                        this.setState({
                            currentPageNo: this.state.currentPageNo + 1,
                        }

                            ,
                            () => {
                                console.log("hari om ", this.state.currentPageNo);
                                toggleHandleLoadMore()
                                let res = FetchUtility(accessKey, this.state.currentPageNo, limitPerPage, searchValue)
                                res
                                    .then(res =>
                                        this.setState({ gridContents: [ ...res.results] }))
                                    .catch(e => console.log(e));
                            }
                        )
                    }
                })
                .catch(e => console.log(e));


        }
        // else if ((prevProps.searchValue === searchValue) && searchValue !== "random") {
        //     console.log("from if of compodidupdate", prevProps.loadMore, loadMore);
        //     let res = FetchUtility(accessKey, currentPageNo, limitPerPage, searchValue)
        //     res
        //         .then(res => {
        //             if (currentPageNo < res.total_pages) {
        //                 this.setState({
        //                     currentPageNo: this.state.currentPageNo + 1,
        //                 }

        //                     ,
        //                     () => {
        //                         console.log("hari om ", this.state.currentPageNo);
        //                         toggleHandleLoadMore()
        //                         let res = FetchUtility(accessKey, this.state.currentPageNo, limitPerPage, searchValue)
        //                         res
        //                             .then(res =>
        //                                 this.setState({ gridContents: [...this.state.gridContents, ...res.results] }))
        //                             .catch(e => console.log(e));
        //                     }
        //                 )
        //             }
        //         })
        //         .catch(e => console.log(e));


        // }
        if (prevProps.loadMore === false && loadMore === true) {
            console.log("from if of compodidupdate", prevProps.loadMore, loadMore);
            let res = FetchUtility(accessKey, currentPageNo, limitPerPage, searchValue)
            res
                .then(res => {
                    if (currentPageNo < res.total_pages) {
                        this.setState({
                            currentPageNo: this.state.currentPageNo + 1,
                        }

                            ,
                            () => {
                                console.log("hari om ", this.state.currentPageNo);
                                toggleHandleLoadMore()
                                const temp = gridContents;
                                let res = FetchUtility(accessKey, this.state.currentPageNo, limitPerPage, searchValue)
                                res
                                    .then(res =>
                                        this.setState({ gridContents: [...this.state.gridContents, ...res.results] }))
                                    .catch(e => console.log(e));

                            }
                        )
                    }
                })
                .catch(e => console.log(e));


        }







    }


    render() {
        const { gridContents } = this.state;
        const { handlePopUp } = this.props
        console.log("from the render of the grid the gridcontents is", this.state)
        return (
            <div className="gridContainer">
                {gridContents ? gridContents.map((pic, index) => (
                    <div
                        key={index}
                        className="gridItem"
                        id={pic.id}
                        style={{
                            backgroundImage: `url(${pic.urls.small})`,
                        }}
                        onClick={() => {
                            handlePopUp(pic.id);
                        }}
                    />
                )) : null}
            </div>
        );
    };

}

export default Grid;