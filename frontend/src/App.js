import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useWallet } from "./context/WalletContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import QualityCheck from "./pages/QualityCheck";
import Inspection from "./pages/Inspection";
import Transfer from "./pages/Transfer";
import Documents from "./pages/Documents";
import TrackProduct from "./pages/TrackProduct";
import AssignRoles from "./pages/AssignRoles";
//import GenerateQR from "./pages/GenerateQR";
import VerifyQR from "./pages/VerifyQR";
import RecallProduct from "./pages/RecallProduct";
function App() {

    const { wallet } = useWallet();

    if (!wallet) {
        return <Login />;
    }

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route path="/products" element={<Products />} />

                <Route path="/create-product" element={<CreateProduct />} />

                <Route path="/quality-check" element={<QualityCheck />} />

                <Route path="/inspection" element={<Inspection />} />

                <Route path="/transfer" element={<Transfer />} />

                <Route path="/documents" element={<Documents />} />

                <Route path="/track-product" element={<TrackProduct />} />

                <Route path="*" element={<Navigate to="/" />} />

                <Route path="/roles" element={<AssignRoles />} />

                <Route path="/verify-qr" element={<VerifyQR />} />

               <Route path="/recall" element={<RecallProduct />} />
            </Routes>

        </BrowserRouter>
    );

}

export default App;