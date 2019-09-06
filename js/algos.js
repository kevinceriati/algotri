// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
    let GrenobleLat = 45.166667;
    let GrenobleLong = 5.716667;

    let R = 6371; // rayon de la terre en km
    let lat1 = GrenobleLat;
    let lat2 = city.latitude;
    let lon1 = GrenobleLong;
    let lon2 = city.longitude;

    let deltaLat = (lat2 - lat1).toRadians(); // distance de lat entre les 2 => delta
    let deltaLong = (lon2 - lon1).toRadians();

    let a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1.toRadians()) * Math.cos(Number(lat2).toRadians()) *
        Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)

    let temp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = temp;
}


// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)

    if (csvData[i].dist < csvData[j].dist) {
        return true
    }
}


/////////////////////////////////////////////        Insertion        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertsort() {

    for (let i = 0; i < csvData.length; i++) {
        var j = i - 1;
        while (j >= 0 && isLess(j + 1, j)) {
            swap(j, j + 1);
            j--;
        }
    }
    return csvData;
}


/////////////////////////////////////////////        Selection        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function selectionsort() {

    for (let i = 0; i < csvData.length; i++) {
        for (let j = i + 1; j < csvData.length; j++) {
            if (isLess(j, i)) {
                swap(i, j);
            }
        }
    }
}


/////////////////////////////////////////////        Bulle         /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function bubblesort() {

    var length = csvData.length;
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < (length - i - 1); j++) {
            if (isLess(j + 1, j)) {
                swap(j, j + 1);
            }
        }
    }
}


/////////////////////////////////////////////        Shell         /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function shellsort() {

    var length = csvData.length;
    let increment = 701;
    let arrInc = [1, 4, 10, 23, 57, 132, 301, 701];
    let g = arrInc.length - 1;
    if (length > 1600) {
        while (increment < length)
            increment = Math.floor(increment * 2.3)
    }

    while (increment >= 1) {

        for (let i = increment; i < csvData.length; i++) { // 8 => n

            let j = i; // 8

            while (j >= increment && isLess(j, j - increment)) {
                swap(j, j - increment);
                j -= increment;
            }
        }

        if (increment > arrInc[arrInc.length - 1]) {
            increment = Math.floor(increment / 2.3)
        } else {
            increment = arrInc[g];
            g--
        }
    }
}


/////////////////////////////////////////////        Fusion         /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*function mergesort(half = array.length/2) {
}*/

// top-down implementation


function merge(left, right) {
    let arr = [];
    let j = 0;


    while (j < left.length && j < right.length) {

        if (isLess(left[j], right[j])) {
            swap(left[j], right[j]);
            arr.push(left.shift());
        } else {
            swap(left[j], right[j]);
            arr.push(right.shift());
        }
        j++;
    }
    console.log(arr);
    return arr.concat(left.slice().concat(right.slice()));
}

function mergesort() {

    function mymerge(arr) {

        if (arr.length < 2) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        return merge(mymerge(left), mymerge(right));
    }

    mymerge(csvData);
}

/*const mergesort = (t1, t2) => {

    let i = 0, j = 0, k = 0;
    let n = t1.length, m = t2.length;
    let t = new csvData(n+m);

    while (i < n && j < m) {
        if (t1[i] < t2[j]) {
            t[k] = t1[i];
            i++;
        } else {
            t[k] = t2[j];
            j++;
        }
        k++;
    }
    while (i < n) {
        t[k] = t1[i];
        i++;
        k++;
    }
    while (j < m) {
        t[k] = t2[j];
        j++;
        k++;
    }
    return t;
}*/


/*    if(csvData.length <= 1) return csvData;
    const middle = Math.round(csvData.length / 2) ;
    const left = csvData.slice(0, middle);
    const right = csvData.slice(middle, csvData.length);
    console.log(middle);
    console.log(left);
    console.log(right);
    return mergeFusion(mergesort(left), mergesort(right));
};

const mergeFusion = (left, right) => {
    displayBuffer.push(['swap', left, right]);
    displayBuffer.push(['compare', left, right]);
    let result = [];
    while(left.length || right.length) {
        if(left.length && right.length) {
            if(left[0] < right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
        } else if(left.length) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    return result;
};*/


function heapsort() {
    console.log("heapsort - implement me !");
}


function quicksort() {
    sorting = (start, end) => { // a l'appel je lui inject mes index de debut et de fin (definition de ma plage de tri)
        if (start < end) { // je controle que mon index de debut est bien inférieure a mon index de fin
            let p = parting(start, end) // je definis un pivot (cf: methode parting split de mon tableau en plage inférieure et plage superieur)
            sorting(start, p - 1) // fonction recursive  sur ma plage inférieure
            sorting(p + 1, end)  // fonction recursive sur ma plage suppérieure
        }
    }
    parting = (start, end) => { // a l'appel je lui inject mes index de debut et de fin (definition de ma plage de tri)
        let p = Math.floor(Math.random() * (end - start) + start); // Definition aléatoire du pivot => plus opti !
        swap(p, end); //Mise en place du pivot à la fin de mon tableau
        p = end; // Récupération de l'index du pivot
        let i = start - 1;
        let j = start; // je definit un pivot a la fin de ma plage de tri et deux index de comparaison
        while (j < p) { // tant que mon index de test est inférieur a mon index de pivot
            if (isLess(p, j)) { // est ce que la valeur de mon test est inférieur a la valeur de mon pivot
                j++ // je change de valeur de test
            } else {  // sinon
                i++ // j'incremente mon index de debut de plage de référence afin de reduire celle ci
                swap(j, i) // switch des valeur entre la valeur de test et la valeur d'index
                j++ // je passe a la valeur de test suivante
            }
        }
        swap(i + 1, p) // les tests fini je place mon pivot (qui est ma valeur moyenne) apres ma plage de valeurs inférieure
        return i + 1 // je retourne la longeur de la prochaine plage de valeur a tester
    };
    sorting(0, csvData.length - 1)   // Premier appel de ma methode
}


function quick3sort() {
    console.log("quick3sort - implement me !");
}


function sort(algo) {
    switch (algo) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}
