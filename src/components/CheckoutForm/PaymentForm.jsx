import React from 'react'
import {Typography,Button,Divider} from "@material-ui/core"
import {Elements,CardElement,ElementsConsumer}from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Review from './Review.js'

const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

// using stripe here
function PaymentForm({checkoutToken,backStep,shippingData,onCaptureCheckout,nextStep,timeout}) {

    const handleSubmit= async(event,elements,stripe)=>{
        event.preventDefault()
        if(!stripe||!elements)return;
        const cardElement=elements.getElement(CardElement)

        const {error,paymentMethod}=await stripe.createPaymentMethod({type:'card',card:cardElement})

        if (error)
        {
            console.log(error);
        }else{
            const orderData={
                list_items:checkoutToken.live.line_items,
                customer:{firstname:shippingData.firstName,lastname:shippingData.lastName,
                email:shippingData.email},
                shipping:{
                    name:'primary',
                    street:shippingData.address1,
                    town_city:shippingData.city,
                    county_state:shippingData.shippingSubdivision,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.shippingCountry
                        },
                fulfillment:{shipping_method:shippingData.shippingOption},
                payment:{
                    gateway:'stripe',
                    stripe:{ payment_method_id:paymentMethod.id
                    }
                }
            }
            onCaptureCheckout(checkoutToken.id,orderData)
            timeout()
            nextStep()
        }
    }

    return (
        <div>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography gutterBottom variant='h6' style={{margin:'20px 0'}}>Payment Method</Typography>
            <Elements stripe={stripePromise}>
               <ElementsConsumer>
                 {({elements,stripe})=>(
                     <form onSubmit={(e)=>{handleSubmit(e,elements,stripe)}}>
                         <CardElement/>
                         <br /><br />
                         <hr />
                         <div style={{display:'flex',justifyContent:'space-between'}}>
                             <Button variant='outline'  onClick={backStep}>Back</Button>
                             <Button variant='contained' type='submit' disabled={!stripe} color="primary">
                                 Pay {checkoutToken.live.subtotal.formatted_with_code}
                             </Button>
                         </div>
                     </form>
                 )}
              </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default PaymentForm
