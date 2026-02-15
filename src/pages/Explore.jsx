import { useState } from "react";
import "./Explore.css";
import ImageCard from "../components/ImageCard";
import { imageData } from "../data/imageData3";
import JSZip from "jszip";

function Explore() {
    const alltaxons = [...new Set(imageData.map(row => row.taxon))].sort();
    const intervals = [...new Set(imageData.map(row => row.interval))].sort();
    const tissues = [...new Set(imageData.map(row => row.tissue))].sort();
    const sites = [...new Set(imageData.map(row => row.site))].sort();

    const [taxon, setTaxon] = useState("");
    const [tissue, setTissue] = useState("");
    const [interval, setInterval] = useState("");
    const [site, setSite] = useState("");
    const [textQuery, setTextQuery] = useState("");

    const [results, setResults] = useState([]);
    const nresults = results.length;

    const handleSearch = () => {
        console.log("Selected filters:");
        console.log("Taxon:", taxon);
        console.log("Tissue:", tissue);
        console.log("Interval:", interval);
        console.log("Site:", site);

        const filtered = imageData.filter((item) => {
            const matchesFilters = (
                (taxon === "" || item.taxon === taxon) &&
                (tissue === "" || item.tissue === tissue) &&
                (interval === "" || item.interval === interval) &&
                (site === "" || item.site === site)
            );

            const q = textQuery.trim().toLowerCase();
            const matchesText = q === "" || (
                (item.description && item.description.toLowerCase().includes(q)) ||
                (item.taxon && item.taxon.toLowerCase().includes(q)) ||
                (item.tissue && item.tissue.toLowerCase().includes(q)) ||
                (item.interval && item.interval.toLowerCase().includes(q)) ||
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
        setTaxon("");
        setTissue("");
        setInterval("");
        setSite("");
        setTextQuery("");
        setResults([]);
    }; 

    return (
        <div>
            <h1>Explore the Atlas</h1>
            
            <label>
                Taxon:{" "}
                <select value={taxon} onChange={(e) => setTaxon(e.target.value)}>
                    <option value="">--Select Taxon--</option>
                        {alltaxons.map((taxon, index) => (
                            <option key={index} value={taxon}>
                                {taxon}
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
                Interval:{" "}
                <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                    <option value="">--Select Interval--</option>
                        {intervals.map((e, index) => (
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
                    placeholder="search descriptions, taxon, tissue..."
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
                        taxon={item.taxon}
                        tissue={item.tissue}
                        interval={item.interval}
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
