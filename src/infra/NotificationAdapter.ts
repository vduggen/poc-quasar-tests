import Notification from "./Notification";
import { Notify } from 'quasar';
import PositionNotification from "../types/PositionNotification";
import TypeNotification from "../types/TypeNotification";

export default class NotificationAdapter implements Notification {
    success(message: string, position: PositionNotification): void {
        Notify.create({
            type: 'positive' as TypeNotification,
            message,
            position
        })
    }
    
    error(message: string, position: PositionNotification): void {
        Notify.create({
            type: 'negative' as TypeNotification,
            message,
            position
        })
    }
}