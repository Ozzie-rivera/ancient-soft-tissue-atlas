import {publicationData} from "../data/publicationData";
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
                    <div key={pub.id} className="publication-item1">
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
