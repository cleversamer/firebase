const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} = require("firebase/firestore");

const config = {
  apiKey: "AIzaSyCKYC5X_1erN17u-dAEPwsbdpzEpXePWgI",
  authDomain: "fir-v9-8cf1a.firebaseapp.com",
  projectId: "fir-v9-8cf1a",
  storageBucket: "fir-v9-8cf1a.appspot.com",
  messagingSenderId: "307851376705",
  appId: "1:307851376705:web:524938cb79fedd12bcaec0",
};

// init firebase app
initializeApp(config);

// init services
const db = getFirestore();

// collection ref
const collectionRef = collection(db, "books");

// get collection data
getDocs(collectionRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => books.push({ id: doc.id, ...doc.data() }));
    console.log(books);
  })
  .catch((err) => console.error(err));

// Add documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addDoc(collectionRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => addBookForm.reset());
});

// Delete documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookId = deleteBookForm.id.value;
  const docRef = doc(db, "books", bookId);
  deleteDoc(docRef).then(() => deleteBookForm.reset());
});
