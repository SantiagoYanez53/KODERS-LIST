<></>
import { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx';
import { createKoder, getKoders, deleteKoder } from "./Api"

export default function Koders() {
  const [koders,setKoders] = useState ([]);

  //recibe 2 parametros
  // 1. Una funcion 
  // 2. un arreglo de dependencias
  //useEffect se usa para ejecutar cofigo en partes especificas del ciclo de vida de
  //un componente
  //useEffect se ejecuta en 2 momentos
  //1. cuando el componente se renderiza por primera vez
  //2. cuando alguna de las dependencias cambia 
  useEffect(() => {
    console.log("Hola")
    getKoders()
    .then((koders) => {
      console.log ("Koders", koders);
      setKoders(koders)

    })
    .catch( (error) => {
      console.error("Error al obtener koders", error);
      alert("Error al obtener koders")
    })
  
  }, [])

  function onDelete (koderId) {
    deleteKoder(koderId)
    .then(() => {
      getKoders ()
      .then((koders) => {
        setKoders(koders);
      })
      .catch ((error) => {
        console.error("Error al obtener koders", error)
        alert("Error al eliminar koder")
      })
    })
    .catch ((error) => {
      console.error("Error al eliminar Koder", error)
      alert("Error al eliminar Koders")
    })

  }


  const { register, handleSubmit, formState: { errors,isValid, isSubmitted}, reset, setFocus } = useForm()

  /*function removeKoder(indexToRemove) {
    const newKoder = koders.filter(((koder,idx) => idx !== indexToRemove))
    setKoders(newKoder)
  }*/

  async function onSubmit(data) {
    try {
      await createKoder({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    })

    const kodersList = await getKoders ();
    setKoders(kodersList);
    setFocus("firstName")
    reset();
    } catch (error) {
      console.error("Error al crear koder" , error)
      alert("Error al crear koder")
    }
  }

  return (
    <main className='w-full min-h-screen'>
      <p className='w-full bg-red-500 text-black font-bold text-center p-2'>REGISTRO DE KODERS📒</p>
      <form className='flex flex-row gap-2 justify-center p-5'
      onSubmit={handleSubmit(onSubmit)}>
        <input
        type='text'
        className={clsx('p-2 rounded-sm text-black w-3/12', {
          "border-3 border-red-800 bg-red-500" : errors.koder,
        })}
        placeholder='Ingrese Nombre'
        required
        { ...register ("firstName", {
          required: { value:true, message:"Necesitamos un nombre"},
          minLength: { value:2, message: "Si tienes un nombre de una sola letra no puedes, carnal"},
          maxLength: { value: 100, message:"te llamas Uvuvwevwevwe Onyetenyevwe Ugwemuhwem Osas?"}
        })}
        />

        <input
        type='text'
        className={clsx('p-2 rounded-sm text-black w-3/12', {
          "border-3 border-red-800 bg-red-500" : errors.koder,
        })}
        placeholder='Ingrese Apellido'
        required
        { ...register ("lastName", {
          required: { value:true, message:"Necesitamos un apellido"},
          minLength: { value:2, message: "Minimo 2 caracteres"},
          maxLength: { value: 100, message:"Okay... no tienes un apellido más corto?"}
        })}
        />

        <input
        type='email'
        className={clsx('p-2 rounded-sm text-black w-3/12', {
          "border-3 border-red-800 bg-red-500" : errors.koder,
        })}
        placeholder='Ingrese un correo'
        required
        { ...register ("email", {
          required: { value:true, message:"Necesitamos un correo"},
          minLength: { value:2, message: "Minimo 12 caracteres"},
          maxLength: { value: 100, message:"Como recuerdas ese correo?"}
        })}
        />

        <button 
        className="text-black bg-white px-3 rounded disabled:bg-stone-400"
        disabled={isSubmitted ? !isValid :false }>
        Registrar
        </button>

      </form>
      {errors.koder && (
        <p className='text-red-500 text-lg text-center'> {errors.koder ?.message}</p>
      )}

      <div className='max-w-screen-sm mx-auto pt-4 flex flex-col gap-4'>
        {
          koders.length === 0 && ( <p className='text-slate-300'>No hay Koders registrados</p>)
        }
        {
           koders.map((koder,idx) => {
            return (
              <div key={`koder-${idx}`} className='bg-white/70 text-black rounded p-4 flex flex-row justify-between items-center'>
                <p>🙎{koder.firstName} {koder.lastName} </p>
                <p>✉️{koder.email}</p>
                <button className="text-red-500 hover:bg-red-500 hover:text-white rounded-full size-6 text-center" onClick={() => onDelete(koder.id)}>X</button>
              </div>
            )
           })  
        }
      </div>
    </main>
  )






































}
