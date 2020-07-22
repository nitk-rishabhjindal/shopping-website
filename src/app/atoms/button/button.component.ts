import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  @Input() classList: any;
  @Input() buttonType: any;
  constructor() {}

  ngOnInit() {
    if (this.buttonType !== "submit") {
      this.buttonType = "button";
    }
  }
}
