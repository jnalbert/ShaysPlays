import { doc, getDoc, increment, updateDoc } from "firebase/firestore"
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