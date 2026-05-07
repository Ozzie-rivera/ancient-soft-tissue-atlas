import { useParams, Link } from "react-router-dom";
import { imageData } from "../data/imageData3";
import { useEffect, useState } from "react";

function ImageDetail() {
    const { id } = useParams();
    //const numericId = Number(id);
    const numericId = String(id);
    const item = imageData.find((i) => i.id === numericId);

    const imageMap = Object.fromEntries(
        imageData.map(img => [img.id, img])
    );
    const relatedImages = item?.image_crossref
        ? item.image_crossref.split(",").map(id => id.trim()).map(id => imageMap[id]).filter(Boolean) : [];

    const [taxId, setTaxId] = useState(null);

    const fetchTaxId = async (taxonName) => {
        try {
            const res = await fetch(
                `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=taxonomy&term=${encodeURIComponent(taxonName)}&retmode=json&retmax=1`
            );
            const data = await res.json();

            const id = data?.esearchresult?.idlist?.[0];
            return id || null;
        } catch (e) {
            console.error("TaxID fetch failed", e);
            return null;
        }
    };

    useEffect(() => {
        if (item?.taxon) {
            fetchTaxId(item.taxon).then(setTaxId);
        }
    }, [item?.taxon]);

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
    const httpattern = `http.*`;

    return (
        <div style={{ padding: 24 }}>
            <h1>{item.taxon}</h1>
            <p>
                {taxId && (
                    <>
                        &nbsp;
                        <a
                            href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?command=show&mode=node&id=${taxId}&lvl=3`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on NCBI Taxonomy
                        </a>
                    </>
                )}
            </p>
            <p><strong>Tissue:</strong> {item.tissue} &nbsp; | &nbsp; <strong>Interval:</strong> {item.interval}
            {item.reference && item.reference !== "Unpublished" && (
                item.reference.includes("http") ? (         // includes http
                <>
                &nbsp; | &nbsp;
                <a href={item.reference} target="_blank" rel="noopener noreferrer">
                    View on Article Website
                </a>
                </>
                ) : (
                <>
                &nbsp; | &nbsp;
                <a href={`https://pubmed.ncbi.nlm.nih.gov/${item.reference}/`} target="_blank" rel="noopener noreferrer">
                    View on PubMed
                </a>
                </>
                )
            )}
            </p>

            <div style={{ marginTop: 16 }}>
                <img 
                    src={imageUrl} 
                    alt={item.taxon} 
                    style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }} 
                />

                {/* Cross-referenced images */}
                {relatedImages.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                        <h4>Related Images</h4>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            {relatedImages.map((refImg) => (
                                <div key={refImg.id}>
                                    <img
                                        src={`/newimages/${refImg.filename}`}
                                        alt={refImg.taxon}
                                        style={{ width: "120px", border: "1px solid #ccc" }}
                                    />
                                    <div style={{ fontSize: "0.8em" }}>
                                        <Link to={`/image/${refImg.id}`}>
                                            {refImg.taxon || refImg.filename}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {item.magnification && (
                <div style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>
                    <b>Magnification:</b> {item.magnification}<br/>
                    <b>Microscope technology:</b> {item.microscope_technology}
                </div>
            )}

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
