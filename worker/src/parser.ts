export function parse(text: any, values: any, startDelimiter = "{", endDelimiter = "}"): string {
    // Validate the input 'text' is a string
    if (typeof text !== 'string') {
        console.error("Invalid input: 'text' must be a string. Received:", text);
        return "";
    }
    let finalString = "";
    let currentIndex = 0;

    while (currentIndex < text.length) {
        const startIdx = text.indexOf(startDelimiter, currentIndex);
        if (startIdx === -1) {
            finalString += text.slice(currentIndex);
            break;
        }

        finalString += text.slice(currentIndex, startIdx);

        const endIdx = text.indexOf(endDelimiter, startIdx);
        if (endIdx === -1) {
            console.error(`Missing closing delimiter "${endDelimiter}" after position ${startIdx}.`);
            return finalString + text.slice(startIdx); // return the remaining unparsed text
        }

        const placeholder = text.slice(startIdx + 1, endIdx).trim();
        const keys = placeholder.split('.');

        let resolvedValue: any = values;
        try {
            for (const key of keys) {
                if (resolvedValue === undefined || resolvedValue === null) {
                    console.warn(`Key "${key}" not found or is null in values. Using fallback empty string.`);
                    resolvedValue = "";
                    break;
                }
                resolvedValue = resolvedValue[key];
            }
        } catch (error) {
            resolvedValue = "";
        }

        // Append resolved value or empty string if undefined
        finalString += (resolvedValue !== undefined ? resolvedValue : "");

        currentIndex = endIdx + 1;
    }

    return finalString;
}
