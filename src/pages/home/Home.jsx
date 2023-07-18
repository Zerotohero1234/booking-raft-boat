import Featured from "../../components/featured/Featured"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import PropertyList from "../../components/propertyList/propertyList"
import "./home.css"

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">ເລືອກເບິ່ງປະເພດເຮືອນແພ</h1>
        <PropertyList/>
        <h1 className="homeTitle">ເຮືອນແພທີ່ທາງເຮົາແນະນຳ</h1>
        <FeaturedProperties/>
      </div>
      <Footer/>
    </>
  )
}

export default Home