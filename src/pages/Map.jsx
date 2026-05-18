import { imageData } from "../data/imageData3";
import "./Map.css";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { useState } from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function Map() {
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
        <div className="map-container">
            <h2>Images per Country</h2>
            Use your mouse to hover over a country to see how many images come from tissues from that country.
            Darker blue colors indicate a hugher number of images.
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

export default Map;
