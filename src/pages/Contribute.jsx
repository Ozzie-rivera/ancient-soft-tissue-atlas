import "./Contribute.css";

function Contribute() {
    return (
        <div className="contribute-container">
            <h1>How to contribute to the ASTA Database</h1>
            <section>
                <h2>Contribute with your own soft tissue images!</h2>
                <p>To contribute to the database you need to provide two things:<br/>
                </p>
            </section>

            <section>
                <p>
                <b>1. A csv file containing the annotation of all of your images.<br></br></b>
                On each row of the csv file include the following information. Please use the provided column names listed below. If any information is missing, just put NA.
                    <ol>
                        <li>id: a numbered id</li>
                        <li>filename: the id left-padded to five digits. Extension: jpg.</li>
                        <li>microscope_technology: the microscopic technology used to make the image</li>
                        <li>magnification: magnification</li>
                        <li>taxon: name or group of the species sample was taken from</li>
                        <li>sample_id: any sample id associated with the image</li>
                        <li>cell: the type of cell visible in the image</li>
                        <li>tissue: the type of tissue the cell comes from</li>
                        <li>interval: the conventional interval the sample comes from</li>
                        <li>conventional_age: the conventional age of the sample</li>
                        <li>lithology: the surrounding lithology of the sample</li>
                        <li>site: name of the site the sample was found at</li>
                        <li>location: name of the location the sample was found at</li>
                        <li>country: country where the sample was found at</li>
                        <li>description: detailed description of the sample</li>
                        <li>figure: figure in publication featuring the sample</li>
                        <li>publication_year: year of publication</li>
                        <li>first_author: last name of first author on publication</li>
                        <li>reference: Pubmed ID or DOI of publication featuring the sample</li>
                    </ol>
                </p>
            </section>

            <section>
                <p>
                <b>2. A zipped folder containing the images named according to the previous point and the csv file.<br></br></b>
                Place all of your images into a single folder. You may compress it using either Windows zip or Linux gzip.
                </p>
            </section>

            <section>
                <p>
                Please email your compressed folder to our email and we will add them to our database after review. Thanks!
                </p>
            </section>

        </div>
    )
}

export default Contribute;