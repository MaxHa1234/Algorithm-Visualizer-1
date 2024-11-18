import { Injectable } from "@angular/core";
import { Algorithm } from "../algorithms/algorithm";
import { BubbleSort } from "../algorithms/implementations/bubble-sort/bubble-sort.impl";
import { SelectionSort } from "../algorithms/implementations/selection-sort/selection-sort.impl";
import { MergeSort } from "../algorithms/implementations/merge-sort/merge-sort.impl";
import { InsertionSort } from "../algorithms/implementations/insertion-sort/insertion-sort.impl";
import { QuickSort } from "../algorithms/implementations/quick-sort/quick-sort.impl";
import { HeapSort } from "../algorithms/implementations/heap-sort/heap-sort.impl";
import { VisualizerService } from "./visualizer.service";
import { OptionsService } from "./options.service";

@Injectable({
  providedIn: "root",
})
export class AlgorithmService {
  private readonly algorithmList: Algorithm[];

  private prevAnimationFrameId: number;
  private prevTimeStamp: number;

  public currentAlgorithm?: Algorithm;

  constructor(
    private readonly visualizerService: VisualizerService,
    private readonly optionsService: OptionsService
  ) {
    this.algorithmList = [];
    this.prevTimeStamp = this.prevAnimationFrameId = -1;

    this.registerAlgorithm(new BubbleSort());
    this.registerAlgorithm(new SelectionSort());
    this.registerAlgorithm(new MergeSort());
    this.registerAlgorithm(new InsertionSort());
    this.registerAlgorithm(new QuickSort());
    this.registerAlgorithm(new HeapSort());

    // Create random data on startup
    this.visualizerService.generateRawSortingData(this.optionsService.amountOfElements);
  }

  private Renderer = async (timeStamp: number) => {
    if (this.prevTimeStamp !== -1) {
      const deltaTime = timeStamp - this.prevTimeStamp;
      console.log(deltaTime);
    }

    this.prevTimeStamp = timeStamp;
    this.prevAnimationFrameId = window.requestAnimationFrame(this.Renderer);
  };

  public startSorting() {
    this.stopSorting();
    this.prevAnimationFrameId = window.requestAnimationFrame(this.Renderer);
  }

  public stopSorting() {
    if (this.prevAnimationFrameId === -1) {
      return;
    }

    window.cancelAnimationFrame(this.prevAnimationFrameId);
    this.prevTimeStamp = this.prevAnimationFrameId = -1;
  }

  public async start() {
    const algorithm = this.currentAlgorithm;
    if (algorithm == null) {
      return;
    }

    await this.currentAlgorithm?.sort(this.visualizerService.rawSortingData, this.optionsService.delay);
    console.log("finished");
  }

  public selectAlgorithm(index: number): void {
    this.currentAlgorithm = this.getAlgorithms()[index];
  }

  private registerAlgorithm(algorithm: Algorithm): void {
    this.algorithmList.push(algorithm);
  }

  public getAlgorithms(): Algorithm[] {
    return this.algorithmList;
  }
}
