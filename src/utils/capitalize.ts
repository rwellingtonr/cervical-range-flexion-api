export const capitalize = (payload: string) => {
    return payload.replace(/(\b[a-z](?!\s))/g, (match) => match.toUpperCase())
}
