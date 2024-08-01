import {useState} from 'react'
import {Menubar} from 'primereact/menubar'
import {InputText} from 'primereact/inputtext'
import {Badge} from 'primereact/badge'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faEnvelope, faFile, faStar, faUsers} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const [searchVisible, setSearchVisible] = useState(false)
    const [messagesVisible, setMessagesVisible] = useState(false)
    const [notificationsVisible, setNotificationsVisible] = useState(false)

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/vetsmart/dashboard'
        },
        {
            label: 'Gestión de Pacientes',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'Ingresar Datos', icon: 'pi pi-plus', command: () => {
                        navigate('/vetsmart/new-patient')
                    }
                },
                {
                    label: 'Dar de Baja', icon: 'pi pi-minus', command: () => {
                        navigate('/vetsmart/delete-patient')
                    }
                }
            ]
       },
        {
            label: 'Gestión de Citas',
            icon: 'pi pi-envelope',
            command: () => {
                navigate('/vetsmart/apointment')
            }
        },
        {
            label: 'Gestión de Vacunas y Tratamientos',
            icon: 'pi pi-briefcase',
            command: () => {
                navigate('/vetsmart/vaccine')
            }
        }
    ]

    const handleLogout = () => {
        navigate('/vetsmart/login')
    }

    const handleSeaerch = () => {
        navigate('/vetsmart/search-result')
    }

    const end = (
        <div className="p-d-flex p-ai-center">
            <Button icon="pi pi-search" className="p-button-rounded p-button-text p-button-plain"
                    onClick={() => setSearchVisible(true)}/>
            <Button icon="pi pi-comments" className="p-button-rounded p-button-text p-button-plain"
                    onClick={() => setMessagesVisible(true)}>
                <Badge value="3" severity="danger"/>
            </Button>
            <Button icon="pi pi-bell" className="p-button-rounded p-button-text p-button-plain"
                    onClick={() => setNotificationsVisible(true)}>
                <Badge value="15" severity="warning"/>
            </Button>
            <Button icon="pi pi-sign-out" className="p-button-rounded p-button-text p-button-plain"
                    onClick={handleLogout}/>
        </div>
    )

    return (
        <>
            <Menubar model={items} end={end} className="p-mb-2"/>

            <Dialog header="Search" visible={searchVisible} style={{width: '50vw'}}
                    onHide={() => setSearchVisible(false)}>
                <div className="p-inputgroup">
                    <InputText placeholder="Search"/>
                    <Button icon="pi pi-search" onClick={handleSeaerch}/>
                </div>
            </Dialog>

            <Dialog header="Messages" visible={messagesVisible} style={{width: '30vw'}}
                    onHide={() => setMessagesVisible(false)}>
                <ul className="p-list-unstyled">
                    <li className="p-mb-2">
                        <div className="p-d-flex p-ai-center">
                            <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="p-mr-2 p-avatar"/>
                            <div>
                                <h5 className="p-m-0">Brad Diesel <FontAwesomeIcon icon={faStar}
                                                                                   className="p-text-danger p-ml-2"/>
                                </h5>
                                <p className="p-m-0">Call me whenever you can...</p>
                                <small className="p-text-muted"><FontAwesomeIcon icon={faClock} className="p-mr-1"/> 4
                                    Hours Ago</small>
                            </div>
                        </div>
                    </li>
                    <li className="p-mb-2">
                        <div className="p-d-flex p-ai-center">
                            <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="p-mr-2 p-avatar"/>
                            <div>
                                <h5 className="p-m-0">John Pierce <FontAwesomeIcon icon={faStar}
                                                                                   className="p-text-muted p-ml-2"/>
                                </h5>
                                <p className="p-m-0">I got your message bro</p>
                                <small className="p-text-muted"><FontAwesomeIcon icon={faClock} className="p-mr-1"/> 4
                                    Hours Ago</small>
                            </div>
                        </div>
                    </li>
                    <li className="p-mb-2">
                        <div className="p-d-flex p-ai-center">
                            <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="p-mr-2 p-avatar"/>
                            <div>
                                <h5 className="p-m-0">Nora Silvester <FontAwesomeIcon icon={faStar}
                                                                                      className="p-text-warning p-ml-2"/>
                                </h5>
                                <p className="p-m-0">The subject goes here</p>
                                <small className="p-text-muted"><FontAwesomeIcon icon={faClock} className="p-mr-1"/> 4
                                    Hours Ago</small>
                            </div>
                        </div>
                    </li>
                </ul>
                <Button label="See All Messages" className="p-button-text p-mt-2"/>
            </Dialog>

            <Dialog header="Notifications" visible={notificationsVisible} style={{width: '30vw'}}
                    onHide={() => setNotificationsVisible(false)}>
                <ul className="p-list-unstyled">
                    <li className="p-mb-2">
                        <FontAwesomeIcon icon={faEnvelope} className="p-mr-2"/> 4 new messages
                        <small className="p-float-right p-text-muted">3 mins</small>
                    </li>
                    <li className="p-mb-2">
                        <FontAwesomeIcon icon={faUsers} className="p-mr-2"/> 8 friend requests
                        <small className="p-float-right p-text-muted">12 hours</small>
                    </li>
                    <li className="p-mb-2">
                        <FontAwesomeIcon icon={faFile} className="p-mr-2"/> 3 new reports
                        <small className="p-float-right p-text-muted">2 days</small>
                    </li>
                </ul>
                <Button label="See All Notifications" className="p-button-text p-mt-2"/>
            </Dialog>
        </>
    )
}

export default Navbar
