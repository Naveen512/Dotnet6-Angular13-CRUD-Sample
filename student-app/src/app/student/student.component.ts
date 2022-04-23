import { Component, OnInit } from '@angular/core';

import { Student } from './student';
import { StudentService } from './student.service';

declare var window: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  addorupdatemodal: any;
  studentForm: Student = {
    age: 0,
    gender: 'Male',
    id: 0,
    name: '',
  };
  addorupdatemodalTitle: string = '';
  students: Student[] = [];
  deleteModal: any;
  studentIdToDelete: number = 0;
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.get();

    this.addorupdatemodal = new window.bootstrap.Modal(
      document.getElementById('addorupdatemodal')
    );

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
  }

  get() {
    this.studentService.get().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openAddOrUpdateModal(studentId: number) {
    if (studentId === 0) {
      this.addorupdatemodalTitle = 'Add';
      this.studentForm = {
        age: 0,
        gender: 'Male',
        id: 0,
        name: '',
      };
      this.addorupdatemodal.show();
    } else {
      this.addorupdatemodalTitle = 'Update';
      this.studentForm = this.students.filter((s) => s.id === studentId)[0];
      this.addorupdatemodal.show();
    }
  }

  createorUpdateStudent() {
    if (this.studentForm.id == 0) {
      this.studentService.post(this.studentForm).subscribe({
        next: (data) => {
          this.students.unshift(data);
          this.addorupdatemodal.hide();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.studentService.update(this.studentForm).subscribe({
        next: (data) => {
          this.students = this.students.filter((_) => _.id !== data.id);
          this.students.unshift(data);
          this.addorupdatemodal.hide();
        },
      });
    }
  }

  openDeleteModal(studentId: number) {
    this.studentIdToDelete = studentId;
    this.deleteModal.show();
  }

  confirmDelete(){
    this.studentService.delete(this.studentIdToDelete)
    .subscribe({
      next:(data) => {
        this.students = this.students.filter(_ => _.id !== this.studentIdToDelete);
        this.deleteModal.hide();
      },
      error:(error) => {
        console.log(error);
      }
    })
  }
}
