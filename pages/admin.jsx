import AdminLayout from "../layout/AdminLayoud"
import useSWR from 'swr'
import axios from "axios"
import Orden from "../components/Orden"

export default function Admin() {

//Esto que se pondra a continuacion sera para que cuando se cargue un produc to la peticion http que se haga a la base de datos sea en tiempo real
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
    const {data, error, isLoading} = useSWR('/api/ordenes', fetcher,{refreshInterval:100})

    console.log(data);

    return(
        <AdminLayout pagina = {'Admin'} >
            <h1 className="text-4xl font-black ">Panel de Administración</h1>
            <p className="text-2xl mt-10">Administra tus ordenes</p>
            {data && data.length ? data.map(orden => 
                <Orden key={orden.id} orden={orden} />
                ) :<p>No hay ordenes pendientes</p>}
        </AdminLayout>
    )
}