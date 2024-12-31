import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convpesos',
  standalone: true,
  templateUrl: './convpesos.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./convpesos.component.css']
})
export class ConvpesosComponent {
  inputWeight: number = 0;
  convertedWeight: number | null = null;

  fromUnit: string = 'kg'; // Unidad inicial
  toUnit: string = 'lbs'; // Unidad a convertir

  // Factores de conversión entre las unidades
  conversionFactors: { [key: string]: number } = {
    kg: 1,
    lbs: 2.20462,
    g: 1000,
    oz: 35.274,
    mg: 1000000,
    ton: 0.001,
  };

  convertWeight() {
    if (this.fromUnit && this.toUnit) {
      const weightInKg = this.inputWeight / this.conversionFactors[this.fromUnit]; // Convertir a kilogramos
      this.convertedWeight = weightInKg * this.conversionFactors[this.toUnit]; // Convertir a la unidad destino
    }
  }
}
