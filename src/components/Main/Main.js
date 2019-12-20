import React from "react";
import PopUp from "../PopUp";
import GridContainer from "../Grid/GridContainer";
import SearchBar from "../SearchBar";
import Header from "../Header";
import Footer from "../Footer";

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            accessKey: "5ee7b68a9600ef9aaf4f3d1773c4f86a729d91f3c87bb43bcfb0cfe2a341604a",
            searchContent: null,
            showLoadMore: true,
            showPopup: false,
            popUpPicId: null,
            dataOfPopUpPics: null,
            searchPlaceHolder: "Search for images here ",
            searchValue: "random",
            // loadMore: false,
            // isSearch: true,
        };
    }
    onChange = (e) => {
        this.setState({
            searchPlaceHolder: e.target.value
        });
    }

    handleEnterKey = async (e) => {
        console.log("handle enter key called")
        const { searchPlaceHolder } = this.state;
        e.key === "Enter" ? this.setState({
            searchValue: searchPlaceHolder,
            
        }) : null

    }
    
    handleInputClick = e => {
        const { searchPlaceHolder } = this.state
        if (searchPlaceHolder === "Search for images here " && e.type === "click") {
            this.setState({
                searchPlaceHolder: ""
            })
        }
    }

    handleSearchIconClick = e => {
        const { searchPlaceHolder } = this.state
        this.setState({
            searchValue: searchPlaceHolder,
        })
    }



    // handleLoadMore = () => {
    //     this.setState({
    //         loadMore: true
    //     })

    // }

    // toggleHandleLoadMore = () => {
    //     // console.log("toggleHandleloadmore is called re baba")
    //     this.setState({
    //         loadMore: false
    //     });
    // }

    

    togglePopup = async () => {
        this.setState({
            showPopup: !this.state.showPopup
        });

    }

    handlePopUp = async (picId, picUser) => {
        const { accessKey, } = this.state;
        // bring client id from constants file
        const jsonData = await fetch(`https://api.unsplash.com/photos/${picId}?client_id=${accessKey}`);
        const data = await jsonData.json();
        this.setState({
            dataOfPopUpPics: data,
            showPopup: !this.state.showPopup
        })

    }
    handleHeaderSearchTagClick = (searchValue) => {
        this.setState({
            searchPlaceHolder: searchValue,
            searchValue: searchValue,
        })
    }

    






    render() {
        const { loadMore, searchPlaceHolder, showLoadMore, showPopup, popUpPicId, accessKey, dataOfPopUpPics, searchValue, limitPerPage, isSearch } = this.state;
        // console.log("from the render of main the state is", this.state)
        const { handleSearchIconClick, onChange, handleEnterKey, handlePopUp, togglePopup, handleLoadMore, handleHeaderSearchTagClick, handleInputClick, toggleHandleLoadMore } = this;

        return (
            <div className="content">
                <div className="content-grid">
                    <Header
                        handleHeaderSearchTagClick={handleHeaderSearchTagClick}
                    />
                    <SearchBar
                        onChange={onChange}
                        handleEnterKey={handleEnterKey}
                        value={searchPlaceHolder}
                        placeholder={searchPlaceHolder}
                        handleSearchIconClick={handleSearchIconClick}
                        handleInputClick={handleInputClick}
                    />
                    <GridContainer
                        handlePopUp={handlePopUp}
                        searchValue={searchValue}
                        // loadMore={loadMore}
                        // toggleHandleLoadMore={toggleHandleLoadMore}
                        // handleLoadMore={handleLoadMore}
                        isSearch={isSearch}

                    />
                </div>
                {showPopup ?
                    <PopUp
                        text='Click "Close Button" to hide popup'
                        closePopup={togglePopup}
                        popUpPicId={popUpPicId}
                        accessKey={accessKey}
                        data={dataOfPopUpPics}
                        accessKey={accessKey}
                    />
                    : null
                }
                <Footer
                    handleHeaderSearchTagClick={handleHeaderSearchTagClick}
                />

            </div>




        );
    }

}

export default Main;

