import { cancelAllScheduledNotificationsAsync, getAllScheduledNotificationsAsync, scheduleNotificationAsync } from "expo-notifications";
import { getLoveNotificationData, getLoveNotificationText, setLoveLastChecked } from "./firebase/FirestoreFunctions";
import { makeDate } from "./src/components/Settings/LoveNotifications";

export const deleteNotifications = async () => {
    try {
        await cancelAllScheduledNotificationsAsync()
    //     const allScheduledNotifications = await getAllScheduledNotificationsAsync()
    // console.log(allScheduledNotifications.length, "all Notifs")
        console.log("notifications deleted")
    } catch (error) {
        console.log(error)
    }
}

export const scheduleNotification = async (time: string) => {

    console.log("starting notification");
    await cancelAllScheduledNotificationsAsync()

    for (let i = 1; i < 8; i++) {
        let notificationTime = makeDate(time)
    // check if notificationTime is in the past

        if (notificationTime < new Date()) {
            notificationTime.setDate(notificationTime.getDate() + i)
        }
        // console.log(i)
        notificationTime.setSeconds(0)

        console.log(notificationTime.toLocaleString())

        const notification = await getLoveNotificationText()
        console.log(notification)
        scheduleNotificationAsync({
            content: {
            title: "Love Notification",
            body: notification,
            data: { data: "Goes here" },
            sound: "default",
            vibrate: [1000],
            },
            trigger: notificationTime
        });
    }

    // const allScheduledNotifications = await getAllScheduledNotificationsAsync()
    // console.log(allScheduledNotifications, "all Notifs")
  
};


export const checkNotificationsOnStart = async () => {
    try {
        const notificationsData = await getLoveNotificationData()
        // check if lastTimeChecked was over 4 days ago
        console.log("checking for date")
        // console.log(new Date(notificationsData?.lastTimeChecked))
        if (!notificationsData?.isCheck) return
        if (new Date(notificationsData?.lastTimeChecked) < new Date(new Date().getTime() - (4 * 24 * 60 * 60 * 1000))) {
            console.log("It was too long ago")
            await setLoveLastChecked(new Date())
            const notificationsData = await getLoveNotificationData()
            scheduleNotification(notificationsData?.time)
        } 
    } catch (error) {
        console.log(error)
    }
}
