import { publicationData } from "../data/publicationData";
import { imageData } from "../data/imageData3";
import "./Publications.css";

function Publications() {
    const normalize = (v) => {
        if (v === undefined || v === null || v === "") return null;

        if (typeof v !== "string") {
            return String(v);
        }

        const trimmed = v.trim();

        if (trimmed === "" || trimmed === "NA") return null;

        return trimmed;
    };

    const imageRefs = new Set(
        imageData.map(img => normalize(img.reference)).filter(v => v !== null)
    );

    const displayedPublications = publicationData.filter(pub => {
        const pmid = normalize(pub.pmid);
        const doi = normalize(pub.doi);
        const url = normalize(pub.url);

        return (
            ((imageRefs.has(pmid)) || 
            (imageRefs.has(doi)) ||
            (imageRefs.has(url))) 
        );
    });

    const matchingPublications = publicationData.filter(pub =>
        imageRefs.has(normalize(pub.pmid)?.toString()) ||
        imageRefs.has(normalize(pub.url)?.toString())
    );

    console.log("Image references:");
    console.log(imageData.slice(0, 20).map(img => img.reference));

    console.log("Image references 2:");
    console.log(imageRefs[350]);

    console.log("First publications:");
    console.log(publicationData.slice(0, 7));

    console.log("Displayed publications:");
    console.log(displayedPublications.slice(0, 12));

    console.log("Matching publications:");
    console.log(matchingPublications.slice(0, 5));

    return (
        <div className="publications-container">
            <h1>Publications</h1>
            <p className="publications-intro">
                A comprehensive list of peer-reviewed publications documenting soft tissue preservation in ancient organisms, 
                ordered from most recent to oldest. These publications provide scientific evidence for the preservation of biological materials across geological time.
            </p>

            <div className="publications-list">
                {displayedPublications.map((pub) => (
                    <div key={pub.pmid} className="publication-item1">
                        <div className="publication-content">
                            <div className="publication-main">
                                <span className="authors">{pub.firstAuthor}</span>
                                {" "}
                                <span className="year">({pub.year})</span>
                                {" "}
                                <span className="title">{pub.title}</span>
                                {" "}
                                <a href={pub.url} target="_blank" rel="noopener noreferrer">
                                <span className="journal"><i>{pub.journal}</i> </span>
                                    {pub.volume && <span className="volume">({pub.volume}):{pub.pages}</span>}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Publications;
