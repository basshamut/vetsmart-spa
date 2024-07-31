import {useState} from "react";
import Navbar from "../../components/navbar/NavBar.jsx";
import {TabPanel, TabView} from "primereact/tabview";
import './PatientPage.css';
import PatientForm from "../../components/form/patien/PatientForm.jsx";

export default function PatientPage() {
    return (
        <div>
            <Navbar/>
            <div className="tabview-container card">
                <TabView>
                    <TabPanel header="Nuevo ingreso">
                        <PatientForm type={"NEW"}/>
                    </TabPanel>
                    <TabPanel header="Paciente Existente">
                        <PatientForm type={"UPDATE"}/>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}
