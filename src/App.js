import React, { Component, useState, useEffect } from 'react';
import PopUp from "./components/PopUp/PopUp";
import Background from "./components/Background/Background";
import Grid from "./components/Grid/GridNew"
import SearchBar from './components/SearchBar/SearchBar';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./styles.css"



class App extends Component {
    constructor() {
        super();
        this.state = {
            accessKey: "5ee7b68a9600ef9aaf4f3d1773c4f86a729d91f3c87bb43bcfb0cfe2a341604a",
            searchContent: null,
            currentPageNo: 1,
            showLoadMore: true,
            showPopup: false,
            popUpPicId: null,
            dataOfPopUpPics: null,
            searchPlaceHolder: "Search for images here ",
            searchValue: "random",
            loadMore: false,
            limitPerPage: '9-per-page'
        };
    }

    componentDidMount() {
        this.setState({
            currentPageNo: 1,
        })
    }
    onChange = (e) => {
        this.setState({
            searchPlaceHolder: e.target.value
        });
    }

    handleEnterKey = async (e) => {
       console.log("handle enter key called")
        const { searchPlaceHolder } = this.state;
        // console.log(" from handleEnterKey", e.key === "Enter")
        e.key === "Enter" ? this.setState({
            searchValue: searchPlaceHolder
        }) : null

    }

    // toggle loadmore if true convert it ot false if fasle convert it to true
    handleLoadMore = () => {
        // console.log("i m clicked")
        // let { currentPageNo, searchValue, accessKey, searchContent } = this.state;
        // if (!searchValue) {
        //     searchValue = "random"
        // }
        // const limitPerPage = `9-per-page`;
        // const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`)
        // const data = await jsonData.json();
        // // console.log("from handl more the data is", data)

        // if (currentPageNo < data.total_pages) {
        //     this.setState({
        //         currentPageNo: this.state.currentPageNo + 1,
        //     }, async () => {
        //         const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=${this.state.currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`)
        //         const newData = await jsonData.json();
        //         const finalData = searchContent.concat(newData.results);

        //         this.setState({
        //             searchContent: finalData
        //         })
        //     })

        // }
        // if (currentPageNo == data.total_pages) {
        //     this.setState({
        //         showLoadMore: false
        //     })
        // }

        // this.setState({
        //     loadMore: true
        // })
        this.setState({
            loadMore: true
        })

    }

    toggleHandleLoadMore = () => {
        console.log("toggleHandleloadmore is called re baba")
        this.setState({
            loadMore: false
        });
    }

    handleClick = e => {
        const { searchPlaceHolder } = this.state
        this.setState({
            searchValue: searchPlaceHolder
        })
    }

    togglePopup = async () => {
        this.setState({
            showPopup: !this.state.showPopup
        });

    }

    handlePopUp = async (picId) => {
        const { accessKey, } = this.state;
        // console.log("4rm handlePopUPfunction of parent", accessKey, picId);
        const jsonData = await fetch(`https://api.unsplash.com/photos/${picId}?client_id=${accessKey}`);
        const data = await jsonData.json();
        // console.log("=======>>>>>>", data)
        const finalDataForPopUp = await data.urls.small
        this.setState({
            dataOfPopUpPics: finalDataForPopUp,
            showPopup: !this.state.showPopup
        })

    }
    handleHeaderSearchTagClick = (searchValue) => {
        // console.log("searchValue", searchValue, typeof(searchValue))
        this.setState({
            searchPlaceHolder: searchValue
        })
    }

    handleInputClick = e => {
        //  console.log("====::::::", e)
        const { searchPlaceHolder } = this.state
        if (searchPlaceHolder === "Search for images here " && e.type === "click") {
            this.setState({
                searchPlaceHolder: " "
            })
        }
    }



    render() {
        const { loadMore, searchPlaceHolder, showLoadMore, showPopup, popUpPicId, accessKey, dataOfPopUpPics, searchValue, limitPerPage } = this.state;
        console.log("from the render of app the state is", this.state)
        const { handleClick, onChange, handleEnterKey, handlePopUp, togglePopup, handleLoadMore, handleHeaderSearchTagClick, handleInputClick, toggleHandleLoadMore } = this;


        return (
            <div className="container">
                <Background
                    accessKey={accessKey}
                />
                <div className="content">
                    <Header
                        handleHeaderSearchTagClick={handleHeaderSearchTagClick}
                    />
                    <SearchBar
                        onChange={onChange}
                        handleEnterKey={handleEnterKey}
                        value={searchPlaceHolder}
                        handleClick={handleClick}
                        placeholder={searchPlaceHolder}
                        handleInputClick={handleInputClick}
                    />
                    <Grid
                        accessKey={accessKey}
                        handlePopUp={handlePopUp}
                        searchValue={searchValue}
                        loadMore={loadMore}
                        toggleHandleLoadMore={toggleHandleLoadMore}
                        limitPerPage={limitPerPage}
                        toggleHandleLoadMore={toggleHandleLoadMore}

                    />
                    {
                        showLoadMore ?
                            <div><button className="loadBtn" onClick={handleLoadMore}>Load More</button></div>
                            : null
                    }
                    {showPopup ?
                        <PopUp
                            text='Click "Close Button" to hide popup'
                            closePopup={togglePopup}
                            popUpPicId={popUpPicId}
                            accessKey={accessKey}
                            data={dataOfPopUpPics}
                        />
                        : null
                    }
                    <Footer
                        handleHeaderSearchTagClick={handleHeaderSearchTagClick}
                    />
                </div>


            </div>
        );
    }
}
export default App;

