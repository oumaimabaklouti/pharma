import { Router } from '@angular/router';
import { DoctorsService } from './../alldoctors/doctors.service';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
@Component({
  selector: "app-add-doctor",
  templateUrl: "./add-doctor.component.html",
  styleUrls: ["./add-doctor.component.sass"],
})
export class AddDoctorComponent {
  addDoctor: FormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: FormBuilder,private doctorService: DoctorsService,private router:Router) {
    this.addDoctor = this.fb.group({
      nom: ["", [Validators.required]],
      prenom: [""],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      phone: ["", [Validators.required]],
      // password: ["", [Validators.required]],
      // conformPassword: ["", [Validators.required]],
      specialite: [""],
      adresse: [""],
      createdAt : [1596191919819]
    });
  }
  onSubmit() {
    if (this.addDoctor.valid){
      // this.addDoctor.patchValue({createdAt: new Date()})
      // console.log(this.addDoctor);
      
      let formData = JSON.stringify(this.addDoctor.value)
      
      
      this.doctorService.addDoctor(formData).subscribe((data)=>{
        
        this.router.navigate(['admin/doctors/allDoctors'])
        Swal.fire({
          icon: 'success',
          title: 'Produit publier',
        });

      })
    }
    else{
      console.log('error');
      
    }
  }
}
