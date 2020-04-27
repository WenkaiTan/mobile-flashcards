import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const NOTIFICATION_KEY = 'mobile_flashcards:notificationS'

export function clearNotification(){
    AsyncStorage.removeItem(NOTIFICATION_KEY)
     .then(NOTIFICATIONS.cancelAllScheduledNotificationsAsync())
}

function createNotification(){
    return{
        title:'Mobile_flashcards',
        body: "Don't forget to study today!!!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }

    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
             .then(({status}) => {
                 if (status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync()

                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)

                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day'
                        }
                    )

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                 }
             })
        }
    })
}