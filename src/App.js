import React, { Component, useState, useEffect } from 'react';
import PopUp from "./components/PopUp/PopUp";
import Background from "./components/Background/Background";
import Grid from "./components/Grid/Grid"
import SearchBar from './components/SearchBar/SearchBar';




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
            searchPlaceHolder: " ",
            searchValue: null
        };
    }

   
    onChange = (e) => {
        this.setState({
            searchPlaceHolder: e.target.value
        });
    }

    handleEnterKey = async (e) => {

        const { searchPlaceHolder } = this.state;
        console.log(" from handleEnterKey", e.key === "Enter")
        e.key === "Enter" ? this.setState({
            searchValue: searchPlaceHolder
        }): null

    }

    handleLoadMore = async () => {
        let { currentPageNo, searchValue, accessKey, searchContent } = this.state;
        if (!searchValue) {
            searchValue = "random"
        }
        const limitPerPage = `9-per-page`;
        const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`)
        const data = await jsonData.json();
        console.log("from handl more the data is", data)

        if (currentPageNo < data.total_pages) {
            this.setState({
                currentPageNo: this.state.currentPageNo + 1,
            }, async () => {
                const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=${this.state.currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`)
                const newData = await jsonData.json();
                const finalData = searchContent.concat(newData.results);

                this.setState({
                    searchContent: finalData
                })
            })

        }
        if (currentPageNo == data.total_pages) {
            this.setState({
                showLoadMore: false
            })
        }

    }

    togglePopup = async () => {
        this.setState({
            showPopup: !this.state.showPopup
        });

    }

    handlePopUp = async (picId) => {
        const { accessKey, } = this.state;
        console.log("4rm handlePopUPfunction of parent", accessKey, picId);
        const jsonData = await fetch(`https://api.unsplash.com/photos/${picId}?client_id=${accessKey}`);
        const data = await jsonData.json();
        // console.log("=======>>>>>>", data)
        const finalDataForPopUp = await data.urls.small
        this.setState({
            dataOfPopUpPics: finalDataForPopUp,
            showPopup: !this.state.showPopup
        })

    }

    render() {
        const { gridPics, searchPlaceHolder, showLoadMore, showPopup, popUpPicId, accessKey, dataOfPopUpPics , searchValue} = this.state;
        console.log("from the render the state is", this.state)
        
        
        
        return (
            <div>
                <Background 
                     accessKey= {accessKey}
                  />
                 <SearchBar
                    onChange= {this.onChange}
                    handleEnterKey= {this.handleEnterKey}
                    value={ searchPlaceHolder }
                 />
                <Grid
                   accessKey={accessKey}
                   handlePopUp={this.handlePopUp} 
                   searchValue={searchValue}  
                />
                {
                    showLoadMore ?
                        <div><button onClick={this.handleLoadMore}>Load More</button></div>
                        : null
                }
                {showPopup ?
                    <PopUp
                        text='Click "Close Button" to hide popup'
                        closePopup={this.togglePopup}
                        popUpPicId={popUpPicId}
                        accessKey={accessKey}
                        data={dataOfPopUpPics}
                    />
                    : null
                }


            </div>
        );
    }
}
export default App;

