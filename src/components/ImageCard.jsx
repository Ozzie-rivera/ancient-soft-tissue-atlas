import { useState } from "react";
import { Link } from "react-router-dom";

function ImageCard({ id, imageUrl, species, tissue, eon, description }) {
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
                alt={species + " tissue"}
                style={{ width: "220px", height: "200px", objectFit: "cover" }} 
            />

            <h3>{species}</h3>
            <p><strong>Tissue:</strong> {tissue}</p>
            <p><strong>Eon:</strong> {eon}</p>

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

            <div style={{ marginTop: 8 }}>
                <Link to={`/image/${id}`} style={{ textDecoration: "none" }}>
                    <button style={{ cursor: "pointer" }}>Details</button>
                </Link>
            </div>

        </div>
    )
}

export default ImageCard;