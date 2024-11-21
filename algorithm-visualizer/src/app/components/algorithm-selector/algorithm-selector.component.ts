import { Component, Output } from "@angular/core";
import { AlgorithmHandler } from "../../../services/algorithm.handler";
import { FormsModule } from "@angular/forms";
import { InfoboxComponent } from "../infobox/infobox.component";

@Component({
  selector: "app-algorithm-selector",
  standalone: true,
  imports: [FormsModule, InfoboxComponent],
  templateUrl: "./algorithm-selector.component.html",
  styleUrl: "./algorithm-selector.component.css",
})
export class AlgorithmSelectorComponent {

  constructor(protected readonly algorithmHandler: AlgorithmHandler) {}

  public handleAlgorithmSelection(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const index = Number.parseInt(target.value);

    this.algorithmHandler.selectAlgorithm(index);
  }
  currentItem = 'ASDSA';

}
