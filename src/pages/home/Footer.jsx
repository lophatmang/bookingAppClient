import classes from "./Footer.module.css";
import object from "../../data/footer.json";

function Footer() {
  return (
    <div className={classes.footer}>
      {object.map((e) => (
        <div key={e.col_number}>
          {e.col_values.map((e, i) => (
            <a key={i} href="#">
              {e}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Footer;
