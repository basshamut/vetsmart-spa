import Navbar from "../../components/navbar/NavBar.jsx";
import Appointment from "../../components/appointment/Appointment.jsx";

export default function AppointmentPage() {
    return (
        <div>
            <Navbar/>
            <div className="tabview-container card">
                <Appointment/>
            </div>
        </div>
    );
}