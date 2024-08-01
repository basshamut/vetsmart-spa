import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Dashboard.css';

const Dashboard = () => {
    // Ejemplo de datos de consultas para el día, la semana y el mes
    const consultasDia = [
        { paciente: 'Max', veterinario: 'Dr. Smith', fecha: '2024-08-01', dia: 'Jueves', hora: '10:00 AM' },
        { paciente: 'Luna', veterinario: 'Dr. Brown', fecha: '2024-08-01', dia: 'Jueves', hora: '11:30 AM' },
    ];

    const consultasSemana = [
        { paciente: 'Max', veterinario: 'Dr. Smith', fecha: '2024-08-01', dia: 'Jueves', hora: '10:00 AM' },
        { paciente: 'Luna', veterinario: 'Dr. Brown', fecha: '2024-08-01', dia: 'Jueves', hora: '11:30 AM' },
        { paciente: 'Bella', veterinario: 'Dr. Garcia', fecha: '2024-08-02', dia: 'Viernes', hora: '2:00 PM' },
        { paciente: 'Rocky', veterinario: 'Dr. Johnson', fecha: '2024-08-03', dia: 'Sabado', hora: '3:15 PM' },
    ];

    const consultasMes = [
        { paciente: 'Max', veterinario: 'Dr. Smith', fecha: '2024-08-01', dia: 'Jueves', hora: '10:00 AM' },
        { paciente: 'Luna', veterinario: 'Dr. Brown', fecha: '2024-08-01', dia: 'Jueves', hora: '11:30 AM' },
        { paciente: 'Bella', veterinario: 'Dr. Garcia', fecha: '2024-08-02', dia: 'Viernes', hora: '2:00 PM' },
        { paciente: 'Rocky', veterinario: 'Dr. Johnson', fecha: '2024-08-03', dia: 'Sabado', hora: '3:15 PM' },
        { paciente: 'Coco', veterinario: 'Dr. Lee', fecha: '2024-08-21', dia: 'Miércoles', hora: '9:30 AM' },
        { paciente: 'Toby', veterinario: 'Dr. White', fecha: '2024-08-30', dia: 'Viernes', hora: '4:00 PM' },
    ];

    return (
        <div className="consultas-component">
            <h2 className="consultas-welcome">Bienvenido a tu dashboard de consultas</h2>

            <h3>Consultas para hoy</h3>
            <DataTable value={consultasDia}>
                <Column field="paciente" header="Paciente" />
                <Column field="veterinario" header="Veterinario" />
                <Column field="hora" header="Hora" />
            </DataTable>

            <h3>Consultas para esta semana</h3>
            <DataTable value={consultasSemana}>
                <Column field="paciente" header="Paciente" />
                <Column field="veterinario" header="Veterinario" />
                <Column field="hora" header="Hora" />
            </DataTable>

            <h3>Consultas para este mes</h3>
            <DataTable value={consultasMes}>
                <Column field="paciente" header="Paciente" />
                <Column field="veterinario" header="Veterinario" />
                <Column field="hora" header="Hora" />
            </DataTable>
        </div>
    );
};

export default Dashboard;
