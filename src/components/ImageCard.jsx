import { useState } from "react";
import { Link } from "react-router-dom";

function ImageCard({ id, imageUrl, taxon, tissue, interval, description }) {
    const [expanded, setExpanded] = useState(false);

    const shortDesc = description
        ? description.length > 140
            ? description.slice(0, 140) + "..."
            : description
        : "";

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", width: "260px" }}>

            <img
                src={imageUrl}
                alt={taxon + " tissue"}
                style={{ width: "220px", height: "200px", objectFit: "cover" }} 
            />

            <h3>{taxon}</h3>
            <p><strong>Tissue:</strong> {tissue}</p>
            <p><strong>Interval:</strong> {interval}</p>

            {description && (
                <div>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                        <strong>Description:</strong> {expanded ? description : shortDesc}
                    </p>
                    {description.length > 140 && (
                        <button onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
                            {expanded ? "Show less" : "Read more"}
                        </button>
                    )}
                </div>
            )}

            <button
            onClick={() => {
                const width = 800;
                const height = 600;
                const left = window.screenX + (window.innerWidth - width) / 2;
                const top = window.screenY + (window.innerHeight - height) / 2;

                window.open(
                `/image/${id}`,                    // URL to open
                "_blank",                          // new tab/window
                `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars,noopener,noreferrer`
                );
            }}
            style={{ cursor: "pointer" }}
            >
            Details
            </button>

        </div>
    )
}

export default ImageCard;
