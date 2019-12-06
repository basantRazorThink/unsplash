import React, { Component } from 'react';
import PopUp from "./PopUp";

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
        };
    }

    async componentDidMount() {
        this.setState({
            currentPageNo: 1
        });

        let { currentPageNo, accessKey } = this.state;
        const searchValue = "random"
        const limitPerPage = `9-per-page`;
        const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=${currentPageNo}&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`)
        const data = await jsonData.json();

        console.log("frm cmpodidmnt", data)

        if (data) {
            this.setState({
                searchContent: data.results
            })
        }

    }

    onChange = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }

    handleEnterKey = async (e) => {
        const { searchValue, accessKey, currentPageNo } = this.state;
        const limitPerPage = `9-per-page`;
        if (e.key === 'Enter') {
            // server returns json 
            const jsonData = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=${limitPerPage}&query=${searchValue}&client_id=${accessKey}`)
            const data = await jsonData.json();

            if (data) {
                this.setState({
                    searchContent: data.results
                })
            }

            if (currentPageNo < data.total_pages) {
                this.setState({
                    showLoadMore: true
                })
            }


        }

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
        // const { accessKey, popUpPicId } = this.state;
        // console.log("4rm handlePopUPfunction of parent", accessKey, popUpPicId);
        // const jsonData = await fetch(`https://api.unsplash.com/photos/?${popUpPicId}&client_id=${accessKey}`);
        // const data = await jsonData.json();

        // const finalDataForPopUp = await data.map((pic, index) => {
        //             console.log("===", pic.urls.small);
        //             return (<div key={index}>
        //                 <img src={pic.urls.small} alt={pic.alt_description} />
        //             </div>)
        //         })
        // this.setState({content: data})
        // let displayPics;
        // if (data) {
        //     displayPics = data.map((pic, index) => {
        //         console.log("===", pic.urls.small);
        //         <div key={index}>
        //             <img src={pic.urls.small} alt={pic.alt_description} />
        //         </div>
        //     })
        // }

        // console.log("from ===== chikilaka", displayPics);
        // console.log("from ===== chikilaka", final);
        // this.setState({
        //     dataOfPopUpPics: finalDataForPopUp,
        // })

    }

    handlePopUp = async (picId) => {

        console.log("from handle popup", picId)
        this.setState({
            popUpPicId: picId
        })

        const { accessKey, popUpPicId } = this.state;
        console.log("4rm handlePopUPfunction of parent", accessKey, popUpPicId);
        const jsonData = await fetch(`https://api.unsplash.com/photos/?:${popUpPicId}&client_id=${accessKey}`);
        const data = await jsonData.json();
        console.log("=======>>>>>>", data)
        const finalDataForPopUp = await data.map((pic, index) => {
                    console.log("===", pic.urls.small);
                    return (<div key={index} className="popuppics">
                        <img src={pic.urls.thumb} alt={pic.alt_description} />
                    </div>)
                })
        // this.setState({content: data})
        // let displayPics;
        // if (data) {
        //     displayPics = data.map((pic, index) => {
        //         console.log("===", pic.urls.small);
        //         <div key={index}>
        //             <img src={pic.urls.small} alt={pic.alt_description} />
        //         </div>
        //     })
        // }

        // console.log("from ===== chikilaka", displayPics);
        // console.log("from ===== chikilaka", final);
        this.setState({
            dataOfPopUpPics: finalDataForPopUp,
        })

    }

    render() {
        const { gridPics, searchContent, showLoadMore, showPopup, popUpPicId, accessKey, dataOfPopUpPics } = this.state;
        console.log("from the render the state is", this.state)
        let gridContents;
        // if (gridPics) {
        //     gridContents = gridPics.map((pic, index) => {
        //         return (
        //             <div key={index} className="gridItem" >
        //                 <img src={pic.urls.small} alt={pic.alt_description} />
        //             </div>
        //         )

        //     })
        // }

        if (searchContent) {
            gridContents = searchContent.map((pic, index) => {
                return (
                    <div
                        key={index}
                        className="gridItem"
                        id={pic.id}
                    >
                        <img className="img" src={pic.urls.small} alt={pic.alt_description}
                            onClick={() => {
                                this.handlePopUp(pic.id)
                            }}
                        />
                    </div>
                )
            })
        }

        return (
            <div>
                <div className="searchInputContainer">
                    <input
                        onChange={this.onChange}
                        onKeyDown={this.handleEnterKey}
                        value={this.searchPlaceHolder}
                    />
                </div>
                <div className="gridContainer" >
                    {gridContents}

                </div>
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

                <button onClick={this.togglePopup}> Click To Launch Popup</button>

            </div>
        );
    }
}
export default App;

