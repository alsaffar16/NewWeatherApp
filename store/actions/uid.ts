export const UID = "UID";

export function userID(id: string) {
    return {
        type: UID,
        id: id,
    };
}
