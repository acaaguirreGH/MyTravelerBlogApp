import { Component } from '@angular/core';
import { TestingAZService } from '../services/testing-az.service';
import {ChangeDetectionStrategy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-dev-site',
  templateUrl: './dev-site.component.html',
  styleUrls: ['./dev-site.component.css']
})
export class DevSiteComponent {

  imgURL: string = ""
  textRequest: string = ""
  imgDescription: string = ""

  constructor(public TestSVC: TestingAZService) {

  }

CallAzFN() {

    try {
      this.TestSVC.TestAzFN().subscribe((response)=> {
      this.imgURL = response;
  });
      
    } catch (error) {
      alert(error);
    }
}

CallDallE(event: any) {
const inputElement = document.getElementById("inputPrompt") as HTMLInputElement;
  const inputValue = inputElement.value; // Get the value from the input field

  if(inputValue){
    try {
      this.TestSVC.CallDallE(inputValue).subscribe((response)=>{
        if(response){
          //Use any LLM to get a description for the image
          this.TestSVC.CallCompVisionFunction(response).subscribe((response)=>{
              this.imgDescription = response;
          });
        }

        this.imgURL = response;
      });
      
    } catch (error) {
      alert(error);
    }
  }

  }

}
