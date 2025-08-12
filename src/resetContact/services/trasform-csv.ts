export const transformCsv = (csv) => {
    const csvBuffer = csv.split('\r\n')
    const firstElement = csvBuffer.shift()
    const csvRow = firstElement.split(',')

    const contacts = csvBuffer.map((line) => {
        const contact = {}
        for(let i = 0; i < csvRow.length; i++) { 
            const value = line.split(',')[i]
            contact[csvRow[i]] = value
        }
        return contact
    } )
    return contacts
}