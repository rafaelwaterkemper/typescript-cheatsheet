let message: string = 'Hello world';
message += ' Rafa Water';
console.log(message)

//Rest parameters should be defined as an Array
function sum(...values: number[]) {
    return values.reduce((previous, current) => {
        return previous + current;
    })
}

// ========== Functions ==============
type Add = (a: number, b: number) => number;

let add: Add;
add = function(a: number, b: number): number {
    return a + b;
}

add = (a, b) => a + b;
// ========== Functions ==============

type Person = {
    name: string,
    age: number,
    address: {
        street: string,
        number: number
    },
    emails: {
        email: string
    }[]
}
//Lookup types
type AddressType = Person['address']
type EmailsType = Person['emails'][0]