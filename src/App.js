import React from 'react';

import Home from "./containers/Home/Home";
import Layout from "./hoc/Layout/Layout";

function App() {
    return (
        <Layout>
            <Home/>
        </Layout>
    );
}

export default App;
