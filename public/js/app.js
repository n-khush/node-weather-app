
const search = document.getElementById('submit')
const errorMessage = document.getElementById('error')
const forecast = document.getElementById('forecast')

search.addEventListener('click',(event)=>{
   errorMessage.textContent = 'Please wait...'
   forecast.textContent = ''
   const weatherSearch = document.getElementById('location')
   fetch("http://localhost:3000/weather?address="+weatherSearch.value).then((response)=>{
      response.json().then((data) =>{
         if(data.error){
            errorMessage.textContent = data.error
            forecast.textContent = ''
         }
         else{
            errorMessage.textContent = data.address+', '+data.location
            forecast.textContent = data.forecast
         }
      })
   })
})