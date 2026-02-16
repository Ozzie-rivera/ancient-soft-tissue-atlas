import { imageData } from "../data/imageData3";
import "./Statistics.css";

function Statistics() {
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


        </div>
    );
}

export default Statistics;
