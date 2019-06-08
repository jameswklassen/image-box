import { storage, db } from '../firebase';

import { IMAGE_UPLOAD_STATUS } from '../common/constants'

const uploadImage = image => {
    console.log(`uploading ${image.name}`)
    return new Promise((resolve, reject) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on('state_changed', 
            (snapshot) => {
                // progress function
            },
            (error) => { // error
                console.log(error);
                reject(IMAGE_UPLOAD_STATUS.FAILURE)
            },
            () => { // upload complete
    
                // get the asset download url and store it in the database
                storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    const newImage = {
                        name: image.name,
                        link: url
                    }; 
    
                    // // add the image we uploaded to the array of images... maybe don't have to do this
                    // this.setState(prevState => ({
                    //     images: [...prevState.images, newImage ]
                    // }));
    
                    // add the link to the image to the database
                    db.collection('images').doc(image.name).set(newImage);
                    resolve(newImage);
                });
            }
        );
    });
};

const removeImage = image => {

    const deleteRef = storage.ref(`images/${image.name}`)
    console.log(`deleting ${image.name}`)

    return new Promise((resolve, reject) => {
        db.collection("images").doc(image.name).delete().then(function() {
            deleteRef.delete().then(() => {
                console.log("deleted successfully");
                console.log("Image successfully deleted!");
                resolve("Image successfully deleted!");
            }).catch(error => {
                reject("Error removing reference: ", error);
            });
        }).catch(error => {
            reject("Error removing image: ", error);
        });
    });
};


// populates the state arra
const getImages = () => {
    const images = [];

    return new Promise((resolve, reject) => {
        db.collection("images").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                images.push(doc.data())
            });
        });
        resolve(images);
    });
}

export {
    uploadImage,
    removeImage,
    getImages,
}
