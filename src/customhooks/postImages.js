import axios from "axios";

const url = 'http://139.59.30.75:8080/';
const endPoint = 'images/pictures';
const singleEndPoint = 'images';


const headers = {
    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data

};

async function multipleImages(img) {

    const formData = new FormData()

    img.forEach(image => {
        formData.append('image', image)
    });


    try {
        const res = await axios.post(url + endPoint, formData, { headers })
        console.log(res)
        return res.data
    }
    catch (err) {
        console.log(err)
    }

}


async function singleImage(img) {
    const formData = new FormData()
    formData.append('image', img)

    try {
        const res = await axios.post(url + singleEndPoint, formData, { headers })
        console.log(res)
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}


export { multipleImages, singleImage }