import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://www.discoverlaos.today/img/thing_to_do/e4bb4a43307536bf5dd6dd6e615d9801.jpg?p=image1200x800"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://wearelao.com/sites/default/files/WhatsApp%20Image%202022-06-06%20at%2012.19.07%20PM.jpeg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://discoverlaos.today/img/thing_to_do/b93ef12fabd30c3a6606bd69b7540fa5.jpg?p=image1920x1080"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
        </div>
      </div>
    </div>
  );
};

export default Featured;
