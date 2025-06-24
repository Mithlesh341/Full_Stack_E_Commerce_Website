// import stripe from "stripe";

// const Stripe = stripe(process.env.STRIPE_SECRET_KEY)

// export default Stripe
import Stripe from "stripe"; // Capital S – this is a class

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Create an instance

export default stripe;