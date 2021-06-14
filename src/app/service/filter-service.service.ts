import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SpaceslaunchService {
  params: string = "";

  constructor(private Http: HttpClient) { }

  getAllLaunches(): Observable<any> {
    return this.Http.get(environment.BASE_URL);
  }


  //filter by land, year and success values
  filterByYearLandSuccess(launchYear: any, launchSuccess: string, landSuccess: string): Observable<any> {
    this.params = environment.BASE_URL;
    if (launchYear) {
      this.params += `&launch_year=${launchYear}`;
    }
    if (launchSuccess) {
      this.params += `&launch_success=${launchSuccess}`;
    }
    if (landSuccess) {
      this.params += `&land_success=${landSuccess}`;
    }

    return this.Http.get(this.params);
  }
}