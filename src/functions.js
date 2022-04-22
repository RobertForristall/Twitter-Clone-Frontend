
export function range (start, end) {
    return new Array(end-start).fill().map((d, i) => i + start)
}

export function hasUpper(str) {
    var pattern = new RegExp(
        "^(?=.*[A-Z]).+$"
    )
    return pattern.test(str)
}

export function hasLower(str) {
    var pattern = new RegExp(
        "^(?=.*[a-z]).+$"
    )
    return pattern.test(str)
}

export function hasNumber(str) {
    var pattern = new RegExp(
        "^(?=.*\\d).+$"
    )
    return pattern.test(str)
}

export function hasSpecial(str) {
    var pattern = new RegExp(
        "^(?=.*[-+_!@#$%^&*.,?]).+$"
    )
    return pattern.test(str)
}