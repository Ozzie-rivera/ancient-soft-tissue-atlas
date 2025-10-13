import "./Materials.css";

function Materials() {
    return (
        <div className="materials-container">
            <h1>Materials & Methods</h1>
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
                <h2>Reference</h2>
                <ul>
                    <li>Schweitzer, M.H. et al. (2005). Soft-Tissue Vessels and Cellular Preservation in Tyrannosaurus rex. *Science*, 307(5717): 1952–1955.</li>
                    <li>Cleland, T.P. et al. (2015). Mass spectrometry and antibody-based characterization of blood vessels from Brachylophosaurus canadensis. *Journal of Proteome Research*, 14(12): 5252–5262.</li>
                </ul>
            </section>
        </div>
    )
}

export default Materials;