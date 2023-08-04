
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';
import { Component, OnInit,OnChanges, EventEmitter, ElementRef, ChangeDetectorRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule,FormControl,FormBuilder } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatRippleModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { HttpClientModule,HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
  standalone:true,
  imports: [
    CommonModule,
    NgForOf,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatRippleModule,
    HttpClientModule
   
    

  ]
})
export class ProductTableComponent implements OnInit {

  TotalItems : Product[] = [];

  
  

  constructor(private ProductService : ProductService) {}

  

  ngOnInit(): void {debugger
    this.ProductService.getProducts().subscribe((result:Product[]) => {
      debugger
      console.log(result)
      this.TotalItems = result;
      console.log(this.TotalItems);
      this.getPageData();

    });

    this.getPageData();

  }


  sortColumn!: string;
  sortOrder!: string;

  headers: any;

  searchTerm: any;
  SearchItems: any = this.TotalItems;


  pageSize: number = 5;
  pageIndex: number = 1;
  DisplayedItems: any;
  pageNumbers: number[] = [];
  TotalRow: number = this.TotalItems.length;


  lastpageSize: number = 5;



  clearBox(elementID: any) {
    const lasttable = <HTMLElement>document.querySelector(elementID);

    lasttable.innerHTML = '';
  }


  createTable() {

    
    const includeSelectionColumn = true; // Set this to true or false based on your preferences
    const includeToolbarColumn = true; // Set this to true or false based on your preferences

    this.clearBox('#table-wrapper');
    const body = <HTMLElement>document.querySelector('#table-wrapper');

    const tbl = document.createElement("table");
    tbl.classList.add("mytable");
    tbl.style.width = '100%';
    tbl.style.borderCollapse = 'collapsed';

   

    const tblheader = document.createElement("thead");
    tblheader.style.borderBottom = '1px solid gray';
    tblheader.style.padding = '8px';
    tblheader.style.textAlign = 'center';
    tblheader.style.backgroundColor = '#000';
    tblheader.style.color = 'white';
    

    const tblBody = document.createElement("tbody");
    //tblBody.style.border = '1px solid #ddd';
    tblBody.style.padding = '8px';
    tblBody.style.textAlign = 'center';



    const headerrow = document.createElement("tr");

    if (includeSelectionColumn) {
      const selectionHeader = document.createElement("th");
      selectionHeader.style.paddingTop = '12px';
      selectionHeader.style.paddingBottom = '12px';
      selectionHeader.style.cursor = 'pointer';
      headerrow.appendChild(selectionHeader);
    }



    for (const element of [Object.keys(this.DisplayedItems[0])].toString().split(',')) {
      let headercell = document.createElement("th");
      headercell.style.paddingTop = '12px';
      headercell.style.paddingBottom = '12px';
      headercell.style.cursor='pointer';
      headercell.style.borderWidth='0';
      let headercelltext = document.createTextNode(element);
      headercell.addEventListener('click', () => {
         this.sortTable(element);
        this.createTable();
      });


       // Add arrow indicator to the sorted column header
    if (this.sortColumn === element) {
      const arrowIcon = document.createElement('img');
      arrowIcon.src = (this.sortOrder === 'asc') ? 'assets/icons8-slide-up-30.png' : 'assets/icons8-down-button-30.png';
      arrowIcon.style.height = '20px';
      arrowIcon.style.width = '20px';
      arrowIcon.style.marginRight='5px';
      headercell.appendChild(arrowIcon);
    }

      headercell.appendChild(headercelltext);
      headerrow.appendChild(headercell);
    };


        // Add toolbar column header if requested
  if (includeToolbarColumn) {
    const toolbarHeader = document.createElement("th");
    toolbarHeader.style.paddingTop = '12px';
    toolbarHeader.style.paddingBottom = '12px';
    toolbarHeader.style.cursor = 'pointer';
    let toolbarHeadertext = document.createTextNode('Toolbar');
    toolbarHeader.appendChild(toolbarHeadertext);
    headerrow.appendChild(toolbarHeader);
  }




    for (const item of this.DisplayedItems) {
      let row = document.createElement("tr");
      row.style.borderBottom = '1px solid gray';
      row.classList.add("table-row");
      row.addEventListener('pointerenter', () => {
        row.style.backgroundColor = '#ddd'
      });
      row.addEventListener('pointerleave', () => {
        row.style.backgroundColor = 'white'
      });




      // Add selection checkbox if requested
    if (includeSelectionColumn) {
      let selectionCell = document.createElement("td");
      selectionCell.style.paddingTop = '10px';
      selectionCell.style.paddingBottom = '10px';

      let selectionCheckbox = document.createElement("input");
      selectionCheckbox.type = "checkbox";
      selectionCheckbox.addEventListener('click', (event) => {
        // handle checkbox click event here
      });

      selectionCell.appendChild(selectionCheckbox);
      row.appendChild(selectionCell);
    }


   
      let i = 0;

      for (const element of [Object.keys(this.DisplayedItems[0])].toString().split(',')) {

        let cell = document.createElement("td");
        cell.style.paddingTop = '10px';
        cell.style.paddingBottom = '10px';


        switch ([Object.keys(this.DisplayedItems[0])].toString().split(',')[i]) {
          case [Object.keys(this.DisplayedItems[0])].toString().split(',')[0]:
            let cellTextAutoID = document.createTextNode(item.AutoID);
            cell.appendChild(cellTextAutoID);
            break;
          case [Object.keys(this.DisplayedItems[0])].toString().split(',')[1]:
            let cellTextName = document.createTextNode(item.Name);
            cell.appendChild(cellTextName);
            break;
          case [Object.keys(this.DisplayedItems[0])].toString().split(',')[2]:
            let cellTextPrice = document.createTextNode(item.Price);
            cell.appendChild(cellTextPrice);
            break;
          case [Object.keys(this.DisplayedItems[0])].toString().split(',')[3]:
            let cellTextStatues = document.createTextNode(item.Statues);
            cell.appendChild(cellTextStatues);
            break;
          case [Object.keys(this.DisplayedItems[0])].toString().split(',')[4]:
            let cellTextDescription = document.createTextNode(item.Description);
            cell.appendChild(cellTextDescription);
            break;
        }


        

        i++

        row.appendChild(cell);

      }


       // Add toolbar column if requested
    if (includeToolbarColumn) {
      let toolbarCell = document.createElement("td");
      toolbarCell.style.paddingTop = '10px';
      toolbarCell.style.paddingBottom = '10px';

      let deleteButton = document.createElement("button");
      
      deleteButton.classList.add("delete-button");
      deleteButton.style.marginRight = '10px';
      deleteButton.style.width='40px';
      deleteButton.style.height='40px';
      deleteButton.style.borderRadius='50%';
      deleteButton.style.alignContent='center';
      deleteButton.style.cursor ='pointer';
      deleteButton.addEventListener('click', (event) => {
        // handle delete button click event here
      });

      const deleteIcon = document.createElement('img');
      deleteIcon.src = 'assets/recycle-bin-icon.svg';
      deleteIcon.style.width='20px';
      deleteIcon.style.height='20px';
      deleteButton.appendChild(deleteIcon);

      let editButton = document.createElement("button");
      editButton.style.width='40px';
      editButton.style.height='40px';
      editButton.style.borderRadius='50%';
      editButton.style.alignContent='center';
      editButton.style.cursor ='pointer';
      editButton.classList.add("edit-button");
      editButton.addEventListener('click', (event) => {
        // handle edit button click event here
      });
// ClientApp/src/icons/round-black-left-arrow-icon.png
      const editIcon = document.createElement('img');
      editIcon.src = 'assets/hammer-icon.svg';
      editIcon.style.width='20px';
      editIcon.style.height='20px';
      editButton.appendChild(editIcon);

      toolbarCell.appendChild(deleteButton);
      toolbarCell.appendChild(editButton);
      row.appendChild(toolbarCell);
    }



      tblBody.appendChild(row);
    }


    tblheader.appendChild(headerrow);
    tbl.appendChild(tblBody);
    tbl.appendChild(tblheader);
    body.appendChild(tbl);

    

  }




