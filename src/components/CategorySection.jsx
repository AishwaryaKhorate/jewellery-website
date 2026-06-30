import FlipBook from "./FlipBook";

function CategorySection({ title, images, id }) {

  return (

    <section id={id} className="section">

      <h2>{title}</h2>

      {/* Flipbook here */}

      <FlipBook images={images} />


      <div className="grid">

        {images.map((img,index)=>(

          <img
            key={index}
            src={img}
            alt="jewellery"
            className="image"
          />

        ))}

      </div>

    </section>

  );

}

export default CategorySection;