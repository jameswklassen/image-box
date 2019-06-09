import { storage, db } from '../firebase';

import { IMAGE_UPLOAD_STATUS } from '../common/constants'

const uploadImage = imageObject => {
    const { image, tags } = imageObject;

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
                        tags: tags,
                        link: url
                    }; 

                    // add the link to the image to the database
                    db.collection('images').doc(image.name).set(newImage);
                    resolve(newImage);
                });
            }
        );
    });
};

const removeImage = image => {

    const storageRef = storage.ref(`images/${image.name}`)

    return new Promise((resolve, reject) => {
        db.collection("images").doc(image.name).delete().then(function() {
            storageRef.delete().then(() => {
                resolve("Image successfully deleted!");
            }).catch(error => {
                reject("Error removing database reference: ", error);
            });
        }).catch(error => {
            reject("Error removing image: ", error);
        });
    });
};

const removeAllImages = () => {
    return new Promise((resolve, reject) => {
        db.collection("images").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                storage.ref(`images/${doc.data().name}`).delete();
                doc.ref.delete()
            });
        }).then(() => resolve('Deleted All'));
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
};

export {
    uploadImage,
    removeImage,
    getImages,
    removeAllImages,
}
