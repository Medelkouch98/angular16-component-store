import { Component } from "@angular/core";
import { StudentFormComponent } from "../student-form/student-form.component";

@Component({
    selector: "app-student-view",
    standalone: true,
    imports: [StudentFormComponent],
    template: `
      <app-student-form></app-student-form>
    `,
})

export class StudentViewComponent {
    
}