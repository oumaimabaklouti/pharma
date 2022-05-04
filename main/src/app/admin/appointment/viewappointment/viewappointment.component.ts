import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Validators,FormGroup,FormBuilder } from "@angular/forms";
import { MedicamentService } from "../../medicament.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
export interface medicaments{
  _id:string
  nom:string
  description:string
  quantite:string
  heuresdeprise:string
}

@Component({
  selector: "app-viewappointment",
  templateUrl: "./viewappointment.component.html",
  styleUrls: ["./viewappointment.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class ViewappointmentComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
  {
    editMedicament: FormGroup
    filteredData:any;
    allMedicament : medicaments[]
    displayedColumns  = [
    ];
    dataSource: any
    selection = new SelectionModel<any>(true, []);
    index: number;
    id: number;
    doctors: any | null;
    doctor : any
    constructor(
      public httpClient: HttpClient,
      public dialog: MatDialog,
      private medicamentService:MedicamentService,
      private snackBar: MatSnackBar,
      private fb :FormBuilder,
      private modalService:NgbModal
    ) {
      super();
    
      
    }
    getMedicaments(){
      this.medicamentService.getAllMedicaments().subscribe(data=>{
        this.allMedicament  = data
        console.log(data);
        
        this.dataSource = data.medicaments
        this.displayedColumns= Object.keys(this.dataSource[0])
        this.displayedColumns.push("actions")
        console.log(this.displayedColumns);
        
  
        console.log(this.dataSource);
        
  
      })
    }
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild("filter", { static: true }) filter: ElementRef;
    ngOnInit() {
      this.getMedicaments()
    
    }
    editForm(data){
      this.editMedicament = this.fb.group({
        nom: [data.nom, [Validators.required]],
        description: [data.description,[Validators.required]],
        quantite: [data.quantite,[Validators.required],],
        heuresdeprise: [data.heuresdeprise, [Validators.required]],
      });
    }
    onSubmit(){
      if(this.editMedicament.valid){  
        let id = this.editMedicament.value._id    
        let formData = JSON.stringify(this.editMedicament.value)
        
  
        this.medicamentService.updateMedicament(id,formData).subscribe(()=>{
  
          Swal.fire({
            icon: 'success',
            title: 'succees',
          });
          this.modalService.dismissAll('content')
        })
      }
      else {
        Swal.fire({
          icon:'warning',
          title:'something went wrong'
        })
      }
      
    }
    edititem(row){
      this.medicamentService.getmedicament(row._id).subscribe(data=>{
        this.doctor = data;
        console.log(this.doctor);
        this.editForm(row)
        
      })
  
  
    }
    deleteItem(row){
      this.medicamentService.deleteMedicament(row._id).subscribe(data=>{
        this.getMedicaments()
      })
      
      
      
    }
    openComposeModal(content: any) {
        this.modalService.open(content, { size: 'lg', windowClass: 'modal-holder', centered: true });
      }
  
  }
