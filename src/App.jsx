import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' // Import necessary components
import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import LoginPage from "./pages/commons/LoginPage.jsx";
import DashboardPage from "./pages/commons/DashboardPage.jsx";
import AddNewPatientPage from "./pages/patients/AddNewPatientPage.jsx";
import DischargePage from "./pages/patients/DischargePage.jsx";
import EditPatientPage from "./pages/patients/EditPatientPage.jsx";

function InnerApp() {
    // const navigate = useNavigate()
    //
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const sessionUser = getSession()
    //         if (!sessionUser) {
    //             navigate('/virtual-dojo/frontend/login')
    //         }
    //     }, SESSION_DURATION) // Verifica cada 1 minuto
    //     return () => clearInterval(interval)
    // }, [])

    return (
        <>

            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path={"/new-patient"} element={<AddNewPatientPage/>}/>
                <Route path="/discharge-patient" element={<DischargePage/>}/>
                <Route path="/edit-patient" element={<EditPatientPage/>}/>
            </Routes>
        </>
    )

}

function App() {
    return (
        <>
            <div className="App">
                <Router>
                    <InnerApp/>
                </Router>
            </div>
        </>
    );
}

export default App;