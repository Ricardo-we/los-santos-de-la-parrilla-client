import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer(){
    return (
        <footer style={styles.footer} className="w-100 bg-light d-flex flex-wrap align-items-center justify-content-evenly">
            <a style={styles.footerLink} className="text-dark" href="">
                <FontAwesomeIcon icon={faFacebook} size="lg"/>
            </a>
            <a style={styles.footerLink} className="text-dark" href="">
                <FontAwesomeIcon icon={faWhatsapp} size="lg"/>
            </a>
            <a style={styles.footerLink} className="text-dark" href="">
                <FontAwesomeIcon icon={faInstagram} size="lg"/>
            </a>
        </footer>
    )
}

const styles = {
    footer: {
        position: 'static',
        left: 0,
        bottom: 0
    },
    footerLink: {
        textDecoration: 'none',
        textAlign: 'center',
        padding: 20,
        margin: '0 40px'
    }
}