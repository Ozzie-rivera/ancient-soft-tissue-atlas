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

        if (count > 20) return "#08306b";
        if (count > 10) return "#2171b5";
        if (count > 5) return "#6baed6";
        if (count > 0) return "#c6dbef";
        return "#EEE";
    };

    return (
        <div className="statistics-container">
            <h1>Statistics</h1>
            <p className="statistics-intro">
                <div>
                    Following are several important statistics about the content of the ASTA Database.
                </div>
            </p>

            <h3>Image Count</h3>
            <div className="statistics-list">
                There are {n_images} images in the ASTA Database.
            </div>
            <br/>

            <h3>Images per Interval</h3>
            <div className="histogram">
                {histogramData.map(([interval, count]) => (
                    <div key={interval} className="histogram-bar-container">
                        <span className="histogram-label">{interval}</span>
                        <div
                            className="histogram-bar"
                            style={{
                                width: `${count * 20}px`
                            }}
                        >
                            {count}
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
                        <div
                            className="taxon_histogram-bar"
                            style={{
                                width: `${count * 20}px`
                            }}
                        >
                            {count}
                        </div>
                    </div>
                ))}
            </div>
            <br/>

            <h3>Images per Country</h3>
            <div className="map-container">
                <ComposableMap projectionConfig={{ scale: 150 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map((geo) => {
                        const countryName = geo.properties.name;
                        return (
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={(evt) => {
                                const countryName = geo.properties.name;
                                const count = countryCounts[countryName] || 0;

                                setTooltip({
                                visible: true,
                                content: `${countryName}: ${count} images`,
                                x: evt.clientX,
                                y: evt.clientY
                                });
                            }}
                            onMouseMove={(evt) => {
                                setTooltip((prev) => ({
                                ...prev,
                                x: evt.clientX,
                                y: evt.clientY
                                }));
                            }}
                            onMouseLeave={() => {
                                setTooltip({
                                visible: false,
                                content: "",
                                x: 0,
                                y: 0
                                });
                            }}
                            style={{
                                default: {
                                fill: getColor(geo.properties.name),
                                outline: "none"
                                },
                                hover: {
                                fill: "#f53",
                                outline: "none"
                                },
                                pressed: {
                                outline: "none"
                                }
                            }}
                            />
                        );
                    })
                    }
                </Geographies>
                </ComposableMap>

                    {tooltip.visible && (
                    <div
                        className="map-tooltip"
                        style={{
                        left: tooltip.x + 10,
                        top: tooltip.y + 10
                        }}
                    >
                        {tooltip.content}
                    </div>
                    )}

            </div>

        </div>
    );
}

export default Statistics;
