import React, { Component, useState, useEffect } from 'react';
import Background from "./components/Background";
import Main from "./components/Main/Main";
import { client_id } from "./Constants";
import "./styles.css";

class App extends Component {
    render() {
        // console.log("APP.JS rendered");
        return (
            <div className="container">
                <Background
                    accessKey={client_id}
                />
                <Main />
                

            </div>
        );
    }
}
export default App;

// slanting cut in html