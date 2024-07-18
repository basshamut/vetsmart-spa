import { useState } from "react";
import Navbar from "../../components/navbar/NavBar.jsx";
import { TabPanel, TabView } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import './AddNewPatientPage.css';

export default function AddNewPatientPage() {
    const [searchCriteria, setSearchCriteria] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [patient, setPatient] = useState(null);
    const [newPatient, setNewPatient] = useState({
        owner: { name: '', phone: '', email: '', address: '' },
        patient: { name: '', species: '', breed: '', age: '' }
    });

    const handleSearch = () => {
        // Lógica para buscar el paciente en el sistema
        // Simulamos un resultado de búsqueda
        const result = {
            owner: { name: "John Doe", phone: "123456789", email: "john@example.com", address: "123 Main St" },
            patient: { name: "Rex", species: "Dog", breed: "Labrador", age: 5 }
        };
        setSearchResult(result);
        setPatient(result.patient);
    };

    const handlePatientChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleNewPatientChange = (e, section) => {
        const { name, value } = e.target;
        setNewPatient({ ...newPatient, [section]: { ...newPatient[section], [name]: value } });
    };

    const handleNewPatientSubmit = (e) => {
        e.preventDefault();
        console.log('New Patient:', newPatient);
        // Aquí iría la lógica para guardar los datos del nuevo paciente en el servidor
    };

    const handlePatientSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Patient:', patient);
        // Aquí iría la lógica para actualizar los datos en el servidor
    };

    return (
        <div>
            <Navbar />
            <div className="tabview-container card">
                <TabView>
                    <TabPanel header="Nuevo ingreso">
                        <form onSubmit={handleNewPatientSubmit} className="p-fluid">
                            <h2>Datos del Propietario</h2>
                            <div className="p-field">
                                <label htmlFor="new-owner-name">Nombre</label>
                                <InputText id="new-owner-name" name="name" value={newPatient.owner.name} onChange={(e) => handleNewPatientChange(e, 'owner')} required />
                            </div>
                            <div className="p-field">
                                <label htmlFor="new-owner-phone">Teléfono</label>
                                <InputText id="new-owner-phone" name="phone" value={newPatient.owner.phone} onChange={(e) => handleNewPatientChange(e, 'owner')} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="new-owner-email">Email</label>
                                <InputText id="new-owner-email" name="email" value={newPatient.owner.email} onChange={(e) => handleNewPatientChange(e, 'owner')} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="new-owner-address">Dirección</label>
                                <InputTextarea id="new-owner-address" name="address" value={newPatient.owner.address} onChange={(e) => handleNewPatientChange(e, 'owner')} rows={3} />
                            </div>
                            <h2>Datos del Paciente</h2>
                            <div className="p-field">
                                <label htmlFor="new-patient-name">Nombre</label>
                                <InputText id="new-patient-name" name="name" value={newPatient.patient.name} onChange={(e) => handleNewPatientChange(e, 'patient')} required />
                            </div>
                            <div className="p-field">
                                <label htmlFor="new-patient-species">Especie</label>
                                <InputText id="new-patient-species" name="species" value={newPatient.patient.species} onChange={(e) => handleNewPatientChange(e, 'patient')} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="new-patient-breed">Raza</label>
                                <InputText id="new-patient-breed" name="breed" value={newPatient.patient.breed} onChange={(e) => handleNewPatientChange(e, 'patient')} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="new-patient-age">Edad</label>
                                <InputText id="new-patient-age" name="age" value={newPatient.patient.age} onChange={(e) => handleNewPatientChange(e, 'patient')} />
                            </div>
                            <Button type="submit" label="Registrar Paciente" className="p-mt-2" />
                        </form>
                    </TabPanel>
                    <TabPanel header="Paciente Existente">
                        <div className="p-fluid">
                            <h2>Buscar Paciente</h2>
                            <div className="p-field">
                                <label htmlFor="search-criteria">Buscar por nombre del paciente</label>
                                <InputText id="search-criteria" value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
                            </div>
                            <Button label="Buscar" onClick={handleSearch} className="p-mt-2" />
                        </div>
                        {searchResult && (
                            <form onSubmit={handlePatientSubmit} className="p-fluid">
                                <h2>Datos del Propietario</h2>
                                <div className="p-field">
                                    <label htmlFor="owner-name">Nombre</label>
                                    <InputText id="owner-name" name="name" value={searchResult.owner.name} readOnly />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="owner-phone">Teléfono</label>
                                    <InputText id="owner-phone" name="phone" value={searchResult.owner.phone} readOnly />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="owner-email">Email</label>
                                    <InputText id="owner-email" name="email" value={searchResult.owner.email} readOnly />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="owner-address">Dirección</label>
                                    <InputTextarea id="owner-address" name="address" value={searchResult.owner.address} rows={3} readOnly />
                                </div>
                                <h2>Datos del Paciente</h2>
                                <div className="p-field">
                                    <label htmlFor="patient-name">Nombre</label>
                                    <InputText id="patient-name" name="name" value={patient?.name || ''} onChange={handlePatientChange} required />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="patient-species">Especie</label>
                                    <InputText id="patient-species" name="species" value={patient?.species || ''} onChange={handlePatientChange} />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="patient-breed">Raza</label>
                                    <InputText id="patient-breed" name="breed" value={patient?.breed || ''} onChange={handlePatientChange} />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="patient-age">Edad</label>
                                    <InputText id="patient-age" name="age" value={patient?.age || ''} onChange={handlePatientChange} />
                                </div>
                                <Button type="submit" label="Actualizar Paciente" className="p-mt-2" />
                            </form>
                        )}
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}
