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
        // console.log("handle enter key called")
        const { searchPlaceHolder } = this.state;
        e.key === "Enter" ? this.setState({
            searchValue: searchPlaceHolder
        }) : null

    }

    handleLoadMore = () => {
        this.setState({
            loadMore: true
        })

    }

    toggleHandleLoadMore = () => {
        // console.log("toggleHandleloadmore is called re baba")
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

    handlePopUp = async (picId, picUser) => {
        const { accessKey, } = this.state;
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
            searchValue: searchValue
        })
    }

    handleInputClick = e => {
        const { searchPlaceHolder } = this.state
        if (searchPlaceHolder === "Search for images here " && e.type === "click") {
            this.setState({
                searchPlaceHolder: " "
            })
        }
    }






    render() {
        const { loadMore, searchPlaceHolder, showLoadMore, showPopup, popUpPicId, accessKey, dataOfPopUpPics, searchValue, limitPerPage } = this.state;
        // console.log("from the render of app the state is", this.state)
        const { handleClick, onChange, handleEnterKey, handlePopUp, togglePopup, handleLoadMore, handleHeaderSearchTagClick, handleInputClick, toggleHandleLoadMore } = this;

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
                        handleClick={handleClick}
                        placeholder={searchPlaceHolder}
                        handleInputClick={handleInputClick}
                    />
                    <GridContainer
                        handlePopUp={handlePopUp}
                        searchValue={searchValue}
                        loadMore={loadMore}
                        toggleHandleLoadMore={toggleHandleLoadMore}
                        limitPerPage={limitPerPage}
                        toggleHandleLoadMore={toggleHandleLoadMore}
                        handleLoadMore={handleLoadMore}

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