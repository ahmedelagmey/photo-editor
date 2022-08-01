// filters
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

// upload & download buttons 
let upload = document.getElementById("upload");
let download = document.getElementById("download");

// img 
let img = document.getElementById("img");

// reset button 
let reset = document.querySelector('span');

// image box 
let imgBox = document.querySelector(".img-box");

// canvas 
const canvas = document.getElementById("canvas");

// drawng canvas context
const ctx = canvas.getContext('2d');

//reseting filters to default values 
function resetValues(){
    img.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';

}

// hide buttons and image box before uploading
window.onload = function(){
    download.style.display = "none";
    reset.style.display = 'none';
    imgBox.style.display ='none';
}

// changes after uploading image 
upload.onchange = function() {
    resetValues()
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display ='block';

    // reading and display image 
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    
    file.onload = function(){
        img.src = file.result;
         
    }
    // applying drawing context
    img.onload = function(){
        canvas.width = img.width; //getting uploaded image width
        canvas.height = img.height; //getting uploaded image height
        ctx.drawImage(img, 0,0, canvas.width, canvas.height);
        img.style.display = 'none';
    }

}


// applying filters on the image 
let filters = document.querySelectorAll("ul li input");

filters.forEach( filter =>{
    filter.addEventListener('input', function(){


       ctx.filter = `

            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img, 0,0, canvas.width, canvas.height);
    })
})

// downloading image after applying filters
download.onclick = function(){
    download.href = canvas.toDataUrl()
}