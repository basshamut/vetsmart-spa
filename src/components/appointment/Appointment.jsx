import { useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [newAppointment, setNewAppointment] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    useEffect(() => {
        // Simulación de datos para propósitos de ejemplo
        const mockAppointments = [
            { appointmentId: 1, patient: { id: 1, name: 'Max' }, date: new Date('2024-08-01'), time: '10:00', veterinarian: 'Dr. Smith', reason: 'Checkup', status: 'Pending' },
            { appointmentId: 2, patient: { id: 2, name: 'Luna' }, date: new Date('2024-08-02'), time: '11:30', veterinarian: 'Dr. Brown', reason: 'Vaccination', status: 'Confirmed' },
            // Agrega más citas según sea necesario
        ];
        setAppointments(mockAppointments);
    }, []);

    const handleDialogVisibility = (visible) => {
        setDisplayDialog(visible);
    };

    const handleAppointmentSelect = (appointment) => {
        setSelectedAppointment(appointment);
        setNewAppointment(false);
        handleDialogVisibility(true);
    };

    const handleNewAppointment = () => {
        setSelectedAppointment({ date: null, time: '', veterinarian: '', reason: '', status: '' });
        setNewAppointment(true);
        handleDialogVisibility(true);
    };

    const saveAppointment = () => {
        let updatedAppointments = [...appointments];
        if (newAppointment) {
            const newId = appointments.length + 1;
            updatedAppointments.push({ ...selectedAppointment, appointmentId: newId });
        } else {
            const index = updatedAppointments.findIndex(appt => appt.appointmentId === selectedAppointment.appointmentId);
            if (index !== -1) {
                updatedAppointments[index] = selectedAppointment;
            }
        }
        setAppointments(updatedAppointments);
        handleDialogVisibility(false);
    };

    const deleteAppointment = () => {
        const updatedAppointments = appointments.filter(appt => appt.appointmentId !== selectedAppointment.appointmentId);
        setAppointments(updatedAppointments);
        setDeleteDialogVisible(false);
        setSelectedAppointment(null);
    };

    const editAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setNewAppointment(false);
        handleDialogVisibility(true);
    };

    const confirmDeleteAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setDeleteDialogVisible(true);
    };

    const appointmentDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => handleDialogVisibility(false)} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveAppointment} />
        </>
    );

    const deleteDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialogVisible(false)} />
            <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={deleteAppointment} />
        </>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" onClick={() => editAppointment(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" onClick={() => confirmDeleteAppointment(rowData)} />
            </div>
        );
    };

    return (
        <div className="appointment-crud-component">
            <h2>Gestión de Citas Médicas</h2>
            <DataTable value={appointments} selectionMode="single" dataKey="appointmentId">
                <Column field="appointmentId" header="ID" sortable />
                <Column field="patient.name" header="Paciente" sortable />
                <Column field="date" header="Fecha" sortable body={(rowData) => rowData.date.toLocaleDateString()} />
                <Column field="time" header="Hora" sortable />
                <Column field="veterinarian" header="Veterinario" sortable />
                <Column field="reason" header="Motivo" />
                <Column field="status" header="Estado" />
                <Column body={actionBodyTemplate} header="Acciones" />
            </DataTable>
            <Button label="Nueva Cita" icon="pi pi-plus" className="p-button-success" style={{ marginTop: '1rem' }} onClick={handleNewAppointment} />

            {/* Dialogo para crear/editar cita */}
            <Dialog visible={displayDialog} style={{ width: '450px' }} header={newAppointment ? 'Crear Cita' : 'Editar Cita'} modal onHide={() => handleDialogVisibility(false)} footer={appointmentDialogFooter}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="patient">Paciente</label>
                        <InputText id="patient" value={selectedAppointment?.patient?.name || ''} readOnly />
                    </div>
                    <div className="p-field">
                        <label htmlFor="date">Fecha</label>
                        <Calendar id="date" value={selectedAppointment?.date} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.value })} dateFormat="yy-mm-dd" showIcon />
                    </div>
                    <div className="p-field">
                        <label htmlFor="time">Hora</label>
                        <InputNumber id="time" value={selectedAppointment?.time} onValueChange={(e) => setSelectedAppointment({ ...selectedAppointment, time: e.value })} mode="decimal" minFractionDigits={2} maxFractionDigits={2} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="veterinarian">Veterinario</label>
                        <InputText id="veterinarian" value={selectedAppointment?.veterinarian || ''} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, veterinarian: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="reason">Motivo</label>
                        <InputText id="reason" value={selectedAppointment?.reason || ''} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, reason: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="status">Estado</label>
                        <InputText id="status" value={selectedAppointment?.status || ''} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, status: e.target.value })} />
                    </div>
                </div>
            </Dialog>

            {/* Dialogo para confirmar eliminación */}
            <Dialog visible={deleteDialogVisible} style={{ width: '450px' }} header="Confirmar Eliminación" modal onHide={() => setDeleteDialogVisible(false)} footer={deleteDialogFooter}>
                <div className="confirmation-content">
                    <p>¿Está seguro que desea eliminar esta cita?</p>
                    <p><strong>ID:</strong> {selectedAppointment?.appointmentId}</p>
                    <p><strong>Paciente:</strong> {selectedAppointment?.patient?.name}</p>
                    <p><strong>Fecha:</strong> {selectedAppointment?.date?.toLocaleDateString()}</p>
                    <p><strong>Hora:</strong> {selectedAppointment?.time}</p>
                </div>
            </Dialog>
        </div>
    );
};

export default Appointment;
