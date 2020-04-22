const mem = require('./memory.js');
const memory = new mem();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        memory.set(this.ptr, this.length, value);
        this.length++
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('out of memory')
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }
}

function main() {

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);
    console.log(arr);
    console.log(arr.get(0))

}

main();

//2. Explore the push() method
//arr.push(3): (length: 1, _capacity: 3, memory address: 0)

//arr.push(multiplevalues): (length: 6, _capacity: 12, memory address: 3)
//Length is factoring for the fact that 6 instances were made
//Capacity is how many lengths it's capable to hold at this time
//These instances live in memory address 3



//3. Exploring the pop() method
//Length: 3, _capacity: 12, ptr: 3
//pop() removes an item each time it's ran