import {useState} from "react";
import Navbar from "../../components/navbar/NavBar.jsx";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";

export default function EditPatientPage() {
    const [patient, setPatient] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const handlePatientChange = (e) => {
        const {name, value} = e.target;
        setPatient({...patient, [name]: value});
    };

    const handlePatientSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Patient:', patient);
        // Aquí iría la lógica para actualizar los datos en el servidor
    };

    const handleSearch = () => {
        // Lógica para buscar el paciente en el sistema
        // Simulamos un resultado de búsqueda
        const result = {
            owner: {name: "John Doe", phone: "123456789", email: "john@example.com", address: "123 Main St"},
            patient: {name: "Rex", species: "Dog", breed: "Labrador", age: 5}
        };
        setSearchResult(result);
        setPatient(result.patient);
    };

    return (
        <div>
            <Navbar/>
            <div className="tabview-container card">
                <div className="p-fluid">
                    <h2>Buscar Paciente</h2>
                    <div className="p-field">
                        <label htmlFor="search-criteria">Buscar por nombre del paciente</label>
                        <InputText id="search-criteria" value={searchCriteria}
                                   onChange={(e) => setSearchCriteria(e.target.value)}/>
                    </div>
                    <Button label="Buscar" onClick={handleSearch} className="p-mt-2"/>
                </div>
                {searchResult && (
                    <form onSubmit={handlePatientSubmit} className="p-fluid">
                        <h2>Datos del Propietario</h2>
                        <div className="p-field">
                            <label htmlFor="owner-name">Nombre</label>
                            <InputText id="owner-name" name="name" value={searchResult.owner.name} readOnly/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="owner-phone">Teléfono</label>
                            <InputText id="owner-phone" name="phone" value={searchResult.owner.phone} readOnly/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="owner-email">Email</label>
                            <InputText id="owner-email" name="email" value={searchResult.owner.email} readOnly/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="owner-address">Dirección</label>
                            <InputTextarea id="owner-address" name="address" value={searchResult.owner.address} rows={3}
                                           readOnly/>
                        </div>
                        <h2>Datos del Paciente</h2>
                        <div className="p-field">
                            <label htmlFor="patient-name">Nombre</label>
                            <InputText id="patient-name" name="name" value={patient?.name || ''}
                                       onChange={handlePatientChange} required/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="patient-species">Especie</label>
                            <InputText id="patient-species" name="species" value={patient?.species || ''}
                                       onChange={handlePatientChange}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="patient-breed">Raza</label>
                            <InputText id="patient-breed" name="breed" value={patient?.breed || ''}
                                       onChange={handlePatientChange}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="patient-age">Edad</label>
                            <InputText id="patient-age" name="age" value={patient?.age || ''}
                                       onChange={handlePatientChange}/>
                        </div>
                        <Button type="submit" label="Actualizar Paciente" className="p-mt-2"/>
                    </form>
                )}
            </div>
        </div>
    );
}