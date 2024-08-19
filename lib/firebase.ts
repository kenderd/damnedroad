
import { formatEther, formatUnits, parseEther, PublicClient, WalletClient } from 'viem';
import { initializeApp } from "firebase/app";
import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  initializeFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { product } from "@/types";
import { resolve } from "path";

import { ABI } from "./ABI";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkmyNLiVwecNJ0Xm9KBZDFqn1M4JCivA0",
  authDomain: "guildstestfunctionalities.firebaseapp.com",
  projectId: "guildstestfunctionalities",
  storageBucket: "guildstestfunctionalities.appspot.com",
  messagingSenderId: "1026512018387",
  appId: "1:1026512018387:web:b5d125bfde56fc8cbdad26",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);

export const getProducts = async () => {
  const collectionRef = collection(db, "products");
  const docSnap = await getDocs(collectionRef);
  const docsMap: product[] = docSnap.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as unknown as product[];

  return docsMap;
};

export const uploadProduct = async ({
  name,
  description,
  price,
  creator,
  image,
  product,
  publicClient,
  walletClient
}: {
  name: string;
  description: string;
  price: number;
  creator: `0x${string}`;
  image: File;
  product: File;
  publicClient:PublicClient,
  walletClient:WalletClient
}) => {


  const contractid = await publicClient.readContract({
    address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
    abi:ABI,
    functionName:"nextProductId"
  }) as unknown as number;


  const collectionRef = collection(db, "products");
  const docRes = await addDoc(collectionRef, {
    name: name,
    description: description,
    price: price,
    creator: creator,
    preview_image: "",
    product: "",
    created: Timestamp.now(),
    contract_product_id:Number(contractid),
    product_file_name:product.name,
  });

  const docRef = doc(db, "users", creator, "products", docRes.id);
  await setDoc(docRef, { created: Timestamp.now() }, { merge: true });
  const uploadPromises: Promise<void>[] = [];
  const previewImageFileRef = ref(
    storage,
    `products/${creator}/${docRes.id}/${image.name}`
  );
  const productFileRef = ref(
    storage,
    `products/${creator}/${docRes.id}/${product.name}`
  );

  const previewImageUploadTask = uploadBytesResumable(
    previewImageFileRef,
    image
  );
  const productUploadTask = uploadBytesResumable(productFileRef, product);

  let previewImageUploadPromise = new Promise<void>(async (resolve, reject) => {
    previewImageUploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(`${error} - Failed to upload Preview Image.`),
      async () => {
        try {
          const downloadURL = await getDownloadURL(
            previewImageUploadTask.snapshot.ref
          );
          const docRef = doc(collectionRef, docRes.id);
          await setDoc(docRef, { preview_image: downloadURL }, { merge: true });
          resolve();
        } catch (error) {
          reject(`${error} - Failed to process the Previe Image upload.`);
        }
      }
    );
  });
  let productUploadPromise = new Promise<void>(async (resolve, reject) => {
    productUploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(`${error} - Failed to upload Preview Image.`),
      async () => {
        try {
          const downloadURL = await getDownloadURL(
            productUploadTask.snapshot.ref
          );
          const docRef = doc(collectionRef, docRes.id);
          await setDoc(docRef, { product: downloadURL }, { merge: true });
          resolve();
        } catch (error) {
          reject(`${error} - Failed to process the Product upload.`);
        }
      }
    );
  });

  uploadPromises.push(productUploadPromise);
  uploadPromises.push(previewImageUploadPromise);

  await Promise.all(uploadPromises);
  
  try{
  const { request } = await publicClient.simulateContract({
    address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
    abi: ABI,
    functionName: "addProduct",
    args: [parseEther(price.toString())],
    account:creator,
  });

  await walletClient.writeContract(request);
  }
  catch(e){
    console.error(e);
    try{
    await deleteDoc(doc(db,"products",docRef.id))
    await deleteDoc(doc(db,"users",creator,"products",docRes.id));
    await deleteObject(ref(storage,`products/${creator}/${docRes.id}/${image.name}`))
    await deleteObject(
      ref(storage, `products/${creator}/${docRes.id}/${product}`)
    );
    }
    catch(e){
      console.error(e)
    }

    return null
  }

  return docRes.id;
};

export const getForSales = async (creator: string): Promise<product[]> => {
  console.log(creator);
  console.log("tite");
  // Define references to collections
  const forSalesCollRef = collection(db, "users", creator, "products");
  const productsRef = collection(db, "products");

  const forSalesSnap = await getDocs(forSalesCollRef);

  const forSalesIds = forSalesSnap.docs.map((doc) => doc.id);

  const productPromises = forSalesIds.map(async (prodId) => {
    const docRef = doc(productsRef, prodId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = docSnap.data() as product;
      product.id = prodId;
      return product;
    } else {

      console.warn(`Product with ID ${prodId} does not exist`);
      return null;
    }
  });

  const products = (await Promise.all(productPromises)).filter(
    (product): product is product => product !== null
  );

  return products;
};
