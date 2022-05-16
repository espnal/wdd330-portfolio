let fruits = { name: "apple", color: "red" };
let vegetables = { name: "brocoli", color: "green" };

function type() {
    console.log(`${this.color} ${this.name} `);
}

fruits.f = type;
vegetables.f = type;

fruits.f();
vegetables.f();