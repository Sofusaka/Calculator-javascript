const display = {  //manejo del display y todas sus funcionalidades (borrar, borrar de a uno, agregar numeritos etc)
    content: document.getElementById("display"),
    limit: 9,
    nchar: 0,
    go: function () {
        return this.nchar < this.limit;
    },

    add: function (key) {
        if (this.go()) {

            if (key === 'sign') {
                this.content.value = eval(this.content.value) * -1;
                return;
            }
            if (this.content.value.search(/[,]/) !== -1 && key == '.') {
                return
            }

            if (this.content.value === '0' && key !== '.') {
                this.content.value = '';
                this.nchar = 0;
            }


            this.nchar++
            this.content.value += (key);
        }
    },

    delete: function (key) {

        if (key === 'delete') {

            this.content.value = '';
            this.nchar = 0;
            calculator.memory.Array = [];
        }

    },

    deleteLast: function (key) {

        if (key === 'back') {
            this.content.value = this.content.value.slice(0, -1);
            this.nchar--
        }

    }

}

function addKeyDisplay(key) { //numeritos
    display.add(key);
}

function deleteAllDisplay(key) {  //delete all entry, tecla C

    display.delete(key);

}

function deleteLatEntry(key) { //tecla back

    display.deleteLast(key);
}

const calculator = { //calculadora, operaciones etc


    //

    memory: {

        Array: [],
        push: function (value) {
            this.Array.push(value);
        },

        pop: function () {
            this.Array.pop(value);
        },

        clear: function () {
            this.Array(value);
        },

        isEmpty: function () {
            return this.Array.length === 0;
        },

        peek: function () {
            return this.Array[this.Array.length - 1];
        },



    },

    add: function (a, b) {

        return a + b;
    },

    subtract: function (a, b) {
        return a - b;
    },

    multiply: function (a, b) {
        return a * b;
    },

    divide: function (a, b) {
        return a / b;
    },

    sqrt: function (a) {

        return Math.sqrt(a)
    },

    square: function (a) {
        return Math.pow(a, 2);
    },

    percent: function (a, b) {
        return (a / b) * 100;
    },

    inverse: function (a) {
        return (1 / a);
    },

    Operation: function (operation) {

        let current_value = display.content.value; //

        this.memory.Array.push(current_value);
        console.log(this.memory.Array);
        current_value = "0";
        display.content.value = current_value;
        let num = this.memory.Array[this.memory.Array.length - 1];
        console.log(this.memory.Array)
        this.memory.Array.push(operation);

        if (operation === "equals") {

            this.memory.Array.pop(-1);
            operation = this.memory.Array[this.memory.Array.length - 2];

        }

        if (this.memory.Array.length > 2.5) {

            num = this.memory.Array[0];
            let num_1 = this.memory.Array[this.memory.Array.length - 1];

            switch (operation) {
                case "suma":

                    display.content.value = this.add(parseFloat(num), parseFloat(num_1));

                    this.memory.Array = [];

                    console.log(this.memory.Array);
                    break

                case "resta":
                    display.content.value = this.subtract(parseFloat(num), parseFloat(num_1));
                    this.memory.Array = [];
                    break

                case "multiplicacion":
                    display.content.value = this.multiply(parseFloat(num), parseFloat(num_1));
                    this.memory.Array = [];
                    break

                case "division":
                    display.content.value = this.divide(parseFloat(num), parseFloat(num_1));
                    this.memory.Array = [];

                    break
                case "%":
                    display.content.value = this.divide(parseFloat(num), parseFloat(num_1));
                    this.memory.Array = [];

                    break

            }
        }
        switch (operation) {

            case "frac":
                display.content.value = this.inverse(num);
                this.memory.Array = [];
                break

            case "sqrt":
                display.content.value = this.sqrt(num);
                this.memory.Array = [];
                break
            case "pow":
                display.content.value = this.square(num);
                this.memory.Array = [];
                break


        }



    },
}

function MathOperation(key) {
    calculator.Operation(key);
}