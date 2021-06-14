import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { SpaceslaunchService } from 'src/app/service/filter-service.service';

@Component({
  selector: 'app-space-launch',
  templateUrl: './space-launch.component.html',
  styleUrls: ['./space-launch.component.scss']
})
export class SpaceLaunchComponent implements OnInit {

  LIMIT: number = 100;
  index: number = 0;
  isLoading: boolean = false;
  launches: any;
  launchYear: any[] = [];
  launchesCount: number = 0;
  isLaunchSuccess: string = "";
  isLandSuccess: string = "";
  uniqueLaunchYear: any[] = [];
  year: string = "";
  queryParams: Params = {};

  constructor(
    private router: Router,
    private spaceLaunchService: SpaceslaunchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSpaceLaunches();
  }

  //get all the launches on initial load of the page
  getSpaceLaunches() {
    this.isLoading = true;
    this.spaceLaunchService.getAllLaunches().subscribe((data: any) => {
      this.launches = data;
      this.launchesCount = data.length;
      this.isLoading = false;
      if (this.launches) {
        this.launches.forEach((launch: any) => {
          this.launchYear.push(launch.launch_year);
        });

        this.uniqueLaunchYear = [...new Set(this.launchYear)];
        this.uniqueLaunchYear.sort((a, b) => { return a - b; });
      }
    });
  }

  fetchQueryParams(): Params {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });
    return this.queryParams;
  }

  filterByLaunch(isLaunchSuccess: boolean) {
    this.isLaunchSuccess = String(isLaunchSuccess);
    this.queryParams = this.fetchQueryParams();
    this.router.navigate([""], {
      queryParams: { ...this.queryParams, limit: this.LIMIT, launch_status: this.isLaunchSuccess },
    });
    this.spaceLaunchService.filterByYearLandSuccess(this.year, this.isLaunchSuccess, this.isLandSuccess)
      .subscribe((data: any) => {
        this.launches = data;
        this.launchesCount = data.length;
        this.router.navigate([""], {
          queryParams: { ...this.queryParams, limit: this.LIMIT, launch_status: this.isLaunchSuccess }
        });
      });
  }

  filterByLand(isLandSuccess: boolean) {
    this.isLandSuccess = String(isLandSuccess);
    this.queryParams = this.fetchQueryParams();
    this.router.navigate([""], {
      queryParams: { ...this.queryParams, limit: this.LIMIT, land_status: this.isLandSuccess },
    });
    this.spaceLaunchService.filterByYearLandSuccess(this.year, this.isLaunchSuccess, this.isLandSuccess)
      .subscribe((data: any) => {
        this.launches = data;
        this.launchesCount = data.length;
        this.router.navigate([""], {
          queryParams: { ...this.queryParams, limit: this.LIMIT, land_status: this.isLandSuccess }
        });
      });
  }

  filterYear(year: any) {
    this.year = year;
    this.queryParams = this.fetchQueryParams();
    console.log(this.queryParams);
    this.router.navigate([""], {
      queryParams: { ...this.queryParams, year: this.year, limit: this.LIMIT, },
    });
    this.spaceLaunchService.filterByYearLandSuccess(this.year, this.isLaunchSuccess, this.isLandSuccess)
      .subscribe((data: any) => {
        this.launches = data;
        this.launchesCount = data.length;
        this.router.navigate([""], {
          queryParams: { ...this.queryParams, year: this.year }
        });
      });
  }
}
