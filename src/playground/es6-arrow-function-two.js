//arguments objet - no longer bound with arrow

const add = (a,b) => {
    // console.log(arguments);
    return a+ b;
}

console.log(add(55,20));

//this keyword - no longer bound

const user = {
    name: "Andrew",
    cities: ["philadelphia", "New York", "Dublin"],
    printPlacesLived(){
        const cityMessages = this.cities.map((city) => this.name + " has lived in " + city);

        // this.cities.forEach((city) =>{
        //     console.log(this.name + " has lived in " + city);
        // })

        // this.cities.forEach(function(city){
        //     console.log(this.name + " has lived in " + city);
        // })
        return cityMessages;
    }

}
console.log(user.printPlacesLived());


const multiplier = {
    numbers: [10, 20, 4, 60 , 22],
    multiplyBy: 62,
    multiply() {
        return this.numbers.map((number) => this.multiplyBy * number);
    }

}

console.log(multiplier.multiply());
