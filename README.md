# Shopify Coding Challenge

Image repository created for the Shopify Developer Intern Coding challenge



## Usage

After cloning the repo, create a `.env` file and set the environment variables outlined in `.env-example`. These environment variables are all authentication from Firebase, and can be found in the **Firebase console**.

Once the `.env` file has been properly created, run 

```
yarn install
```

To properly install all dependencies.



Once all dependencies have been installed run

```
yarn start
```



This will start the local development server on `localhost:3000`.



## Technologies

This image repository was built on a React foundation. It utilizes [Firebase](https://firebase.google.com/) to store images and their references/tags. The images themselves are stored in Firebase's [Cloud Storage](https://firebase.google.com/products/storage/), and all references and tags are stored in a [Cloud Firestore](https://firebase.google.com/products/firestore/) database.