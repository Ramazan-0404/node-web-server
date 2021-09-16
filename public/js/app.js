const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const mstwo = document.querySelector('#mstwo');
const msone = document.querySelector('#msone');
const ms3 = document.querySelector('#ms3');
const ms4 = document.querySelector('#ms4');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value;
    
    mstwo.textContent='loading...'
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                mstwo.textContent= data.error;
            } else {
             mstwo.textContent = 'address: ' + data.address;
             ms3.textContent = ' forecast: ' +data.forecast;
             msone.textContent = ' location: '+data.location;
             ms4.textContent = ' temperature: '+data.temperature;
            }
        })

        
});
})



