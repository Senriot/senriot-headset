/* tslint:disable */
import { City } from "@shared/model/city";

export interface Address {
  province?: City;
  city?: City;
  district?: City;
  address?: string;
  coordinate?: {};
}
