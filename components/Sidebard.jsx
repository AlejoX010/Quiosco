import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco';

const Sidebard = () => {
    const {categorias, categoriaActual, handleClickCategoria} = useQuiosco()
    
    return (
        <>
            <Image priority width={300} height={100} src="/assets/img/logo.svg" alt='imagen logo café'/>
            <nav className='mt-10'>
                {categorias.map(categoria => (
                    
                    <button key={categoria.id} onClick={()=> handleClickCategoria(categoria.id)} type='button' className={`${categoriaActual?.id === categoria.id ? 'bg-yellow-400':''} w-full flex items-center gap-5 hover:bg-yellow-400 p-5 border`}>
                        <div className='ml-5'>
                        <Image priority  width={80} height={80} src={`/assets/img/icono_${categoria.icono}.svg`} alt='Imagen icono'/>
                        </div>
                       
                        <p className='text-2xl inline-bloc font-bold'>{categoria.nombre}</p>
                    </button>

                ))}
            </nav>
        </>
    );
}

export default Sidebard;
