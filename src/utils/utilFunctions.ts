import moment from "moment";

export function FormatDateBr(date: string) {
    return moment(date, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm");
}

export function stringClean(str: string) {

    str = str.trim();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/\s+/g, '-');
    str = str.replace(/[^\w\s-]/g, '');
    str = str.toLowerCase();

    return str;
}
