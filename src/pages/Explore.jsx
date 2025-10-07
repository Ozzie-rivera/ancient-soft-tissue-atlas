import { useState } from "react";
import "./Explore.css";
import ImageCard from "../components/ImageCard";


function Explore() {

    const [species, setSpecies] = useState("");
    const [tissue, setTissue] = useState("");
    const [eon, setEon] = useState("");

    const [results, setResults] = useState([]);

    const placeholderResults = [
        {
            id: 1,
            species: "Triceratops",
            tissue: "Bone",
            eon: "Mesozoic",
            imageUrl: "https://placehold.co/200x200?text=Triceratops+Bone",
            photographer: "Jim Solliday"
        },
        {
            id: 2, 
            species: "T-Rex",
            tissue: "Collagen",
            eon: "Mesozoic",
            imageUrl: "https://placehold.co/200x200?text=T-Rex+Collagen",
            photographer: "Jim Solliday",
        },
        {
            id: 3, 
            species: "Permian Organism",
            tissue: "Red Blood Cells",
            eon: "Paleozoic",
            imageUrl: "https://placehold.co/200x200?text=Permian+Cells",
            photographer: "Jim Solliday",
        }
    ];

    const handleSearch = () => {
        console.log("Selected filters:");
        console.log("Species:", species);
        console.log("tissue:", tissue);
        console.log("Eon:", eon);

    const filtered = placeholderResults.filter((item) => {
        return (
            (species === "" || item.species === species) &&
            (tissue === "" || item.tissue === tissue) &&
            (eon === "" || item.eon === eon)
        );
    });

        //To show all place holder images for now
        setResults(filtered);
    };
    

    return (
        <div>
            <h1>Explore the Atlas</h1>


            <label>
                Species:{" "}
                <select value={species} onChange={(e) => setSpecies(e.target.value)}>
                    <option value="">--Select Species--</option>
                    <option value="Triceratops">Triceratops</option>
                    <option value="T-Rex">T-Rex</option>
                    <option value="Permian Organism">Permian Organism</option>
                </select>
            </label>
            <br />


            <label>
                Tissue:{" "}
                <select value={tissue} onChange={(e) => setTissue(e.target.value)}>
                    <option value="">--Select Tissue--</option>
                    <option value="Bone">Bone</option>
                    <option value="Red Blood Cells">Red Blood Cells</option>
                    <option value="Collagen">Collagen</option>
                </select>
            </label>
            <br />


            <label>
                Eon:{" "}
                <select value={eon} onChange={(e) => setEon(e.target.value)}>
                    <option value="">--Select Eon--</option>
                    <option value="Mesozoic">Mesozoic</option>
                    <option value="Paleozoic">Paleozoic</option>
                </select>
            </label>
            <br />


            <button onClick={handleSearch}>Search</button>

            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                {results.map((item) => (
                    <ImageCard
                        key={item.id}
                        imageUrl={item.imageUrl}
                        species={item.species}
                        tissue={item.tissue}
                        eon={item.eon}
                        photographer={item.photographer}
                    />
                ))}
            </div>


        </div>
    );
}

export default Explore;