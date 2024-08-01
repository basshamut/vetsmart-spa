import {useState, useEffect} from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import {InputText} from 'primereact/inputtext'
import {Calendar} from 'primereact/calendar'
import Navbar from "../../components/navbar/NavBar.jsx"

const VaccineAndTreatmentControlPage = () => {
    const [records, setRecords] = useState([])
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [displayDialog, setDisplayDialog] = useState(false)
    const [newRecord, setNewRecord] = useState(false)
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

    useEffect(() => {
        // Simulación de datos para propósitos de ejemplo
        const mockRecords = [
            {
                recordId: 1,
                patient: {id: 1, name: 'Max'},
                type: 'Vacuna',
                name: 'Rabia',
                date: new Date('2024-01-15'),
                veterinarian: 'Dr. Smith',
                notes: 'Anual'
            },
            {
                recordId: 2,
                patient: {id: 2, name: 'Luna'},
                type: 'Tratamiento',
                name: 'Desparasitación',
                date: new Date('2024-02-10'),
                veterinarian: 'Dr. Brown',
                notes: 'Mensual'
            },
            // Agrega más registros según sea necesario
        ]
        setRecords(mockRecords)
    }, [])

    const handleDialogVisibility = (visible) => {
        setDisplayDialog(visible)
    }

    const handleNewRecord = () => {
        setSelectedRecord({type: '', name: '', date: null, veterinarian: '', notes: ''})
        setNewRecord(true)
        handleDialogVisibility(true)
    }

    const saveRecord = () => {
        let updatedRecords = [...records]
        if (newRecord) {
            const newId = records.length + 1
            updatedRecords.push({...selectedRecord, recordId: newId})
        } else {
            const index = updatedRecords.findIndex(rec => rec.recordId === selectedRecord.recordId)
            if (index !== -1) {
                updatedRecords[index] = selectedRecord
            }
        }
        setRecords(updatedRecords)
        handleDialogVisibility(false)
    }

    const deleteRecord = () => {
        const updatedRecords = records.filter(rec => rec.recordId !== selectedRecord.recordId)
        setRecords(updatedRecords)
        setDeleteDialogVisible(false)
        setSelectedRecord(null)
    }

    const recordDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                    onClick={() => handleDialogVisibility(false)}/>
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveRecord}/>
        </>
    )

    const deleteDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text"
                    onClick={() => setDeleteDialogVisible(false)}/>
            <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={deleteRecord}/>
        </>
    )

    return (
        <div>
            <Navbar/>
            <div className="vaccine-treatment-control-component">
                <div className="tabview-container card">
                    <h2>Control Básico de Vacunas y Tratamientos</h2>
                    <DataTable value={records} selectionMode="single" dataKey="recordId">
                        <Column field="recordId" header="ID" sortable/>
                        <Column field="patient.name" header="Paciente" sortable/>
                        <Column field="type" header="Tipo" sortable/>
                        <Column field="name" header="Nombre" sortable/>
                        <Column field="date" header="Fecha" sortable
                                body={(rowData) => rowData.date.toLocaleDateString()}/>
                        <Column field="veterinarian" header="Veterinario" sortable/>
                        <Column field="notes" header="Notas"/>
                    </DataTable>
                    <Button label="Nuevo Registro" icon="pi pi-plus" className="p-button-success"
                            style={{marginTop: '1rem'}} onClick={handleNewRecord}/>

                    {/* Dialogo para crear/editar registro */}
                    <Dialog visible={displayDialog} style={{width: '450px'}}
                            header={newRecord ? 'Crear Registro' : 'Editar Registro'} modal
                            onHide={() => handleDialogVisibility(false)} footer={recordDialogFooter}>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="type">Tipo</label>
                                <InputText id="type" value={selectedRecord?.type || ''}
                                           onChange={(e) => setSelectedRecord({
                                               ...selectedRecord,
                                               type: e.target.value
                                           })}/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="name">Nombre</label>
                                <InputText id="name" value={selectedRecord?.name || ''}
                                           onChange={(e) => setSelectedRecord({
                                               ...selectedRecord,
                                               name: e.target.value
                                           })}/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="date">Fecha</label>
                                <Calendar id="date" value={selectedRecord?.date}
                                          onChange={(e) => setSelectedRecord({...selectedRecord, date: e.value})}
                                          dateFormat="yy-mm-dd" showIcon/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="veterinarian">Veterinario</label>
                                <InputText id="veterinarian" value={selectedRecord?.veterinarian || ''}
                                           onChange={(e) => setSelectedRecord({
                                               ...selectedRecord,
                                               veterinarian: e.target.value
                                           })}/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="notes">Notas</label>
                                <InputText id="notes" value={selectedRecord?.notes || ''}
                                           onChange={(e) => setSelectedRecord({
                                               ...selectedRecord,
                                               notes: e.target.value
                                           })}/>
                            </div>
                        </div>
                    </Dialog>

                    {/* Dialogo para confirmar eliminación */}
                    <Dialog visible={deleteDialogVisible} style={{width: '450px'}} header="Confirmar Eliminación" modal
                            onHide={() => setDeleteDialogVisible(false)} footer={deleteDialogFooter}>
                        <div className="confirmation-content">
                            <p>¿Está seguro que desea eliminar este registro?</p>
                            <p><strong>ID:</strong> {selectedRecord?.recordId}</p>
                            <p><strong>Paciente:</strong> {selectedRecord?.patient?.name}</p>
                            <p><strong>Tipo:</strong> {selectedRecord?.type}</p>
                            <p><strong>Nombre:</strong> {selectedRecord?.name}</p>
                            <p><strong>Fecha:</strong> {selectedRecord?.date?.toLocaleDateString()}</p>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default VaccineAndTreatmentControlPage
