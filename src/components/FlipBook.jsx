import HTMLFlipBook from "react-pageflip";
import React, { useEffect, useRef } from "react";

const Page = React.forwardRef(({ img }, ref) => {

  return (

    <div
      ref={ref}
      style={{
        width:"320px",
        height:"420px",
        background:"white"
      }}
    >

      <img
        src={img}
        alt="jewellery"
        style={{
          width:"100%",
          height:"100%",
          objectFit:"cover"
        }}
      />

    </div>

  );

});


function FlipBook({ images = [] }) {

  const bookRef = useRef(null);

  // Auto flip every 5 seconds
  useEffect(()=>{

    let page = 0;

    const interval = setInterval(()=>{

      if(!bookRef.current) return;

      page++;

      if(page >= images.length){

        page = 0;

        bookRef.current.pageFlip().flip(0);

      } else {

        bookRef.current.pageFlip().flipNext();

      }

    },5000); // 5 sec

    return ()=>clearInterval(interval);

  },[images]);


  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      marginTop:"30px"
    }}>

      <HTMLFlipBook
        width={320}
        height={420}
        showCover={true}
        ref={bookRef}
      >

        {images.map((img,index)=>(

          <Page key={index} img={img}/>

        ))}

      </HTMLFlipBook>

    </div>

  );

}

export default FlipBook;