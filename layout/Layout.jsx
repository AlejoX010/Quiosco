import Head from 'next/head'
import Sidebard from '../components/Sidebard';
import Modal from 'react-modal'//El modal debe de instalarse con la dependencia de npm i react-modal
import { ToastContainer } from 'react-toastify';//El toastify debe de instalarse con la dependencia de npm i react-toastify
import useQuiosco from '../hooks/useQuiosco';
import ModalProducto from '../components/ModalProducto';
import Pasos from '../components/Pasos';

import 'react-toastify/dist/ReactToastify.css'

//Estilos de la dependencia para el modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
//En este se pone el id del elemento que se va a modificar el elemento base
  Modal.setAppElement('#__next');
//Se podria decir que este sera como el componente madre el cual va a cambiar dependiendo de el apartado que se le herede
const Layout = ({children, pagina}) => {
    const {modal}=useQuiosco()
    return (
        <>
            <Head>
                <title>Coffee - {pagina}</title>
                <meta name='description' content='Quiosco Cafetería' />
            </Head>

            <div className='flex'>
                {/* Esta será la sidebard que no cambiara sin importar la ruta en la que estemos */}
                <aside className='md: w-4/12 xl:w-1/4 2xl:w-1/5'>
                    <Sidebard/>
                </aside>
                {/* Este sera el main que cambiara dependiendo de lo que seleccionemos en la sidebard */}
                <main className='md: w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll'>
                    <Pasos/>
                    <div className='mt-10 ml-5'>{children}</div>
                </main>
            </div>
            {modal && <Modal isOpen={modal} style={customStyles}><ModalProducto/></Modal>}
            <ToastContainer/>
        </>
    );
}

export default Layout;
