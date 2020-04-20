//import memory module
const Memory = require('./memory');

class Array {
    //array starts at length of 0
    //pointer starts at 0
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    //resize array for space for the new item
    //set memory to be equal to the value
    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    //resize function
    //allocate a new, larger chunk of memory
    //copy any existing values from the old to the new chunk and free the old chunk
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
}
Array.SIZE_RATIO = 3;