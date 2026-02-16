import "./Materials.css";

function Materials() {
    return (
        <div className="materials-container">
            <h1>Materials & Methods</h1>
            <section>
                <h2>Materials</h2>
                <p>Many of the samples were kindly provided by Dr. Mark Armitage.</p>
            </section>

            <section>
                <h2>Sample Preparation</h2>
                <p>All specimens were analyzed using standard paleohistological techniques. 
                   Samples were collected from verified sources and examined using light and electron microscopy. 
                   Each image in the ASTA database corresponds to a verified slide prepared following consistent methodology.</p>
            </section>

            <section>
                <h2>Microscopy Techniques</h2>
                <p>
                    Images were obtained using light microscopy, scanning electron microscopy (SEM),
                    and transmission electron microscopy (TEM), depending on the tissue type.
                    Each image entry specifies which method was used.
                </p>
            </section>

            <section>
                <h2>References</h2>
                <ol>
                    <li>Reference to our published paper goes here...</li>
                </ol>
            </section>
        </div>
    )
}

export default Materials;