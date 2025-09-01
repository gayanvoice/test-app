import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layouts/Layout.jsx";
import Index from "./features/Index.jsx";
import Summary from './features/Summary.jsx';
import Add from "./features/Add.jsx";
import Upload from "./features/Upload.jsx";
import NotFound from "./features/NotFound.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/sensors/index" element={<Index />} />
                    <Route path="/sensors/add" element={<Add />} />
                    <Route path="/sensors/summary" element={<Summary />} />
                    <Route path="/sensors/upload" element={<Upload />} />
                    <Route errorElement={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
