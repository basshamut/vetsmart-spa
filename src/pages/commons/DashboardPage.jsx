import Navbar from "../../components/navbar/NavBar.jsx";
import Dashboard from "../../components/dashboard/Dashboard.jsx";

function DashboardPage() {
    return (
        <div>
            <Navbar/>
            <div>
                <Dashboard/>
            </div>
        </div>
    );
}

export default DashboardPage;