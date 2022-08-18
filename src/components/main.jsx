import React, { useEffect, useState } from "react";
import videoBG from "../assets/videoBG.mp4";
import sulthan from "../assets/sulthan.jpg";
import Select from 'react-select'



const Main = () => {
    const [options, setOptions] = useState([])
    const [userSelect, setuserSelect] = useState("")
    const [IsShow, setIsShow] = useState(false)
    const [pokeImage, setpokeImage] = useState("")

    const getPokemon = async () => {
        const poke = await fetch("https://pokeapi.co/api/v2/pokemon/")
        const value = await poke.json()
        let results = value.results.map(data => {
            return {
                label: data.name,
                value: data.url
            }
        })
        setOptions(results.sort((a, b) => a.label.localeCompare(b.label)))
    }


    useEffect(() => {
        getPokemon()
    }, [])

    const handleSubmit = () => {
        setIsShow(state => !state)
    }
    const handleChange = async (event) => {
        const media = await fetch(event.value)
        const value = await media.json()
        const pokemon = value.sprites.other.dream_world.front_default
        setpokeImage(pokemon)
        setuserSelect(event.label)
    }
    return (
        <div className="main">
            <div className="absolute top-0 left-0 w-full h-full bg-purple-600 bg-opacity-10"></div>
            <video src={videoBG} autoPlay loop muted />
            <div className="absolute top-0 flex flex-col items-center justify-center w-full h-full font-mono text-white">
                <h1 className="mb-2 text-md">Hello, I'm</h1>
                <h2 className="text-5xl animate-bounce">Sulthan Taqi Rabbani</h2>
                <h2 className="mb-5 text-2xl">Please Choose your pokemon</h2>
                <h1 className="text-3xl">{IsShow ? userSelect : ""}</h1>
                {/* <div className="items-center p-5 text-center text-black bg-black bg-opacity-50 rounded-full">
                    <img src={sulthan} alt="" width={300} height={300} className="rounded-full" />
                </div> */}
                {pokeImage ? <img src={pokeImage} fixed alt="" className="object-contain my-5 rounded-lg h-96 w-96" /> : ""}
                <Select className="text-black w-80" options={options} onChange={(e) => handleChange(e)} />
                <button className="w-64 mt-4 text-2xl bg-purple-600 border-2 border-white rounded-lg mb-28" onClick={() => handleSubmit()} disabled={!userSelect}>{IsShow ? "Hide" : "Choose"}</button>
                <p>©2022 Sulthan Taqi Rabbani</p>
            </div>
        </div>
    )
}

export default Main