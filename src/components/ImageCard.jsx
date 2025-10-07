function ImageCard({ imageUrl, species, tissue, eon, photographer }) {
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", width: "220px" }}>

            <img
                src={imageUrl}
                alt={species + " tissue"}
                style={{ width: "200px", height: "200px", objectFit: "cover" }} 
            />

            <h3>{species}</h3>
            <p><strong>Tissue:</strong> {tissue}</p>
            <p><strong>Eon:</strong> {eon}</p>
            <p><strong>Photographer:</strong> {photographer}</p>
        </div>
    )
}

export default ImageCard;