import classes from "./Registration.module.css";

function Registration() {
  return (
    <form className={classes.registration}>
      <h1>Save time, save money!</h1>
      <p>Sign up and we'll send the best deals to you</p>
      <input type="email" placeholder="Your Mail" />
      <button>Subscribe</button>
    </form>
  );
}

export default Registration;
