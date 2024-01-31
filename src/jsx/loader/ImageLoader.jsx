import './ImageLoader.css'

const ImageLoader = () => {
  return (
    <>
      <div class="loader"></div>

    </>
  )
}

export default ImageLoader;

const ImageLoader1 = ({ img }) => {

  return (
    <>
      <main className="main" key="main">
        <div className="image-loader1">
          {img}
        </div>
      </main>
    </>

  )
}


export { ImageLoader1 }