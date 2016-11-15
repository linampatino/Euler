'use strict';

var triangle;

    function readTriangle(fileOutput) {
        var text = fileOutput;
        var lines = text.split("\n");
        triangle = createTriangleMatrix(lines.length);

        if(text===null || text.length==0){
            throw "Inavalid Text";
        }
        

        for (var indRow = 0; indRow < lines.length; indRow++) {
            var row = lines[indRow].trim();
            row = row.split(' ');

            //fill matrix
            for (var indCol = 0; indCol < row.length; indCol++) {
                if (/^([0-9])*$/.test(row[indCol])) {
                    triangle[indRow][indCol] = row[indCol];
                } else {
                    throw "Invalid Number";
                }
            }
        }
    }

    function createTriangleMatrix(length) {
        var triangle = new Array(length);
        for (var i = 0; i < triangle.length; i++) {
            triangle[i] = new Array(triangle.length);
        }
        return triangle;
    }

    function getMaxSum(indexRow, indexCol) {
        // index is the top of the triangle ao three
        var top = triangle[indexRow][indexCol];
        var result = { sum: 0, path: '' };

        //get adjacents 
        if (indexRow < triangle.length - 1 && indexCol < triangle[0].length - 1) {
            var adj1 = triangle[indexRow + 1][indexCol];
            var adj2 = triangle[indexRow + 1][indexCol + 1];

            if (adj1 > adj2) {
                result = getMaxSum(indexRow + 1, indexCol);
            } else {
                result = getMaxSum(indexRow + 1, indexCol + 1);
            }
        }

        result.sum = result.sum + parseInt(top);
        result.path = top + ' - ' + result.path;
        return result;
    }

    function maximumPath(fileOutput) {
        try{
            readTriangle(fileOutput);
            var maxSum = getMaxSum(0, 0);
            cambiarContenido(maxSum);
        } catch (e) {
            errorForm(e);
        }
        

    }

    function errorForm(text) {
        document.getElementById("textTriangle").className = "row form-group has-error";
        document.getElementById("errorTriangle").innerHTML = "Error reading triangle " + text;
        document.getElementById("execute").disabled = true;
        document.getElementById("fileInput").disabled = true;
        document.getElementById("clear").style.display = "inline";
    }

    function cambiarContenido(maxSum) {
        document.getElementById("sum").innerHTML = maxSum.sum;
        document.getElementById("path").innerHTML = maxSum.path;
        //form-group has-error
    }

    function clearForm() {
        document.getElementById("textTriangle").className = "row";
        document.getElementById("errorTriangle").innerHTML = "";
        document.getElementById("execute").disabled = false;
        document.getElementById("fileInput").disabled = false;
        document.getElementById("sum").innerHTML = "";
        document.getElementById("path").innerHTML = "";
        document.getElementById("fileOutput").textContent = "";
        document.getElementById("clear").style.display = "none";
    }