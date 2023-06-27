export default function (name) {
    let nameParts = name.split('#');
    if (nameParts.length == 1) return name;
    if (parseInt(nameParts[1]) == 0)
        return nameParts[0]
    else
        return name;
}