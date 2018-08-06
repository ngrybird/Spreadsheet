var Spreadsheet  = function(options){
    console.log('Hello From SpreadSheet');
    var screenWidth, screenHeight;
    /** 
    *    function createContainer creates the container for spreadsheet.
    *    it uses screenWidth and screenHeight variable to create a container.
    */
    function createContainer(){
        var c = document.createElement("div");
        c.style.display = "block";
        c.style.minWidth = screenWidth + 'px';
        c.style.height = screenHeight + 'px' ;
        //c.style.display = 'table';
        c.style.overflow = "scroll";
        c.style.overflowY = "scroll";
        c.style.position = "relative";
        c.style.padding = 0;
        c.style.border = "1px solid black";
        return c;
    };


    /**
     * function createHeader prepares the header of the spreadsheet/table and inject 
     * it on the top of the table
     */
    function createHeader(){
        var header = document.createElement('div');
        header.style.width = this.width;
        header.style.overflow = scroll;
        
    }

    this.render = function(fromPosition, howMany){
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this.scroller);

        var row;
        for(var i = fromPosition; i < howMany ; i++){
            row = this.createRow(i);
            fragment.appendChild(row);
        }

        this.container.appendChild(fragment);
    }

    /**
     * createRow function prepares the div element and call the createCell function
     * for associated row : rowNumber.
    */
    this.createRow = function(rowNumber){
        var row = document.createElement('div');
        var cell;
        row.classList.add('row');
        for(var i = 0; i < this.columns.length; i++){
            cell = this.createCell(this.data[rowNumber][i]);
            row.appendChild(cell);
        }
        return row;
    }
    
    /**
    *  createCell function returns a cell for the row.
    * value to be displayed in the cell is passed to this function as argument.  
    */
    this.createCell = function(value){
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.minWidth = this.cellWidth;
        cell.innerHTML = value;
        return cell;
    }
    /**
     *   
    */
    this.createScroller = function(){
        console.log(screenWidth);

        var scroller = document.createElement("div");
        scroller.style.opacity = 0;
        scroller.style.position = "absolute";
        scroller.style.top = 0;
        scroller.style.left = 0;
        scroller.style.width = "1px";
        scroller.style.height = this.totalHeight + "px";
        return scroller;
    };


    this.onScroll = function(event){
        console.log(event);
    };    
    
    // private members --> totalHeight, cellHeight, cellWidth, data, totalRows, columns;
    //Initialize options to the Spreadsheet
    this.init = function (){
        screenWidth = options.screenWidth;
        screenHeight = options.screenHeight;
    
        this.cellHeight = options.cellHeight;
        this.cellWidth = options.cellWidth;
        this.columns = options.columns;
        this.data = options.data;
        this.totalRows = options.data.length;
        this.totalHeight = this.totalRows *  this.cellHeight;
    };

    this.init();
    
    //Create a container form screenHeight and screenWidth
    this.container = createContainer();
    this.container.addEventListener("scroll", this.onScroll);
    this.scroller = this.createScroller();

    // Initially display 4 time of rows visible in a container.
    this.render(0, 30);
}


var columns = ['a','b','c'];
var data = new Array(1000);
for (i=0; i <1000; i++) {
    data[i]=new Array(3)
 }
for(var i = 0; i<1000;i++){
    for(var j = 0; j < 3; j++){
        console.log(i +' '+j);
        data[i][j] = columns[j]+i+j;
    }
}

var options = {
    screenWidth : 300,
    screenHeight : 300,
    cellHeight : 30,
    cellWidth : 100,
    columns : columns,
    data : data
}
var list = new Spreadsheet(options);
list.container.style.marginLeft = "auto";
list.container.style.marginRight = "auto";  
document.querySelector("#placeholder").appendChild(list.container);