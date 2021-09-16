const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const mstwo = document.querySelector('#mstwo');
const msone = document.querySelector('#msone');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value;
    
    mstwo.textContent='loading...'
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                mstwo.textContent= data.error;
            } else {
             mstwo.textContent='address: ' + data.address + ' forecast: ' +data.forecast;
             msone.textContent=' location: '+data.location + ' temperature: '+data.temperature;
            }
        })

        
});
})



