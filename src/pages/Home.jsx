import { Link } from 'react-router-dom'
import "./Home.css"
function Home() {
    return (
        <div className="home-container">
            <h1>What is ASTA</h1>
            <p>The Ancient Soft Tissue Atlas (ASTA) is a digital collection of microscopic images from ancient organisms, including dinosaurs such as Triceratops and T. rex.
               Our goal is to organize and share images of bone cells, red blood cells, collagen, and other tissues—along with their scientific details—so researchers and students can explore this unique field of study.</p>
            
            <Link to="/explore">
                <button>Start Exploring</button>
            </Link> 
        </div>


    

    )
}

export default Home;