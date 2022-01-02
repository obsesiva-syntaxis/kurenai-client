//React Library | Doc: https://es.reactjs.org/docs/getting-started.html
import React from 'react';

//React Modal Library | Doc: https://www.npmjs.com/package/react-modal
import Modal from 'react-modal';

//Apollo Syntax | Doc: https://www.apollographql.com/docs/
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT, DELETE_EVENT } from '../../../../graphql/event';

//Redux Syntax | Doc: https://es.redux.js.org/docs/
// import { useDispatch, useSelector } from 'react-redux';
// import { modalState } from '../../../../redux/actions/modal';

//Sweet Alert Library | Doc: https://sweetalert2.github.io/#usage
import Swal from 'sweetalert2';

//Moment Library | Doc: https://momentjs.com/docs/
import moment from 'moment';

//React-PDF Library | Doc: https://react-pdf.org/advanced#on-the-fly-rendering
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../../../functions/pdfStyles';
// import { MyDoc } from '../../../../utils/PDFgenerator';

import './ModalEvent.scss';

Modal.setAppElement('#root');

export default function ModalEvent(props) {

    const { showModal, setShowModal, eventSelected, refetch, handleSetupEvent } = props;

    const [ deleteEvent ] = useMutation(DELETE_EVENT);

    const { data, loading } = useQuery(GET_EVENT, {
        variables: {
            id: eventSelected
        }
    });
    const closeModal = () => {
        setShowModal(false);
    }

    const handleEditEvent = () => {
        setShowModal(false);
        handleSetupEvent('edit');
    }

    const handleDeleteEvent = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Eliminando evento seleccionado...',
            showCancelButton: true,
            confirmButtonColor: '#4BB543',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proceder',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.isConfirmed) {
                try {
                    deleteEvent({
                        variables: {
                            id: getEventById.id
                        }
                    });
                    Swal.fire(
                        'Eliminado!',
                        'El evento ha sido eliminado exitosamente!',
                        'success'
                    ).then(result => {
                        if (result.isConfirmed) {
                            refetch();
                            setShowModal(false);
                        }
                    })
                } catch (err) {
                    console.log(err);
                }
            }
        });

    }

    if (loading) return null;

    const { getEventById } = data;
    if(!getEventById) return null;
    
    const MyDoc = () => (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ Estudio Kurenai ~
                </Text>
                <Text style={styles.title}>
                    Consentimiento Informado
                </Text>
                <Text style={styles.text}>
                    Documento de consentimiento informado para someterse a técnicas de arte corporal (tatuaje) según establece
                    el organismo Ministerio de Salud en el Decreto Supremo N° 304/2002, Reglamento de Tatuajes y Prácticas
                    Similares por la que se regula este documento. Todos los procedimientos serán realizados con técnica aséptica,
                    de acuerdo a las Normas de Prevención y Control de Infecciones Asociadas a la atención en Salud vigentes, del
                    Ministerio de Salud.
                    Este registro estará sometido al secreto que establece la ley N° 19.628 para los datos personales y su contenido
                    solamente será develado en las situaciones de emergencia sanitaria a la autoridad sanitaria, para quien deberá
                    estar disponible en todo momento.
                </Text>

                <Text style={styles.title}>Datos de identificación</Text>
                <View style={styles.table1}>
                    <Text style={styles.textInfo}>Nombre: Bruno Salas Oliva</Text>
                    <Text style={styles.textInfo}>Dirección: Los espinos 69, Limonares, Viña del mar.</Text>


                    <Text style={styles.tableTitle}>Tatuador</Text>
                </View>

                <View style={styles.table2}>
                    <View style={styles.infoFlex}>
                        <View style={styles.infoBlock}>
                            <Text style={styles.textInfo}>Nombre: {getEventById.name}</Text>
                            <Text style={styles.textInfo}>Rut: {getEventById.rut}</Text>
                            <Text style={styles.textInfo}>Dirección: {getEventById.address}</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.textInfo}>Edad: {moment().diff(getEventById.birdDate, 'years')}</Text>
                            <Text style={styles.textInfo}>Fecha Nacimiento: {moment(getEventById.birdDate).format('DD [de] MMMM [del] YYYY')}</Text>
                            <Text style={styles.textInfo}>Email: {getEventById.email}</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.textInfo}>Teléfono: {getEventById.phoneNumber}</Text>
                        </View>
                    </View>

                    <Text style={styles.tableTitle}>Cliente</Text>
                </View>

                <View style={styles.table3}>

                    <View style={styles.infoFlex}>
                        <View style={styles.infoBlock}>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>¿Comiste en las últimas 3 hrs?</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Alergias</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Bajas Defensas</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Embarazada</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Diabetes</Text><Text style={styles.textInfo2}>___</Text>
                            </View>

                        </View>
                        <View style={styles.infoBlock}>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Aspirina los últimos días</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Hemofilia, mala coagulación o sangrado abundante</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Consumo de alcohol las últimas horas</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Te has tatuado antes</Text><Text style={styles.textInfo2}>___</Text>
                            </View>

                        </View>
                        <View style={styles.infoBlock}>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Consumo de drogas las últimas horas</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Hepatitis B o C</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>VIH</Text><Text style={styles.textInfo2}>___</Text>
                            </View>

                        </View>
                        <View style={styles.infoBlock}>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Tendencia a desmayos</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Estás bajo control o tratamiento médico</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Queloides</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                            <View style={styles.textInfoFlex}>
                                <Text style={styles.textInfo1}>Algún problema dermatológico?</Text><Text style={styles.textInfo2}>___</Text>
                            </View>
                        </View>
                    </View>

                    {/* <Text style={styles.spacing}> </Text> */}
                    <Text style={styles.tableTitle}>Antecedentes de salud</Text>
                </View>

                <Text style={styles.title}>
                    MEDIDAS HIGIÉNICAS QUE SE ADOPTARÁN PARA PROTEGER LA SALUD DEL CLIENTE
                </Text>
                <Text style={styles.text}>
                    · Empleo de material de un solo uso estéril · Abrir o romper sello de todo el material en presencia del cliente · Limpieza o desinfección del área
                    de trabajo y la zona anatómica sobre la que se va a tatuar · Desechado del material sobrante el presencia del cliente · Uso de guantes de un
                    solo uso (desechables)
                    Comprendo que un tatuaje es una herida en la piel que puede sufrir la evolución de cualquier herida, incluyendo infecciones, irritaciones,
                    inflamaciones y otras dolencias causadas por motivos muy diversos, entre los cuales se incluye una curación inadecuada, sensibilidad específica
                    de cada piel, alergias, estado del sistema inmunológico de cada persona y otras causas. Estoy informado(a) de que el tatuaje en la zona lumbar
                    puede resultar un problema en caso de necesitar anestesia epidural en el futuro. Entiendo y acepto que en la realización de un tatuaje puedo
                    desarrollar una alergia a alguno de los materiales utilizados. Cualquier problema derivado de mi tatuaje que no esté demostradamente
                    causado por una mala praxis (uso materiales estériles, desinfección del material o instalaciones) no será responsabilidad del tatuador.
                </Text>

                <View style={styles.table4}>
                    <Text style={styles.tableTitleAlert}>Precauciones</Text>

                    <View style={styles.alertTable}>
                        <View style={styles.alertTableItem}>
                            <Text style={styles.textInfo}>Situaciones ante las cuales no es recomendable la aplicación de técnicas del arte corporal
                                de manera temporal.</Text>

                            <Text style={styles.alertTableText}>- Intervenciones quirúrgicas recientes.</Text>
                            <Text style={styles.alertTableText}>- Quimioterapia o radioterapia.</Text>
                            <Text style={styles.alertTableText}>- Infección local o general por bacterias, hongos o virus.</Text>
                            <Text style={styles.alertTableText}>- Cicatrices no estabilizadas.</Text>
                            <Text style={styles.alertTableText}>- Quemaduras recientes.</Text>
                            <Text style={styles.alertTableText}>- Heridas o Úlceras.</Text>

                            <Text style={styles.alertTableTextRed}>SI PADECE DE ALGUNA DE ESTAS RE-AGENDE SU CITA HASTA UNA NUEVA EVALUACIÓN</Text>
                        </View>
                        <View style={styles.alertTableItem}>
                            <Text style={styles.textInfo}>Situaciones ante las cuales no es recomendable la aplicación de técnicas del arte corporal
                                si no es bajo supervisión médica.</Text>
                            <Text style={styles.alertTableText}>- Diabetes.</Text>
                            <Text style={styles.alertTableText}>- Cardiopatías.</Text>
                            <Text style={styles.alertTableText}>- Portador de VIH.</Text>
                            <Text style={styles.alertTableText}>- Portador de hepatitis B y C.</Text>
                            <Text style={styles.alertTableText}>- Prótesis (valvulares, ortopédicas, etc).</Text>

                            <Text style={styles.alertTableTextRed}>SI PADECE DE ALGUNA DE ESTAS, EL CLIENTE AL FIRMAR ESTE DOCUMENTO DECLARA
                                FEHACIENTEMENTE QUE ESTÁ BAJO CONTROL MÉDICO Y TRATAMIENTO ADECUADO Y EN
                                CONDICIONES ÓPTIMAS PARA SER TATUADO(A)</Text>
                        </View>
                    </View>

                    <Text style={styles.tableTitleAlert}>Contraindicaciones</Text>

                    <View style={styles.alertTable}>
                        <View style={styles.alertTableItem}>
                            <Text style={styles.textInfo}>Situaciones ante las cuales no es recomendable la aplicación de técnicas del
                                arte corporal bajo ninguna excusa.</Text>
                        </View>
                        <View style={styles.alertTableItem}>
                            <Text style={styles.alertTableText}>- Inmunodeprimidos por cualquier causa.</Text>
                            <Text style={styles.alertTableText}>- Embarazadas.</Text>
                            <Text style={styles.alertTableText}>- Hemofilia.</Text>
                        </View>
                    </View>

                </View>

                <Text style={styles.titleAlert}>
                    Si en los días posteriores a la aplicación apareciese cualquier reacción o alteración en la zona tatuada se recomienda consultar a un médico.
                </Text>
                <Text style={styles.finalText}>
                    Yo {getEventById.name} (cliente) con rut {getEventById.rut} declaro en este acto haber sido informado por
                    escrito y verbalmente sobre el procedimiento y resultados esperables, sus características, potenciales riesgos y/o complicaciones generales y el
                    cuidado del tatuaje. Acepto que el tatuador identificado en este documento realice el procedimiento de tatuaje propuesto.
                    Y, como prueba del mismo firmo el presente documento en presencia del tatuador, cuya firma de compromiso se acompaña.
                </Text>

                <Text style={styles.title}>
                    FIRMAS
                </Text>

                <View style={styles.footer}>
                    <View style={styles.footerItem}>
                        <Text style={styles.footerText}>____________________________</Text>
                        <Text style={styles.footerText}>Tatuador</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Text style={styles.footerText}>____________________________</Text>
                        <Text style={styles.footerText}>Cliente</Text>
                    </View>
                </View>

                {/* <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed /> */}
            </Page>
        </Document>
    );

    return (
        <Modal className="modal-event" overlayClassName="modal-fondo" isOpen={showModal} closeTimeoutMS={200} onRequestClose={closeModal} >

            <h1 className="modal-event__title">Información Evento</h1>
            <div className="modal-event__body">

                <div>
                    <label>Nombre del evento: </label>
                    <label>{getEventById.title}</label>
                </div>

                <div>
                    <label>Instagram: </label>
                    <label>{getEventById.insta}</label>
                </div>

                <div>
                    <label>Día de la sesión: </label>
                    <label>{moment(getEventById.start).format('DD/MM/YYYY')}</label>
                </div>

                <div>
                    <label>Abono: </label>
                    <label>${getEventById.initPayment}</label>
                </div>

                <div>
                    <label>Total a pagar: </label>
                    <label>${getEventById.totalPayment}</label>
                </div>

                <div>
                    <label>Descripción:</label>
                    <p>{getEventById.desc}</p>
                </div>

                <div>
                    <label>Rut: </label>
                    <label>{getEventById.rut}</label>
                </div>

                <div>
                    <label>Nombre: </label>
                    <label>{getEventById.name}</label>
                </div>

                <div>
                    <label>Email: </label>
                    <label>{getEventById.email}</label>
                </div>

                <div>
                    <label>Dirección: </label>
                    <label>{getEventById.address}</label>
                </div>

                <div>
                    <label>Edad del Cliente: </label>
                    <label>{getEventById.birdDate === null ? 'No asignado' : moment().diff(getEventById.birdDate, 'years')}</label>
                </div>

                <div>
                    <label>Teléfono: </label>
                    <label>{getEventById.phoneNumber}</label>
                </div>

                <div>
                    <label>Creado por: </label>
                    <label>{getEventById.user.name}</label>
                </div>


            </div>

            <div className="modal-event__footer">

                <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ?
                            (<button className="modal-event__footer-btn-download">
                                <i className="fas fa-spinner btn-icon"></i>
                            </button>)
                            :
                            (<button className="modal-event__footer-btn-download">
                                <i className="fas fa-file-download btn-icon"></i>
                            </button>)
                    }
                </PDFDownloadLink>

                <button className="modal-event__footer-btn-edit" onClick={handleEditEvent}>
                    <i className="fas fa-pen btn-icon "></i>
                    {/* <label className="modal__footer-btn-text">Editar</label> */}
                </button>
                <button className="modal-event__footer-btn-delete" onClick={handleDeleteEvent}>
                    <i className="fas fa-trash-alt btn-icon"></i>
                    {/* <label className="modal__footer-btn-text">Delete</label> */}
                </button>
                <button className="modal-event__footer-btn-cancel" onClick={closeModal}>
                    <i className="fas fa-sign-out-alt btn-icon "></i>
                    {/* <label className="modal__footer-btn-text">Cancel</label> */}
                </button>
            </div>

        </Modal>

    )
}
