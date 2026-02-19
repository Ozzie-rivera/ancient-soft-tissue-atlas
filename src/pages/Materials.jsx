import "./Materials.css";

function Materials() {
    return (
        <div className="materials-container">
            <h1>Materials & Methods</h1>
            <section>
                <h2>Materials</h2>
                <p>The images in this database come from three main sources.<br/> 
                    The first is a collection of images made by James Solliday in house, many of which used samples provided by Mark Armitage. These samples were made using bright-field illumination, crossed polarized light, differential interference contrast, and phase contrast microscopic techniques.<br/>
                    The second collection of images comes from manually or semi-automatically extracting images from a set of 130 peer-reviewed publications on ancient soft tissue. These papers are listed on the Publications page of the Database. Some images in the database are cross-linked to the corresponding publication in PubMed.
                    The third collection of images comes from third parties that have collected and annotated their own images of ancient soft tissues.<br/>
                    These images and their annotations are constantly being added to the database.
                </p>
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