import { imageData } from "../data/imageData3";
import "./Statistics.css";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { useState } from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function Statistics() {
    // map hook
    const [tooltip, setTooltip] = useState({
        visible: false,
        content: "",
        x: 0,
        y: 0
    });
    // number of samples
    const n_samples = new Set(imageData.map(item => item.sample_id)).size;
    // number of images
    const n_images = imageData.length;
    // Count occurrences of each interval
    const intervalCounts = imageData.reduce((acc, item) => {
        const interval = item.interval || "Unknown";
        acc[interval] = (acc[interval] || 0) + 1;
        return acc;
    }, {});
    const histogramData = Object.entries(intervalCounts).sort(
        ([, countA], [, countB]) => countB - countA
    );
    // Count occurrences of each taxon
    const taxonCounts = imageData.reduce((acc, tax) => {
        const taxon = tax.taxon || "Unknown";
        acc[taxon] = (acc[taxon] || 0) + 1;
        return acc;
    }, {});
    const taxon_histogramData = Object.entries(taxonCounts).sort(
        ([, countA], [, countB]) => countB - countA
    );
    // Count occurrences of each cell type
    const cellCounts = imageData.reduce((acc, cell) => {
        const _cell = cell.cell || "Unknown";
        acc[_cell] = (acc[_cell] || 0) + 1;
        return acc;
    }, {});
    const cell_histogramData = Object.entries(cellCounts).sort(
        ([, countA], [, countB]) => countB - countA
    );

    // Count occurrences of each country
    const countryCounts = imageData.reduce((acc, item) => {
        let country = item.country || "Unknown";
        if (country == "England") country = "United Kingdom";
        if (country == "UK") country = "United Kingdom";
        if (country == "USA") country = "United States of America";
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {});

    // Helper: get color based on count
    const getColor = (countryName) => {
        const count = countryCounts[countryName] || 0;
        let ratio = Math.min(1,count/100);
        //if (count > 100) return "#08306b";
        //if (count > 20) return "#2171b5";
        //if (count > 5) return "#6baed6";
        //if (count > 0) return "#c6dbef";
        const r = Math.round(200*(1-ratio));
        const g = Math.round(200*(1-ratio));
        const b = 255;
        if (count > 0) return "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");
        return "#EEE";
    };

    const maxCount = Math.max(...histogramData.map(([_, count]) => count));

    return (
        <div className="statistics-container">
            <h1>Statistics</h1>
            <p className="statistics-intro">
                <div>
                    Following are several important statistics about the content of the ASTA Database.
                </div>
            </p>

            <h3>Sample Count</h3>
            <div className="statistics-list">
                Number of samples in the ASTA Database: <strong>{n_samples}</strong>
            </div>
            <br/>

            <h3>Image Count</h3>
            <div className="statistics-list">
                Number of images in the ASTA Database: <strong>{n_images}</strong>
            </div>
            <br/>

            <h3>Images per Interval</h3>
                <div className="histogram">
                {histogramData.map(([interval, count]) => (
                    <div key={interval} className="histogram-bar-container">
                    <span className="histogram-label">{interval}</span>

                    <div className="histogram-bar-wrapper">
                        <div
                        className="histogram-bar"
                        style={{
                            width: `${(count / maxCount) * 100}%`,
                            backgroundColor: "#4a90e2"
                        }}
                        />
                        <span className="histogram-count">{count}</span>
                    </div>

                    </div>
                ))}
                </div>
            <br/>

            <h3>Images per Taxon</h3>
            <div className="taxon_histogram">
                {taxon_histogramData.map(([taxon, count]) => (
                    <div key={taxon} className="taxon_histogram-bar-container">
                        <span className="taxon_histogram-label">{taxon}</span>
                    <div className="histogram-bar-wrapper">
                        <div
                        className="histogram-bar"
                        style={{
                            width: `${(count / maxCount) * 100}%`,
                            backgroundColor: "#800000"
                        }}
                        />
                        <span className="histogram-count">{count}</span>
                    </div>

                    </div>
                ))}
            </div>
            <br/>

            <h3>Images per Cell Type</h3>
            <div className="cell_histogram">
                {cell_histogramData.map(([cell, count]) => (
                    <div key={cell} className="cell_histogram-bar-container">
                        <span className="cell_histogram-label">{cell}</span>
                    <div className="histogram-bar-wrapper">
                        <div
                        className="histogram-bar"
                        style={{
                            width: `${(count / maxCount) * 100}%`,
                            backgroundColor: "#006400"
                        }}
                        />
                        <span className="histogram-count">{count}</span>
                    </div>

                    </div>
                ))}
            </div>
            <br/>
        </div>
    );
}

export default Statistics;
