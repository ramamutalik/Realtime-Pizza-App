import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    //ajax call
    axios.post('/update-cart',pizza).then(res=>{
        console.log(res)
        // cartCounter.innerText = res.data.tatalPrice
        cartCounter.innerText = res.data.tatalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            progressBar:false,
            text:'Item added to cart'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            progressBar:false,
            text:'Something went wrong'
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        console.log(pizza)
        
    })
})