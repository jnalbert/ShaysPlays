import { collection, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore"
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

// export const addThingsToFirestore = async () => {
//     setDoc(doc(db, "gamesData", "totalScore"), {
//         gamesWon: 0,
//     })
// }