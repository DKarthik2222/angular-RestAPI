import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  totalData:any;
  empSubscription:any;
  updateId:any;
  constructor(private empService: EmployeeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.empSubscription = this.empService.getData(`employee`)
      .subscribe(data => {
       this.totalData = data;
     });
   }
   newEmployeeForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    company: new FormControl(''),
    email: new FormControl('')
  })
   postData(){
     this.empService.postData(`employee`,this.newEmployeeForm.value)
     .then(()=>{
       this.getData();

       this.snackBar.open('Employee Added', 'ok', {
        duration: 3000
      })
      this.newEmployeeForm = new FormGroup({
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        company: new FormControl(''),
        email: new FormControl('')
      })
     })
     .catch(error => {
      this.snackBar.open(`${error.status} Error. Try after some time`, 'ok', {
        duration: 3000
      })
      console.log(`Catch Error => `,error)
     });
   }

   employeeForm = new FormGroup({
     first_name: new FormControl(''),
     last_name: new FormControl(''),
     company: new FormControl(''),
     email: new FormControl('')
   })

   currentId(data:any){
     this.updateId=data.id;
     this.employeeForm = new FormGroup({
      first_name: new FormControl(`${data.first_name}`),
      last_name: new FormControl(`${data.last_name}`),
      company: new FormControl(`${data.company}`),
      email: new FormControl(`${data.email}`)
    })
   }
   updateData(){
     
     this.empService.updateData(`employee/${this.updateId}`,this.employeeForm.value)
     .then(()=>{
      this.getData();
      this.snackBar.open('Employee Updated Successfully', 'ok', {
       duration: 3000
     })
    })
    .catch(error => {
     this.snackBar.open(`${error.status} Error. Try after some time`, 'ok', {
       duration: 3000
     })
     console.log(`Catch Error => `,error)
    });
  }

  deleteData(id:any){
    this.empService.deleteData(`employee/${id}`)
    .then(()=>{
     this.getData();
     this.snackBar.open('Employee Deleted Successfully', 'ok', {
      duration: 3000
    })
   })
   .catch(error => {
    this.snackBar.open(`${error.status} Error. Try after some time`, 'ok', {
      duration: 3000
    })
    console.log(`Catch Error => `,error)
   });
  }
}
