import { ModalComponent } from './../../../ui/modal/modal.component';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DoctorsService } from "./doctors.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
export interface Doctor{
  _id: string
  nom:string
  prenom:string
  email:string
  specialite:string
  adresse:string
  phone:string
  createdAt:Date
  __v:number
}
export interface allDoctors{
docteurs:Doctor[]
nombredocteurs:number
}

@Component({
  selector: "app-alldoctors",
  templateUrl: "./alldoctors.component.html",
  styleUrls: ["./alldoctors.component.sass"],
})
export class AlldoctorsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  editDoctor: FormGroup
  filteredData:any;
  allDoctors : allDoctors;
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
    public doctorsService: DoctorsService,
    private snackBar: MatSnackBar,
    private fb :FormBuilder,
    private modalService:NgbModal
  ) {
    super();
    this.editDoctor = this.fb.group({
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
  sourceData : Doctor
  getDoctors(){
    this.doctorsService.getAllDoctors().subscribe(data=>{
      this.allDoctors  = data
      this.sourceData = data.docteurs
      this.displayedColumns= Object.keys(this.sourceData[0])
      this.displayedColumns.push("actions")
      console.log(this.displayedColumns);
      

      console.log(this.allDoctors);
      

    })
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.getDoctors()
  
  }
  editForm(data){
    this.editDoctor = this.fb.group({
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
    if(this.editDoctor.valid){  
      let id = this.editDoctor.value._id    
      let formData = JSON.stringify(this.editDoctor.value)
      

      this.doctorsService.updateDoctor(id,formData).subscribe(()=>{

        Swal.fire({
          icon: 'success',
          title: 'succees',
        });
        this.modalService.dismissAll('content')
      })
    }
    
  }
  edititem(row){
    this.doctorsService.getDoctor(row._id).subscribe(data=>{
      this.doctor = data;
      console.log(this.doctor);
      this.editForm(row)
      
    })


  }
  deleteItem(row){
    this.doctorsService.deleteDoctor(row._id).subscribe(data=>{
      this.getDoctors()
    })
    
    
    
  }
  openComposeModal(content: any) {
      this.modalService.open(content, { size: 'lg', windowClass: 'modal-holder', centered: true });
    }

}

