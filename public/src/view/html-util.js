export function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function htmlToElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstElementChild;
}

export function element(strings, ...values) {
    const htmlString = strings.reduce((result, str, i) => {
        if (typeof values[i - 1] == "string") {
            return result + escapeSpecialChars(values[i - 1]) + str;
        }
        else result + String(values[i - 1]) + str;
    });

    return htmlToElement(htmlString);
}

export function render(bodyElement, containerElement) {
    containerElement.innerHTML = "";
    containerElement.appendChild(bodyElement);
}