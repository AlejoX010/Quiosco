import { useContext } from "react";
import QuioscoContext from "../context/QuioscoProvider";

const useQuiosco = () => {
    return useContext(QuioscoContext)
}

export default useQuiosco

//Esto se hace para que sea mas facil llamarlo en donde se necesite con el usequiosco en vez de con el context, pero nunca olvidar que todo los states estaran en el provider