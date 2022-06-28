import { addDoc, collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore"
import { db } from "../config/firebase"



export const getTotalGamesData = async () => {
    try {
        const docData = (await getDoc(doc(db, "gamesData", "totalScore"))).data()
        const points = docData?.gamesWon - (docData?.prizesClaimed * 5)
        return points
    } catch (error) {
        console.log(error)
    }
}

export const getIndividualGameData = async (gameName: string) => {
    try {
        const docData = (await getDoc(doc(db, "gamesData", gameName))).data()
        return docData?.gamesWon

    } catch (error) {
        console.log(error)
    }
}

export const gameWonSetDb = async (gameName: string) => {
    try {
        if(gameName === "wordle"){
            await updateDoc(doc(db, "gamesData", gameName), {
                solutionIndex: increment(1)
            })
        } 
        await updateDoc(doc(db, "gamesData", gameName), {
            gamesWon: increment(1)
        })
        await updateDoc(doc(db, "gamesData", "totalScore"), {
            gamesWon: increment(1)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getWordleSolution = async () => {
    try {
        const docData = (await getDoc(doc(db, "gamesData", "wordle"))).data()
        return docData?.solutionIndex
    } catch (error) {
        console.log(error)
    }
}

export const getDbPhotos = async (count: number) => {
    try {
        const docUrls: any = (await getDoc(doc(db, "picturesUrls", "pictures"))).data()
        const urls = docUrls?.urls
        count = count === 326 ? urls.length : count
        // console.log(count)
        const sendUrls = []
        for (let i = 0; i < count; i++) {
            // random number between 0 and urls.length
            const random = Math.floor(Math.random() * urls.length)
            sendUrls.push(urls[random])
        }
        return (sendUrls as any)
    } catch (error) {
        console.log(error)
    }
}

export const getNewLoveCoupon = async () => {
    try {
        // get the coupon where the isClaimed property is false
        const couponsRef = collection(db, "loveCoupons")
        const q = query(couponsRef, where("isClaimed", "==", false));
        
        const docsList = (await getDocs(q)).docs
        

        const docCurrent = docsList[Math.floor(Math.random() * docsList.length)]
        updateDoc(docCurrent.ref, {
            isClaimed: true
        })
        
        updateDoc(doc(db, "gamesData", "totalScore"), {
            prizesClaimed: increment(1)
        })

        return docCurrent.data().text

    } catch (error) {
        console.log(error)
        return "We ran out of prizes :("
    }
}

export const getAllActiveCoupons = async () => {
    try {
        const couponsRef = collection(db, "loveCoupons")
        const q = query(couponsRef, where("isClaimed", "==", true));
        
        const docsList = (await getDocs(q)).docs

        const coupons: {
            description: string;
            isCompleted: boolean;
        }[] = []
        for (const doc of docsList) {
            // console.log(doc.data())
            coupons.push({
                description: doc.data().text,
                isCompleted: doc.data().isCompleted
            })
        }
        
        return coupons

    } catch (error) {
        
    }
}

export const getLoveNotificationText = async () => {
    try {
        const notificationData = (await getDoc(doc(db, "loveNotifications", "notifications"))).data()
        // return random notification from the array
        const random = Math.floor(Math.random() * notificationData?.notes.length)
        return notificationData?.notes[random]
    } catch (error) {
        
    }
}

export const getLoveNotificationData = async () => {
    try {
        const notificationData = (await getDoc(doc(db, "loveNotifications", "notifications"))).data()
        return {isCheck: notificationData?.isChecked, time: notificationData?.time, lastTimeChecked: notificationData?.lastTimeChecked}
    } catch (error) {
        console.log(error)
    }
}

export const setLoveNotificationData = async (isCheck: boolean, time: string, lastTimeChecked?: Date) => {
    try {
        const notificationDoc = doc(db, "loveNotifications", "notifications")
        updateDoc(notificationDoc, {
            isChecked: isCheck,
            time: time,
        })
        if (lastTimeChecked){
            updateDoc(notificationDoc, {
                lastTimeChecked: lastTimeChecked.toISOString()
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const setLoveLastChecked = async (lastTimeChecked: Date) => {
    try {
        const notificationDoc = doc(db, "loveNotifications", "notifications")
        updateDoc(notificationDoc, {
            lastTimeChecked: lastTimeChecked.toISOString()
        })
    } catch (error) {
        console.log(error)
    }
}

// export const addStuff = async () => {
//     try {
//         const items = [
//             'I will buy you one book from anywhere you want', 
//             'I will make you a homemade meal of your choosing', 
//             'I will give you a piece of gum anywhere, I will find you and seek you out', 
//             'You can ask me anything and I will answer truthfully', 
//             'You can win any argument or disagreement with this just once', 
//             'We can have a game night and play any game you want', 
//             'A movie night together where we get to watch whatever movie you pick', 
//             'Redeem this for one dessert that I pay for when we go out', 
//             'Redeem this for unlimited smoochy smoochies 😚😚', 
//             'Redeem this for one free 👅🧠whenever you want 😏', 
//             'Redeem this for a free massage 💆‍♀️', 
//             'Redeem this for a bouquet of flowers of your choosing', 
//             'Redeem this for a quickie 😏😏', 
//             'Redeem this for one board game night', 
//             'Redeem this for one thing that I have to say yes to I can’t say no', 
//             'Redeem this for one picnic together in the park', 
//             'Redeem this for one photo of me any time you want 😏', 
//             'Redeem this for one song we sing together hahaha', 
//             'Redeem this for one summer school assignment I do for you', 
//             'Redeem this for one trip up to Monterey with me 🥰',
            
//         ]

     

//         for (const item of items) {
//             await addDoc(collection(db, "loveCoupons"), {
//                 isClaimed: false,
//                 isCompleted: false,
//                 text: item
//             })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }


// const addThem = async (downloadUrls: string[]) => {
//     console.log(downloadUrls.length)
//     await updateDoc(doc(db, "picturesUrls", "pictures"), {
//         urls: downloadUrls
//     })
// }

// export const addThingsToFirestore = async () => {
//     const listRef = ref(storage, "photos")
//     const listImages = await listAll(listRef)
//     const downloadUrls = []
//     for (const image of listImages.items) {
//         const downloadUrl = await getDownloadURL(image)
//         downloadUrls.push(downloadUrl)
//     }
//     addThem(downloadUrls)
// }