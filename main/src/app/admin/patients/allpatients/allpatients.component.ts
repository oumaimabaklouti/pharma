import { CertifService } from './../../certif.service';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PatientService } from "./patient.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { map } from "rxjs/operators";
import { FormGroup,FormBuilder,Validators } from "@angular/forms";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: "app-allpatients",
  templateUrl: "./allpatients.component.html",
  styleUrls: ["./allpatients.component.sass"],
})
export class AllpatientsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
  {
    editcertif: FormGroup
    filteredData:any;
    allcertif : any;
    displayedColumns  = [
    ];
    // exampleDatabase: DoctorsService | null;
    dataSource: any
    selection = new SelectionModel<any>(true, []);
    index: number;
    id: number;
    doctors: any | null;
    doctor : any
    constructor(
      public httpClient: HttpClient,
      public dialog: MatDialog,
      private certifService:CertifService,
      private snackBar: MatSnackBar,
      private fb :FormBuilder,
      private modalService:NgbModal
    ) {
      super();
      this.editcertif = this.fb.group({
        nom: ["", [Validators.required]],
        prenom: [""],
        email: [
          "",
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        phone: ["", [Validators.required]],
        specialite: [""],
        adresse: [""],
      });
      
    }
    getCertifs(){
      this.certifService.getAllCertif().subscribe(data=>{
        this.allcertif  = data
        console.log(data);
        
        this.dataSource = data.certifs
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
      this.getCertifs()
    
    }
    editForm(data){
      this.editcertif = this.fb.group({
        _id : [data._id],
        nom: [data.nom, [Validators.required]],
        prenom: [data.prenom],
        email: [
          data.email,
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        phone: [data.phone ,[Validators.required]],
        specialite: [data.specialite],
        adresse: [data.adresse],
      });
    }
    onSubmit(){
      if(this.editcertif.valid){  
        let id = this.editcertif.value._id    
        let formData = JSON.stringify(this.editcertif.value)
        
  
        this.certifService.updateCertif(id,formData).subscribe(()=>{
  
          Swal.fire({
            icon: 'success',
            title: 'succees',
          });
          this.modalService.dismissAll('content')
        })
      }
      
    }
    edititem(row){
      this.certifService.getCertif(row._id).subscribe(data=>{
        this.doctor = data;
        console.log(this.doctor);
        this.editForm(row)
        
      })
  
  
    }
    deleteItem(row){
      this.certifService.deleteCertif(row._id).subscribe(data=>{
        this.getCertifs()
      })
      
      
      
    }
    openComposeModal(content: any) {
        this.modalService.open(content, { size: 'lg', windowClass: 'modal-holder', centered: true });
      }
  
  }
