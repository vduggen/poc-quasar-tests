import PositionNotification from "../types/PositionNotification";

export default interface Notification {
    success(message: string, position: PositionNotification): void;
    error(message: string, position: PositionNotification): void;
}