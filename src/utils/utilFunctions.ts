import moment from "moment";

export function FormatDateBr(date: string) {
    return moment(date, "YYYY-MM-DD hh:mm").format("DD/MM/YYYY HH:mm");
}