import { useState } from "react";
import "./Explore.css";
import ImageCard from "../components/ImageCard";
import { imageData } from "../data/imageData2";
import JSZip from "jszip";

function Explore() {
    const allspecies = [...new Set(imageData.map(row => row.species))].sort();
    const eons = [...new Set(imageData.map(row => row.eon))].sort();
    const tissues = [...new Set(imageData.map(row => row.tissue))].sort();
    const sites = [...new Set(imageData.map(row => row.site))].sort();

    const [species, setSpecies] = useState("");
    const [tissue, setTissue] = useState("");
    const [eon, setEon] = useState("");
    const [site, setSite] = useState("");
    const [textQuery, setTextQuery] = useState("");

    const [results, setResults] = useState([]);
    const nresults = results.length;

    const handleSearch = () => {
        console.log("Selected filters:");
        console.log("Species:", species);
        console.log("tissue:", tissue);
        console.log("Eon:", eon);
        console.log("Site:", site);

        const filtered = imageData.filter((item) => {
            const matchesFilters = (
                (species === "" || item.species === species) &&
                (tissue === "" || item.tissue === tissue) &&
                (eon === "" || item.eon === eon) &&
                (site === "" || item.site === site)
            );

            const q = textQuery.trim().toLowerCase();
            const matchesText = q === "" || (
                (item.description && item.description.toLowerCase().includes(q)) ||
                (item.species && item.species.toLowerCase().includes(q)) ||
                (item.tissue && item.tissue.toLowerCase().includes(q)) ||
                (item.eon && item.eon.toLowerCase().includes(q)) ||
                (item.site && item.site.toLowerCase().includes(q))
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

    // Convert results to CSV format
    const convertToCSV = (rows) => {
        if (!rows || rows.length === 0) return "";

        const headers = Object.keys(rows[0]);
        const csvRows = [];

        // header line
        csvRows.push(headers.join(","));

        // data lines
        for (const row of rows) {
            const values = headers.map(h => JSON.stringify(row[h] ?? ""));
            csvRows.push(values.join(","));
        }

        return csvRows.join("\n");
    };

    // Trigger browser download
    const downloadCSV = () => {
        const csv = convertToCSV(results);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "explore_results.csv";
        a.click();

        URL.revokeObjectURL(url);
    };
  
    // Download all result images as a ZIP file
    const downloadImagesZip = async () => {
        if (!results || results.length === 0) return;

        const zip = new JSZip();
        const folder = zip.folder("images");

        for (const item of results) {
            try {
                const response = await fetch(item.imageUrl);
                const blob = await response.blob();

                // Use the filename if available
                const filename = item.filename || item.imageUrl.split("/").pop();

                folder.file(filename, blob);
            } catch (err) {
                console.error("Failed to fetch image:", item.imageUrl, err);
            }
        }

        const content = await zip.generateAsync({ type: "blob" });

        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = "images.zip";
        a.click();

        URL.revokeObjectURL(a.href);
    };

    const resetAll = () => {
        setSpecies("");
        setTissue("");
        setEon("");
        setSite("");
        setTextQuery("");
        setResults([]);
    }; 

    return (
        <div>
            <h1>Explore the Atlas</h1>
            
            <label>
                Species:{" "}
                <select value={species} onChange={(e) => setSpecies(e.target.value)}>
                    <option value="">--Select Species--</option>
                        {allspecies.map((spec, index) => (
                            <option key={index} value={spec}>
                                {spec}
                            </option>
                        ))}
                </select>
            </label>
            <br />

            <label>
                Tissue:{" "}
                <select value={tissue} onChange={(e) => setTissue(e.target.value)}>
                    <option value="">--Select Tissue--</option>
                        {tissues.map((tissue, index) => (
                            <option key={index} value={tissue}>
                                {tissue}
                            </option>
                        ))}
                </select>
            </label>
            <br />

            <label>
                Eon:{" "}
                <select value={eon} onChange={(e) => setEon(e.target.value)}>
                    <option value="">--Select Eon--</option>
                        {eons.map((e, index) => (
                            <option key={index} value={e}>
                                {e}
                            </option>
                        ))}
                      </select>
            </label>
            <br />

            <label>
                Site:{" "}
                <select value={site} onChange={(e) => setSite(e.target.value)}>
                    <option value="">--Select Site--</option>
                        {sites.map((s, index) => (
                            <option key={index} value={s}>
                                {s}
                            </option>
                        ))}
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
            <button onClick={resetAll}>Reset</button>
            <button onClick={downloadCSV} disabled={results.length === 0}>
                Download CSV
            </button>
            <button onClick={downloadImagesZip} disabled={results.length === 0}>
                Download Images ZIP
            </button>

            <div>Number of hits: {nresults}</div>

            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                {results.map((item) => (
                    <ImageCard
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        species={item.species}
                        tissue={item.tissue}
                        eon={item.eon}
                        site={item.site}
                        city={item.city}
                        country={item.country}
                        description={item.description}
                    />
                ))}
            </div>


        </div>
    );
}

export default Explore;
