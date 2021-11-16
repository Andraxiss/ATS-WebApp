import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-capteur-value",
  templateUrl: "./capteur-value.component.html",
  styleUrls: ["./capteur-value.component.scss"],
})
export class CapteurValueComponent implements OnInit {
  jsonValue: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:9000/api/bi/capteurs").subscribe(
      (value) => {
        this.jsonValue = "coucou";
      },
      (error) => {
        this.jsonValue = error;
      }
    );
  }
}
