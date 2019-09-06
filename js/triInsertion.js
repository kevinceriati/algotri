////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////         TRI PAR INSERTION            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let array = [10,7,6,2,5,4,1,3,8,9];

for(let i = 0; i < array.length; i++){
    let temp = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > temp) {
        array[j + 1] = array[j];
        j--
    }
    array[j + 1] = temp;
}

document.write("<br> Tri par insertion <br>");

for (let i = 0; i < array.length; i++){
    document.write(array[i]+" ,")
}