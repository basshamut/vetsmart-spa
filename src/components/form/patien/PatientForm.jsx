import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useState} from "react";

export default function PatientForm({type}) {
    const [patient, setPatient] = useState({
        owner: {name: '', phone: '', email: '', address: ''},
        patient: {name: '', species: '', breed: '', age: ''}
    });
    const [searchCriteria, setSearchCriteria] = useState('');
    const [searchResult, setSearchResult] = useState(false);

    const handleNewPatientChange = (e, section) => {
        const {name, value} = e.target;
        setPatient({...patient, [section]: {...patient[section], [name]: value}});
    };

    const handleNewPatientSubmit = (e) => {
        e.preventDefault();
        console.log('New Patient:', patient);
        // Aquí iría la lógica para guardar los datos del nuevo paciente en el servidor
    };

    const handleUpdatePatientSubmit = (e) => {
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
        setSearchResult(true);
        setPatient(result);
    };

    const FormFields = () => {
        return (
            <div>
                <h2>Datos del Propietario</h2>
                <div className="p-field">
                    <label htmlFor="new-owner-name">Nombre</label>
                    <InputText id="new-owner-name" name="name" value={patient.owner.name}
                               onChange={(e) => handleNewPatientChange(e, 'owner')} required/>
                </div>
                <div className="p-field">
                    <label htmlFor="new-owner-phone">Teléfono</label>
                    <InputText id="new-owner-phone" name="phone" value={patient.owner.phone}
                               onChange={(e) => handleNewPatientChange(e, 'owner')}/>
                </div>
                <div className="p-field">
                    <label htmlFor="new-owner-email">Email</label>
                    <InputText id="new-owner-email" name="email" value={patient.owner.email}
                               onChange={(e) => handleNewPatientChange(e, 'owner')}/>
                </div>
                <div className="p-field">
                    <label htmlFor="new-owner-address">Dirección</label>
                    <InputTextarea id="new-owner-address" name="address" value={patient.owner.address}
                                   onChange={(e) => handleNewPatientChange(e, 'owner')} rows={3}/>
                </div>
                <h2>Datos del Paciente</h2>
                <div className="p-field">
                    <label htmlFor="new-patient-name">Nombre</label>
                    <InputText id="new-patient-name" name="name" value={patient.patient.name}
                               onChange={(e) => handleNewPatientChange(e, 'patient')} required/>
                </div>
                <div className="p-field">
                    <label htmlFor="new-patient-species">Especie</label>
                    <InputText id="new-patient-species" name="species" value={patient.patient.species}
                               onChange={(e) => handleNewPatientChange(e, 'patient')}/>
                </div>
                <div className="p-field">
                    <label htmlFor="new-patient-breed">Raza</label>
                    <InputText id="new-patient-breed" name="breed" value={patient.patient.breed}
                               onChange={(e) => handleNewPatientChange(e, 'patient')}/>
                </div>
                <div className="p-field">
                    <label htmlFor="new-patient-age">Edad</label>
                    <InputText id="new-patient-age" name="age" value={patient.patient.age}
                               onChange={(e) => handleNewPatientChange(e, 'patient')}/>
                </div>
                <Button type="submit" label="Enviar" className="p-mt-2"/>

            </div>
        )
    }

    return (
        <div>
            {type === 'NEW' &&
                <div>
                    <form onSubmit={handleNewPatientSubmit} className="p-fluid">
                        {<FormFields/>}
                    </form>
                </div>
            }
            {type === 'UPDATE' &&
                <div>
                    <div className="p-fluid">
                        <h2>Buscar Paciente</h2>
                        <div className="p-field">
                            <label htmlFor="search-criteria">Buscar por nombre del paciente</label>
                            <InputText id="search-criteria" value={searchCriteria}
                                       onChange={(e) => setSearchCriteria(e.target.value)}/>
                        </div>
                        <Button label="Buscar" onClick={handleSearch} className="p-mt-2"/>
                    </div>
                    {searchResult &&
                        <div>
                            <form onSubmit={handleUpdatePatientSubmit} className="p-fluid">
                                <FormFields/>
                            </form>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
