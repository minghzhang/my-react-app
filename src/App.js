import {useState} from "react";
import Gallery from "./component/Gallery";
import MoviePlay from "./component/MoviePlay";
import FilterableProductTable from "./component/FilterableProductTable"
import From from "./component/StateManager"

export default function App() {
    return (
        <>
            {/*
            <FilterableProductTable/>
*/}
            <From status="success"/>

        </>
    );
}