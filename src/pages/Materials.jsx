import "./Materials.css";

function Materials() {
    return (
        <div className="materials-container">
            <h1>Materials & Methods</h1>
            <section>
                <h2>Materials</h2>
                <p>The images in this database come from two main sources.<br/>
                <ul>
                    <li>The first collection of images comes from manually or semi-automatically extracting images from a set of 130 peer-reviewed publications on ancient soft tissue. These papers are listed on the Publications page of the Database. Some images in the database are cross-linked to the corresponding publication in PubMed.</li>
                    <li>The second collection of images comes from third parties that have collected and annotated their own images of ancient soft tissues.</li>
                    These images and their annotations are constantly being added to the database. If your lab has images that you would like to be added to the ASTA database, please contact us!
                </ul>
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
                    Images were obtained using Fourier transform infrared spectroscopy (FTIR), light microscopy, phase contrast microscopy, scanning electron microscopy (SEM),  
                    transmission electron microscopy (TEM), and X-ray fluorescence microscopy depending on the tissue type.
                    Each image entry specifies which method was used. The magnification of each image is provided (if given in publication).
                </p>
            </section>

            <section>
                <h2>References</h2>
                    <p>Reference to our published paper goes here...</p>
            </section>

            <section>
                <h2>Email</h2>
                <p>You may email us at <a href="mailto:csmatyi1@gmail.com">csmatyi1@gmail.com</a></p>
            </section>
        </div>
    )
}

export default Materials;