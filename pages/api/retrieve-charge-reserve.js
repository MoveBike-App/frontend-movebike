const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler (request, response) {
  try {
    const { payment_intent_id } = request.body

    const intent = await stripe.paymentIntents.retrieve(payment_intent_id)

    response.send({
      status: intent.status,
      charge_data: intent.charges.data
    })
  } catch (error) {
    response.send({
      status: 'failed',
      failure_message: error.message
    })
  }
}
