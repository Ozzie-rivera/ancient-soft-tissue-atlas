import { publicationData } from "../data/publicationData";
import "./Publications.css";

function Publications() {
    return (
        <div className="publications-container">
            <h1>Publications</h1>
            <p className="publications-intro">
                A comprehensive list of peer-reviewed publications documenting soft tissue preservation in ancient organisms, 
                ordered from most recent to oldest. These publications provide scientific evidence for the preservation of biological materials across geological time.
            </p>

            <div className="publications-list">
                {publicationData.map((pub) => (
                    <div key={pub.id} className="publication-item">
                        <div className="publication-number">{pub.id}.</div>
                        <div className="publication-content">
                            <div className="publication-main">
                                <span className="authors">{pub.authors}</span>
                                {" "}
                                <span className="year">({pub.year}).</span>
                                {" "}
                                <span className="title">{pub.title}.</span>
                                {" "}
                                <span className="journal"><i>{pub.journal}</i></span>
                                {pub.volume && <span className="volume">, {pub.volume}</span>}
                            </div>
                            {pub.description && (
                                <div className="publication-description">
                                    <strong>Description:</strong> {pub.description}
                                </div>
                            )}
                            {pub.age && (
                                <div className="publication-age">
                                    <strong>Age:</strong> {pub.age}
                                </div>
                            )}
                            {pub.link && (
                                <div className="publication-link">
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                        View Publication →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Publications;
