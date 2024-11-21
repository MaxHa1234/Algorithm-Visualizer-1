import { Component } from "@angular/core";
import { AlgorithmDataInputComponent } from "../algorithm-data-input/algorithm-data-input.component";
import { AlgorithmSelectorComponent } from "../algorithm-selector/algorithm-selector.component";
import { AlgorithmSpeedInputComponent } from "../algorithm-speed-input/algorithm-speed-input.component";
import { InfoboxComponent } from "../infobox/infobox.component";

@Component({
  selector: "app-algorithm-options",
  standalone: true,
  imports: [AlgorithmDataInputComponent, AlgorithmSelectorComponent, AlgorithmSpeedInputComponent, InfoboxComponent],
  templateUrl: "./algorithm-options.component.html",
  styleUrl: "./algorithm-options.component.css",
})
export class AlgorithmOptionsComponent {}