  totalPages(): number {
    return Math.ceil(this.TotalRow / this.pageSize);
  }



  createoptionvalue(): void {
    this.clearBox('#page-select');
    const select = <HTMLSelectElement>document.getElementById("page-select");
    for (let page of this.pageNumbers) {
      const option = document.createElement('option') as HTMLOptionElement;
      option.style.borderRadius = '4px';
      option.value = page.toString();
      option.text = page.toString();

      if (page === this.pageIndex + 1) {
        option.selected = true;
      }
      select.appendChild(option);
    }
  }




  calculatePageNumbers() {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      this.pageNumbers.push(i);
    }
    this.createoptionvalue()
  }



  getPageData() {
    debugger
    this.lastpageSize = this.pageSize;
    const startIndex = (this.pageIndex) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.calculatePageNumbers();
    this.DisplayedItems = this.TotalItems.slice(startIndex, endIndex);
    this.createTable();
  }



  nextPage() {
    this.pageIndex++;
    /*    alert('bruh nxt');*/
    this.getPageData();
  }


  firstPage() {
    this.pageIndex = 0;
    /*    alert('bruh first');*/
    this.getPageData();
  }

  prevPage() {
    this.pageIndex = this.pageIndex - 1;
    /*    alert('bruh perv');*/
    this.getPageData();
  }



  lastPage() {
    this.pageIndex = this.totalPages() - 1;
    /*    alert('bruh last');*/
    this.getPageData();
  }


  pageSizeChanged(newSize: number) {
    if (newSize == 0 || newSize == null) {
      this.pageSize = this.lastpageSize;
      newSize = this.pageSize;
      alert(this.pageSize)
    }
    this.pageSize = newSize;
    this.pageIndex = 0;
    /*    alert('bruh size');*/
    this.calculatePageNumbers();
    this.getPageData();
  }


  pageIndexChanged(newPageIndex: number) {
    this.pageIndex = newPageIndex - 1;
        // alert('pageIndex');
    this.getPageData();
  }



  Search() {

    this.DisplayedItems = this.SearchItems.filter((item: { [x: string]: { toString: () => string; }; hasOwnProperty: (arg0: string) => any; }) => {
      for (const key in item) {
        if (item.hasOwnProperty(key) && item[key].toString().toLowerCase().includes(this.searchTerm.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    this.createTable();


  }


  sortTable(column: string) {
       if (this.sortColumn === column) {
         // If the same column is clicked again, toggle the sorting order
         this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'dfn';
       } else {
         // If a new column is clicked, sort in ascending order
         this.sortOrder = 'asc';
         this.sortColumn = column;
       }
    
      this.TotalItems.sort((a, b) => {
         let comparison = 0;
        if (a[this.sortColumn] > b[this.sortColumn]) {
           comparison = 1;
        } else if (a[this.sortColumn] < b[this.sortColumn]) {
           comparison = -1;
         }
         return (this.sortOrder === 'desc') ? comparison * -1 : comparison;
       });
    
       // If the same column is clicked three times, sort by AutoID
       if (this.sortColumn === column && this.sortOrder === 'dfn' && column !== 'AutoID') {
        this.sortOrder = 'dfn';
         this.sortColumn = 'AutoID';
         this.TotalItems.sort((a, b) => a.AutoID - b.AutoID);
       }
      
       this.getPageData();
     }
    












}

