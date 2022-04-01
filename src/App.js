import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootswatch/dist/litera/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Error404 from "./views/public-components/Error404";

import AdminLogin from "./views/admin/views/AdminLogin";
import Home from "./views/admin/views/Home";
import ManageAdmins from "./views/admin/views/ManageAdmins";
import ManageContests from "./views/admin/views/ManageContests";
import ManageEvents from "./views/admin/views/ManageEvents";
import ManageGallery from "./views/admin/views/ManageGallery";

import Homepage from "./views/main-views/views/Homepage";
import Events from "./views/main-views/views/Events";
import Gallery from "./views/main-views/views/Gallery";
import Contests from './views/main-views/views/Contests';
import ContestDetail from "./views/main-views/views/ContestDetail";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* ADMIN URLS */}
				<Route path="*" element={<Error404/>}/>
				<Route path="admin/login" element={<AdminLogin/>} title=""/>
				<Route path="admin/home" element={<Home/>}/>
				<Route path="admin/admins" element={<ManageAdmins/>}/>
				<Route path="admin/events" element={<ManageEvents/>}/>
				<Route path="admin/contests" element={<ManageContests/>}/>
				<Route path="admin/gallery" element={<ManageGallery/>}/>
				{/* MAIN-APP URLS */}
				<Route path="" element={<Homepage/>}/>
				<Route path="/events" element={<Events/>}/>
				<Route path="/gallery" element={<Gallery/>}/>
				<Route path="/contests" element={<Contests/>}/>
				<Route path="/contests/:id" element={<ContestDetail/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;