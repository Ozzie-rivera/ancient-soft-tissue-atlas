import { useState } from "react";
import "./Explore.css";
import ImageCard from "../components/ImageCard";
import { imageData } from "../data/imageData";


function Explore() {

    const [species, setSpecies] = useState("");
    const [tissue, setTissue] = useState("");
    const [eon, setEon] = useState("");
    const [textQuery, setTextQuery] = useState("");

    const [results, setResults] = useState([]);

    const handleSearch = () => {
        console.log("Selected filters:");
        console.log("Species:", species);
        console.log("tissue:", tissue);
        console.log("Eon:", eon);

        const filtered = imageData.filter((item) => {
            const matchesFilters = (
                (species === "" || item.species === species) &&
                (tissue === "" || item.tissue === tissue) &&
                (eon === "" || item.eon === eon)
            );

            const q = textQuery.trim().toLowerCase();
            const matchesText = q === "" || (
                (item.description && item.description.toLowerCase().includes(q)) ||
                (item.species && item.species.toLowerCase().includes(q)) ||
                (item.tissue && item.tissue.toLowerCase().includes(q))
            );

            return matchesFilters && matchesText;
        });

        // Map imageData to include the full image URL path
        const resultsWithUrls = filtered.map((item) => ({
            ...item,
            imageUrl: `/newimages/${item.filename}`
        }));

        setResults(resultsWithUrls);
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

            <label>
                Search text: {" "}
                <input
                    type="text"
                    placeholder="search descriptions, species, tissue..."
                    value={textQuery}
                    onChange={(e) => setTextQuery(e.target.value)}
                    style={{ width: "320px" }}
                />
            </label>
            <br />


            <button onClick={handleSearch}>Search</button>

            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                {results.map((item) => (
                    <ImageCard
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        species={item.species}
                        tissue={item.tissue}
                        eon={item.eon}
                        description={item.description}
                    />
                ))}
            </div>


        </div>
    );
}

export default Explore;