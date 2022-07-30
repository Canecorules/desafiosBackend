const productForm = document.getElementById('formProduct')

productForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const formData = new FormData(productForm)
    fetch('/api/newProduct', {
        method:'POST',
        body:formData
    }).then(result=>result.json()).then(json=>console.log(json)).finally(productForm.reset())

})