const productForm = document.getElementById('productForm')

productForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let formData = new FormData(productForm)
    fetch('/api/newProduct',{
        method:'POST',
        body:formData
    }).then(result=>result.json()).then(json=>console.log(json)).finally(productForm.reset())
})