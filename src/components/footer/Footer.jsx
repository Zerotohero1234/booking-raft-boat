import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faHome, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="ft-container">
        <div className="ft-icon">
          <FontAwesomeIcon className="icon-logo" icon={faFacebook} />
          <FontAwesomeIcon className="icon-logo" icon={faInstagram} />
          <FontAwesomeIcon className="icon-logo" icon={faWhatsapp} />
        </div>
        <div className="ft-contact">
          <span>
            <FontAwesomeIcon icon={faMailBulk} /> info@gmail.com
          </span>
          <span>
            <FontAwesomeIcon icon={faPhone} /> info@gmail.com
          </span>
          <span>
            <FontAwesomeIcon icon={faHome} /> info@gmail.com
          </span>
        </div>
        <div>
          <p>@2023 RaftBoat All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
