import { useParams, Link } from "react-router-dom";
import { imageData } from "../data/imageData";

function ImageDetail() {
    const { id } = useParams();
    const numericId = Number(id);
    const item = imageData.find((i) => i.id === numericId);

    if (!item) {
        return (
            <div style={{ padding: 40 }}>
                <h2>Image not found</h2>
                <p>No image with id {id} exists.</p>
                <Link to="/explore">Back to Explore</Link>
            </div>
        );
    }

    const imageUrl = `/newimages/${item.filename}`;

    return (
        <div style={{ padding: 24 }}>
            <Link to="/explore">← Back to Explore</Link>
            <h1>{item.species}</h1>
            <p><strong>Tissue:</strong> {item.tissue} &nbsp; | &nbsp; <strong>Eon:</strong> {item.eon}</p>

            <div style={{ marginTop: 16 }}>
                <img src={imageUrl} alt={item.species} style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }} />
            </div>

            {item.description && (
                <div style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>
                    <h3>Description</h3>
                    <p>{item.description}</p>
                </div>
            )}
        </div>
    );
}

export default ImageDetail;
